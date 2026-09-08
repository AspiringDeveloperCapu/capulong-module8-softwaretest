# Defect Report

| Field | Student Entry |
|---|---|
| Defect ID | BUG-01 |
| Summary | Search function fails to filter records (always returns empty or inaccurate results) |
| Application version/commit | Module 7 initial commit |
| Environment | Vite dev server, Chrome |
| Preconditions | At least one record (e.g., "Dell XPS 15") must exist in the system |
| Steps to reproduce | 1. Open the application <br> 2. Add an asset named "Dell XPS 15" <br> 3. Type "Dell" in the search bar |
| Expected result | The list should filter and display the "Dell XPS 15" record |
| Actual result | No records are displayed |
| Severity | High |
| Priority | High |
| Evidence filename | 03-failed-test-or-defect.png |
| Status | Closed / Verified |
| Fix commit | CR-M9-01 implementation commit |
| Resolution Notes | Centralized search filtering into `filterRecords.js` and integrated with `App.vue`. Added safe handling for `assetName`, `serialNumber`, and `assignedTo`, with case-insensitivity and string trimming. Verified by 7 unit tests and manual retest of TC-09. |

