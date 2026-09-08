// src/utils/filterRecords.js
export function filterRecords(records, keyword) {
    const term = keyword.toLowerCase().trim()
    return records.filter(record =>
        record.assetName.toLowerCase().includes(term)
    )
}