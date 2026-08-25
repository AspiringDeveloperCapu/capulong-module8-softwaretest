const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/assets.json');

// Initial seed assets
const initialAssets = [
  {
    _id: "ast_101",
    assetName: "MacBook Pro 16\" M3 Max",
    assetType: "Laptop",
    serialNumber: "C02G1234MD6R",
    assignedTo: "Aaron Capulong",
    status: "Assigned",
    purchaseDate: "2024-01-15T00:00:00.000Z",
    cost: 2499,
    department: "Engineering",
    location: "Main HQ - Floor 3",
    notes: "Assigned to Lead Software Architect",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-02-01T14:20:00.000Z"
  },
  {
    _id: "ast_102",
    assetName: "Dell UltraSharp 32\" 4K Monitor",
    assetType: "Monitor",
    serialNumber: "CN-0V4093-72872",
    assignedTo: "Aaron Capulong",
    status: "Assigned",
    purchaseDate: "2024-01-20T00:00:00.000Z",
    cost: 799,
    department: "Engineering",
    location: "Main HQ - Desk 42",
    notes: "Dual monitor setup",
    createdAt: "2024-01-20T11:30:00.000Z",
    updatedAt: "2024-02-01T14:20:00.000Z"
  },
  {
    _id: "ast_103",
    assetName: "ThinkPad X1 Carbon Gen 11",
    assetType: "Laptop",
    serialNumber: "PF-49X0192",
    assignedTo: "Unassigned",
    status: "Available",
    purchaseDate: "2024-03-10T00:00:00.000Z",
    cost: 1650,
    department: "IT Operations",
    location: "IT Storage Room B",
    notes: "Configured and ready for deployment",
    createdAt: "2024-03-10T09:00:00.000Z",
    updatedAt: "2024-03-10T09:00:00.000Z"
  },
  {
    _id: "ast_104",
    assetName: "HP Color LaserJet Pro Printer",
    assetType: "Printer",
    serialNumber: "VNB3K91024",
    assignedTo: "Shared Office",
    status: "Under Maintenance",
    purchaseDate: "2023-08-05T00:00:00.000Z",
    cost: 599,
    department: "Administration",
    location: "Floor 2 Print Station",
    notes: "Toner replacement & paper jam repair in progress",
    createdAt: "2023-08-05T14:00:00.000Z",
    updatedAt: "2024-04-12T16:45:00.000Z"
  },
  {
    _id: "ast_105",
    assetName: "Cisco Catalyst 9300 Switch",
    assetType: "Networking",
    serialNumber: "FCW2341L0AB",
    assignedTo: "Network Team",
    status: "Assigned",
    purchaseDate: "2023-05-12T00:00:00.000Z",
    cost: 3200,
    department: "Infrastructure",
    location: "Server Room Rack 4",
    notes: "Core switch for 3rd floor rack",
    createdAt: "2023-05-12T08:00:00.000Z",
    updatedAt: "2023-05-12T08:00:00.000Z"
  },
  {
    _id: "ast_106",
    assetName: "Dell PowerEdge R750 Server",
    assetType: "Server",
    serialNumber: "9XJ3821",
    assignedTo: "SysAdmin Team",
    status: "Available",
    purchaseDate: "2023-11-01T00:00:00.000Z",
    cost: 5800,
    department: "Infrastructure",
    location: "Data Center Bay 2",
    notes: "Staging host server",
    createdAt: "2023-11-01T12:00:00.000Z",
    updatedAt: "2024-02-18T10:00:00.000Z"
  },
  {
    _id: "ast_107",
    assetName: "iPhone 15 Pro Enterprise Edition",
    assetType: "Smartphone",
    serialNumber: "DX3L8821N90P",
    assignedTo: "Patrick Torres",
    status: "Assigned",
    purchaseDate: "2024-02-01T00:00:00.000Z",
    cost: 1199,
    department: "Executive",
    location: "Mobile",
    notes: "MDM Profile Active",
    createdAt: "2024-02-01T15:00:00.000Z",
    updatedAt: "2024-02-05T09:30:00.000Z"
  },
  {
    _id: "ast_108",
    assetName: "Legacy Desktop Workstation i7-7700",
    assetType: "Desktop",
    serialNumber: "D10-998231",
    assignedTo: "Unassigned",
    status: "Retired",
    purchaseDate: "2018-04-10T00:00:00.000Z",
    cost: 950,
    department: "IT Storage",
    location: "Recycling Warehouse",
    notes: "Decommissioned due to age",
    createdAt: "2018-04-10T10:00:00.000Z",
    updatedAt: "2023-12-31T17:00:00.000Z"
  } 
];

class LocalStorage {
  constructor() {
    this.ensureDataFile();
  }

  ensureDataFile() {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialAssets, null, 2));
    }
  }

  getAll() {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return initialAssets;
    }
  }

  saveAll(assets) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(assets, null, 2));
  }

  find(query = {}) {
    let assets = this.getAll();
    if (query.search) {
      const q = query.search.toLowerCase();
      assets = assets.filter(a => 
        a.assetName.toLowerCase().includes(q) ||
        a.serialNumber.toLowerCase().includes(q) ||
        a.assignedTo.toLowerCase().includes(q) ||
        a.assetType.toLowerCase().includes(q)
      );
    }
    if (query.status && query.status !== 'All') {
      assets = assets.filter(a => a.status === query.status);
    }
    if (query.assetType && query.assetType !== 'All') {
      assets = assets.filter(a => a.assetType === query.assetType);
    }
    return assets;
  }

  findById(id) {
    const assets = this.getAll();
    return assets.find(a => a._id === id || a.id === id);
  }

  create(assetData) {
    const assets = this.getAll();
    const newAsset = {
      _id: 'ast_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      assetName: assetData.assetName,
      assetType: assetData.assetType || 'Laptop',
      serialNumber: assetData.serialNumber,
      assignedTo: assetData.assignedTo || 'Unassigned',
      status: assetData.status || 'Available',
      purchaseDate: assetData.purchaseDate || new Date().toISOString(),
      cost: Number(assetData.cost) || 0,
      department: assetData.department || 'IT Operations',
      location: assetData.location || 'Headquarters',
      notes: assetData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    newAsset.id = newAsset._id;
    assets.unshift(newAsset);
    this.saveAll(assets);
    return newAsset;
  }

  update(id, updateData) {
    const assets = this.getAll();
    const index = assets.findIndex(a => a._id === id || a.id === id);
    if (index === -1) return null;

    const updated = {
      ...assets[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    assets[index] = updated;
    this.saveAll(assets);
    return updated;
  }

  delete(id) {
    let assets = this.getAll();
    const initialLen = assets.length;
    assets = assets.filter(a => a._id !== id && a.id !== id);
    if (assets.length === initialLen) return false;
    this.saveAll(assets);
    return true;
  }

  seed() {
    this.saveAll(initialAssets);
    return initialAssets;
  }
}

module.exports = new LocalStorage();
