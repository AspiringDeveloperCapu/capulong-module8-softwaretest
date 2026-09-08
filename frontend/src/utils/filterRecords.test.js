// src/utils/filterRecords.test.js
import { describe, it, expect } from 'vitest'
import { filterRecords } from './filterRecords'
describe('filterRecords', () => {
    const records = [
        { id: 1, assetName: 'Keyboard' },
        { id: 2, assetName: 'Monitor' }
    ]
    it('returns matching records', () => {
        expect(filterRecords(records, 'key')).toHaveLength(1)
    })
    it('ignores letter case', () => {
        expect(filterRecords(records, 'MONITOR')[0].assetName)
            .toBe('Monitor')
    })
})