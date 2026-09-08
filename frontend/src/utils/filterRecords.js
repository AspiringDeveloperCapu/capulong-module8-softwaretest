// src/utils/filterRecords.js
export function filterRecords(records, keyword) {
    if (!Array.isArray(records)) return [];
    const term = (keyword || '').toString().toLowerCase().trim();
    if (!term) return records;

    return records.filter(record => {
        const name = (record.assetName || '').toLowerCase();
        const sn = (record.serialNumber || '').toLowerCase();
        const assignee = (record.assignedTo || '').toLowerCase();

        return name.includes(term) || sn.includes(term) || assignee.includes(term);
    });
}