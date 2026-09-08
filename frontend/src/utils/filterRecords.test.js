// src/utils/filterRecords.test.js
import { describe, it, expect } from 'vitest'
import { filterRecords } from './filterRecords'

describe('filterRecords (CR-M9-01 Evolution)', () => {
    const sampleAssets = [
        { id: 1, assetName: 'Dell XPS 15', serialNumber: 'DL-1234', assignedTo: 'Aaron Capulong' },
        { id: 2, assetName: 'ThinkPad X1 Carbon', serialNumber: 'PF-49X0192', assignedTo: 'Unassigned' },
        { id: 3, assetName: 'Dell UltraSharp Monitor', serialNumber: 'CN-0V4093', assignedTo: 'John Doe' }
    ]

    it('returns matching records by assetName (case-insensitive)', () => {
        const result = filterRecords(sampleAssets, 'dell')
        expect(result).toHaveLength(2)
        expect(result[0].assetName).toBe('Dell XPS 15')
        expect(result[1].assetName).toBe('Dell UltraSharp Monitor')
    })

    it('returns matching records by serialNumber', () => {
        const result = filterRecords(sampleAssets, '49X0192')
        expect(result).toHaveLength(1)
        expect(result[0].assetName).toBe('ThinkPad X1 Carbon')
    })

    it('returns matching records by assigned employee name', () => {
        const result = filterRecords(sampleAssets, 'aaron')
        expect(result).toHaveLength(1)
        expect(result[0].serialNumber).toBe('DL-1234')
    })

    it('handles search terms with leading/trailing whitespace correctly', () => {
        const result = filterRecords(sampleAssets, '   carbon   ')
        expect(result).toHaveLength(1)
        expect(result[0].assetName).toBe('ThinkPad X1 Carbon')
    })

    it('returns empty array when keyword matches no record', () => {
        const result = filterRecords(sampleAssets, 'MacBookPro')
        expect(result).toHaveLength(0)
    })

    it('returns all records when search keyword is empty or undefined', () => {
        expect(filterRecords(sampleAssets, '')).toHaveLength(3)
        expect(filterRecords(sampleAssets, null)).toHaveLength(3)
        expect(filterRecords(sampleAssets, undefined)).toHaveLength(3)
    })

    it('safely handles records with missing or null attributes', () => {
        const corrupted = [
            { id: 4, assetName: null, serialNumber: undefined, assignedTo: null },
            { id: 5, assetName: 'Safe Asset', serialNumber: 'SN-001', assignedTo: 'Alice' }
        ]
        expect(filterRecords(corrupted, 'Safe')).toHaveLength(1)
    })
})