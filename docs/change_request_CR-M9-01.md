# Change Request: CR-M9-01

## 1. Change Request Overview
- **Change Request ID:** CR-M9-01
- **Title:** Fix and Standardize Multi-Field Asset Search Filtering
- **Maintenance Classification:** Corrective Maintenance
- **Author:** Aaron Jacob Capulong (BSCS - 3A)
- **Target Branch:** `module9/software-evolution`
- **Target Version:** 1.0.1 (Patch increment)
- **Reference Defect:** BUG-01 (`docs/testing/defect_report.md`), TC-09 (`docs/testing/test_cases.md`)

---

## 2. Problem Statement & Background Evidence
During Module 8 Software Testing, execution of test case **TC-09** (*Search existing record by keyword*) failed and Defect **BUG-01** was documented.
- **Observed Behavior:** Searching for an existing asset keyword (such as "Dell") caused the asset list to return empty or inconsistent results under certain data states.
- **Root Cause:** Inconsistent search property targeting and duplicate filtering logic between the pure utility function (`frontend/src/utils/filterRecords.js`) and the component computed property in `App.vue`. The standalone utility did not check all searchable asset fields (serial number, assignee), and null/undefined values in record attributes could cause runtime filtering failures.

---

## 3. Desired Outcome
- Centralize search filtering logic using a robust, tested utility function.
- Support real-time search across `assetName`, `serialNumber`, and `assignedTo`.
- Handle case insensitivity, leading/trailing whitespace trimming, and safeguard against null or undefined property values.
- Resolve Defect BUG-01 and ensure manual test TC-09 passes without breaking existing CRUD and category filtering operations.

---

## 4. Acceptance Criteria
1. **AC-01 (Keyword Match):** Searching for an existing asset keyword in `assetName` (e.g., "Dell", "ThinkPad"), `serialNumber` (e.g., "CN-0V4093"), or `assignedTo` (e.g., "Aaron") returns all matching records.
2. **AC-02 (Input Normalization):** Search matching is case-insensitive (e.g., "dell" matches "Dell") and trims extraneous spaces (e.g., "  dell  ").
3. **AC-03 (Empty Query Handling):** When the search query is blank or cleared, all records matching the active category/status filter are displayed.
4. **AC-04 (Negative Query / Empty State):** Searching for a non-existent keyword (e.g., "XYZNonExistent") returns an empty list and displays the user-friendly empty state message.
5. **AC-05 (Regression Protection):** Existing CRUD actions (Add, View, Edit, Delete, Quick Assign) and localStorage persistence remain fully functional.

---

## 6. Priority and Triage Rationale
- **Priority:** High
- **Severity:** High
- **Rationale:** Search is a fundamental user requirement in an IT Asset Management inventory system. Inaccurate search results prevent administrators from locating devices quickly, leading to user confusion and duplicate asset creation.

---

## 7. Impact Analysis Matrix

| Area | Impacted? | Description of Impact & Actions Required |
|---|---|---|
| **Architecture** | Yes (Minor) | Preserves client-side 3-tier architecture. Centralizes filtering logic from `App.vue` into the reusable utility module `src/utils/filterRecords.js`. |
| **User Interface (UI)** | No | The search toolbar and `RecordList.vue` empty state layout remain visually identical and responsive. |
| **Logic / Implementation** | Yes | Update `src/utils/filterRecords.js` to safely search multiple fields (`assetName`, `serialNumber`, `assignedTo`). Import and use `filterRecords` in `App.vue` computed property. |
| **Data / Storage** | No | Schema for localStorage key `module7-records` remains backward compatible. No schema migration required. |
| **Automated Tests** | Yes | Add new Vitest unit tests in `src/utils/filterRecords.test.js` testing multi-field matching, case insensitivity, and null safety. |
| **Manual Tests** | Yes | Update `docs/testing/test_cases.md` to reflect TC-09 retest pass, and expand manual test cases to at least 12. |
| **CI / Build** | Yes | Ensure `npm run test:run` and `npm run build` execute cleanly and GitHub Actions CI passes. |
| **Documentation** | Yes | Update `README.md` with Module 9 Software Evolution section, release notes, and documentation artifacts. |
