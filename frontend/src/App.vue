<template>
  <div class="app-container">
    <!-- Header Component -->
    <AppHeader :dbStatus="dbStatus" @reset-data="resetSeedData" />

    <!-- Stats Dashboard Grid -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper total">
          <BoxIcon size="24" />
        </div>
        <div>
          <div class="stat-label">Total Assets</div>
          <div class="stat-value">{{ stats.totalAssets || 0 }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper available">
          <CheckCircle2Icon size="24" />
        </div>
        <div>
          <div class="stat-label">Available</div>
          <div class="stat-value" style="color: var(--success);">{{ stats.available || 0 }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper assigned">
          <UserCheckIcon size="24" />
        </div>
        <div>
          <div class="stat-label">Assigned</div>
          <div class="stat-value" style="color: var(--info);">{{ stats.assigned || 0 }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper maintenance">
          <WrenchIcon size="24" />
        </div>
        <div>
          <div class="stat-label">Under Maintenance</div>
          <div class="stat-value" style="color: var(--warning);">{{ stats.maintenance || 0 }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper value">
          <DollarSignIcon size="24" />
        </div>
        <div>
          <div class="stat-label">Total Inventory Value</div>
          <div class="stat-value" style="color: #a7f3d0;">${{ formatCurrency(stats.totalValue || 0) }}</div>
        </div>
      </div>
    </section>

    <!-- Main Content Panel -->
    <main class="content-section">
      <!-- Toolbar -->
      <div class="toolbar">
        <div class="search-filter-group">
          <!-- Search -->
          <div class="search-input-wrapper">
            <SearchIcon class="search-icon" size="18" />
            <input 
              type="text" 
              class="input-field" 
              placeholder="Search by asset name, serial number, or assignee..."
              v-model="filters.search"
            />
          </div>

          <!-- Type Filter -->
          <select class="select-field" v-model="filters.assetType">
            <option value="">All Asset Types</option>
            <option v-for="type in assetTypes" :key="type" :value="type">{{ type }}</option>
          </select>

          <!-- Status Filter -->
          <select class="select-field" v-model="filters.status">
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        <button class="btn btn-primary" @click="openAddModal">
          <PlusIcon size="18" />
          <span>Add New Asset</span>
        </button>
      </div>

      <!-- Record List Component -->
      <RecordList 
        :assets="filteredAssets" 
        @edit="openEditModal" 
        @delete="confirmDelete" 
        @assign="openAssignModal" 
      />
    </main>

    <!-- Record Form Modal Component -->
    <RecordForm 
      :show="showModal" 
      :isEditing="isEditing" 
      :assetData="form" 
      :assetTypes="assetTypes" 
      @close="closeModal" 
      @save="saveAsset" 
    />

    <!-- Modal for Quick Assign -->
    <div v-if="showAssignModal" class="modal-overlay" @click.self="closeAssignModal">
      <div class="modal-card" style="max-width: 440px;">
        <div class="modal-header">
          <h2 class="modal-title">Quick Assign Asset</h2>
          <button class="icon-btn" @click="closeAssignModal"><XIcon size="18" /></button>
        </div>

        <form @submit.prevent="submitQuickAssign">
          <div class="modal-body">
            <p style="margin-bottom: 16px; font-size: 14px; color: var(--text-muted);">
              Assigning: <strong style="color: white;">{{ targetAsset?.assetName }}</strong> (SN: {{ targetAsset?.serialNumber }})
            </p>
            <div class="form-group">
              <label class="form-label">Assignee Employee Name *</label>
              <input type="text" v-model="assigneeName" class="input-field" placeholder="Enter employee full name" required />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAssignModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Assign Asset</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer Component -->
    <AppFooter />

    <!-- Toast Notifications -->
    <div class="toast-container">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import RecordForm from './components/RecordForm.vue';
import RecordList from './components/RecordList.vue';
import AppFooter from './components/AppFooter.vue';
import { filterRecords } from './utils/filterRecords';

import { 
  Box as BoxIcon, 
  CheckCircle2 as CheckCircle2Icon, 
  UserCheck as UserCheckIcon, 
  Wrench as WrenchIcon, 
  DollarSign as DollarSignIcon,
  Search as SearchIcon, 
  Plus as PlusIcon, 
  X as XIcon
} from 'lucide-vue-next';

// State
const assets = ref([]);
const dbStatus = ref({ mode: 'localStorage (Browser Offline)', connected: false });
const assetTypes = [
  'Laptop', 'Desktop', 'Printer', 'Monitor', 
  'Smartphone', 'Server', 'Networking', 'Peripheral', 'Software License'
];

const initialSeedAssets = [
  {
    _id: 'ast_101',
    assetName: 'MacBook Pro 16" M3 Max',
    assetType: 'Laptop',
    serialNumber: 'C02G1234MD6R',
    assignedTo: 'Aaron Capulong',
    status: 'Assigned',
    purchaseDate: '2024-01-15',
    cost: 2499,
    department: 'Engineering',
    location: 'Main HQ - Floor 3',
    notes: 'Assigned to Lead Software Architect'
  },
  {
    _id: 'ast_102',
    assetName: 'Dell UltraSharp 32" 4K Monitor',
    assetType: 'Monitor',
    serialNumber: 'CN-0V4093-72872',
    assignedTo: 'Aaron Capulong',
    status: 'Assigned',
    purchaseDate: '2024-01-20',
    cost: 799,
    department: 'Engineering',
    location: 'Main HQ - Desk 42',
    notes: 'Dual monitor setup'
  },
  {
    _id: 'ast_103',
    assetName: 'ThinkPad X1 Carbon Gen 11',
    assetType: 'Laptop',
    serialNumber: 'PF-49X0192',
    assignedTo: 'Unassigned',
    status: 'Available',
    purchaseDate: '2024-03-10',
    cost: 1650,
    department: 'IT Operations',
    location: 'IT Storage Room B',
    notes: 'Configured and ready for deployment'
  },
  {
    _id: 'ast_104',
    assetName: 'HP Color LaserJet Pro Printer',
    assetType: 'Printer',
    serialNumber: 'VNB3K91024',
    assignedTo: 'Shared Office',
    status: 'Under Maintenance',
    purchaseDate: '2023-08-05',
    cost: 599,
    department: 'Administration',
    location: 'Floor 2 Print Station',
    notes: 'Toner replacement & paper jam repair'
  }
];

const filters = ref({
  search: '',
  assetType: '',
  status: ''
});

const showModal = ref(false);
const isEditing = ref(false);
const form = ref({
  _id: null,
  assetName: '',
  assetType: 'Laptop',
  serialNumber: '',
  assignedTo: 'Unassigned',
  status: 'Available',
  purchaseDate: new Date().toISOString().split('T')[0],
  cost: 0,
  department: 'IT Operations',
  location: 'Headquarters',
  notes: ''
});

const showAssignModal = ref(false);
const targetAsset = ref(null);
const assigneeName = ref('');

const toasts = ref([]);

// localStorage Management (Module 7 Requirement)
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('module7-records');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing localStorage:', e);
    }
  }
  localStorage.setItem('module7-records', JSON.stringify(initialSeedAssets));
  return initialSeedAssets;
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('module7-records', JSON.stringify(data));
};

// Computed Stats
const stats = computed(() => {
  const totalAssets = assets.value.length;
  const available = assets.value.filter(a => a.status === 'Available').length;
  const assigned = assets.value.filter(a => a.status === 'Assigned').length;
  const maintenance = assets.value.filter(a => a.status === 'Under Maintenance').length;
  const retired = assets.value.filter(a => a.status === 'Retired').length;
  const totalValue = assets.value.reduce((sum, a) => sum + (Number(a.cost) || 0), 0);

  return { totalAssets, available, assigned, maintenance, retired, totalValue };
});

// Filtered Records (Search & Category filter)
const filteredAssets = computed(() => {
  const searched = filterRecords(assets.value, filters.value.search);
  return searched.filter(asset => {
    const matchesType = !filters.value.assetType || asset.assetType === filters.value.assetType;
    const matchesStatus = !filters.value.status || asset.status === filters.value.status;

    return matchesType && matchesStatus;
  });
});

// API / Storage Fetching
const fetchAssets = async () => {
  try {
    const res = await fetch('/api/assets');
    if (res.ok) {
      const data = await res.json();
      assets.value = data.assets || [];
      dbStatus.value = { mode: 'Node API / Express Backend', connected: true };
      saveToLocalStorage(assets.value);
      return;
    }
  } catch (err) {
    // Offline / API down fallback to localStorage
  }

  assets.value = loadFromLocalStorage();
  dbStatus.value = { mode: 'localStorage (Browser Offline)', connected: false };
};

const saveAsset = async (assetData) => {
  if (!assetData.assetName || !assetData.serialNumber) {
    showToast('Please fill in required fields (Name and Serial Number)', 'error');
    return;
  }

  try {
    const url = isEditing.value ? `/api/assets/${assetData._id}` : '/api/assets';
    const method = isEditing.value ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assetData)
    });

    if (res.ok) {
      showToast(`Asset successfully ${isEditing.value ? 'updated' : 'created'}!`, 'success');
      closeModal();
      fetchAssets();
      return;
    }
  } catch (err) {
    // Fallback to local state + localStorage
  }

  if (isEditing.value) {
    const idx = assets.value.findIndex(a => (a._id || a.id) === (assetData._id || assetData.id));
    if (idx !== -1) {
      assets.value[idx] = { ...assetData };
    }
  } else {
    assets.value.push({
      ...assetData,
      _id: `ast_${Date.now()}`
    });
  }

  saveToLocalStorage(assets.value);
  showToast(`Asset successfully ${isEditing.value ? 'updated' : 'created'}!`, 'success');
  closeModal();
};

const openAddModal = () => {
  isEditing.value = false;
  form.value = {
    _id: null,
    assetName: '',
    assetType: 'Laptop',
    serialNumber: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
    assignedTo: 'Unassigned',
    status: 'Available',
    purchaseDate: new Date().toISOString().split('T')[0],
    cost: 0,
    department: 'IT Operations',
    location: 'Headquarters',
    notes: ''
  };
  showModal.value = true;
};

const openEditModal = (asset) => {
  isEditing.value = true;
  form.value = { 
    ...asset,
    purchaseDate: asset.purchaseDate ? new Date(asset.purchaseDate).toISOString().split('T')[0] : ''
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openAssignModal = (asset) => {
  targetAsset.value = asset;
  assigneeName.value = asset.assignedTo !== 'Unassigned' ? asset.assignedTo : '';
  showAssignModal.value = true;
};

const closeAssignModal = () => {
  showAssignModal.value = false;
  targetAsset.value = null;
};

const submitQuickAssign = async () => {
  if (!targetAsset.value) return;
  const newAssignee = assigneeName.value.trim() || 'Unassigned';

  try {
    const res = await fetch(`/api/assets/${targetAsset.value._id || targetAsset.value.id}/assign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedTo: newAssignee })
    });

    if (res.ok) {
      showToast(`Asset assigned to ${newAssignee}!`, 'success');
      closeAssignModal();
      fetchAssets();
      return;
    }
  } catch (err) {
    // Local fallback
  }

  const asset = assets.value.find(a => (a._id || a.id) === (targetAsset.value._id || targetAsset.value.id));
  if (asset) {
    asset.assignedTo = newAssignee;
    asset.status = newAssignee !== 'Unassigned' ? 'Assigned' : 'Available';
    saveToLocalStorage(assets.value);
  }

  showToast(`Asset assigned to ${newAssignee}!`, 'success');
  closeAssignModal();
};

const confirmDelete = async (asset) => {
  if (confirm(`Are you sure you want to delete "${asset.assetName}" (${asset.serialNumber})?`)) {
    try {
      const res = await fetch(`/api/assets/${asset._id || asset.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Asset record deleted', 'success');
        fetchAssets();
        return;
      }
    } catch (err) {
      // Local fallback
    }

    assets.value = assets.value.filter(a => (a._id || a.id) !== (asset._id || asset.id));
    saveToLocalStorage(assets.value);
    showToast('Asset record deleted', 'success');
  }
};

const resetSeedData = async () => {
  try {
    await fetch('/api/assets/seed', { method: 'POST' });
  } catch (err) {
    // Ignore error
  }
  localStorage.setItem('module7-records', JSON.stringify(initialSeedAssets));
  assets.value = [...initialSeedAssets];
  showToast('Reset sample inventory dataset successfully', 'success');
};

const formatCurrency = (val) => {
  return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const showToast = (message, type = 'success') => {
  const id = Date.now();
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 3500);
};

// Lifecycle
onMounted(() => {
  fetchAssets();
});
</script>
