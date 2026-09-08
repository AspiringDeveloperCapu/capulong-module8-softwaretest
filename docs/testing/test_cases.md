# Manual Test Cases

| Test Case ID | Feature | Objective | Preconditions | Test Data | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-01 | Add Record | (Positive) Add valid asset | App is running | Name: "Dell XPS 15", Category: "Laptop", Serial: "DL-123" | 1. Click Add Asset 2. Enter valid data 3. Save | Record appears in list | Record appears | Pass |
| TC-02 | Add Record | (Negative) Reject missing field | App is running | Name: (empty), Category: "Laptop" | 1. Click Add Asset 2. Leave name empty 3. Save | Form rejects submission | Form rejects | Pass |
| TC-03 | Display Records | (Positive) Show all records | 2 records exist | N/A | 1. Navigate to main view | Multiple records are visible | Records display | Pass |
| TC-04 | Display Records | (Edge) Show empty state | 0 records exist | N/A | 1. Delete all records 2. View list | Empty state message displays | Message displays | Pass |
| TC-05 | Edit Record | (Positive) Edit and save | 1 record exists | Status: "Assigned" | 1. Click Edit 2. Change Status 3. Save | Record updates in list | Record updates | Pass |
| TC-06 | Edit Record | (Negative) Edit with invalid data | 1 record exists | Cost: "abc" | 1. Click Edit 2. Enter "abc" in Cost 3. Save | Form rejects submission | Form rejects | Pass |
| TC-07 | Delete Record | (Positive) Confirm deletion | 1 record exists | N/A | 1. Click Delete 2. Confirm dialog | Record is removed | Record removed | Pass |
| TC-08 | Delete Record | (Negative) Cancel deletion | 1 record exists | N/A | 1. Click Delete 2. Cancel dialog | Record remains | Record remains | Pass |
| TC-09 | Search | (Positive) Search existing | Record "Dell XPS" exists | Keyword: "Dell" | 1. Enter "Dell" in search | Record is displayed | **No records** | **Fail** |
| TC-10 | Search | (Negative) Search missing | N/A | Keyword: "Unknown" | 1. Enter "Unknown" | "No assets found" displays | Empty state | Pass |

*Note: TC-09 failed due to a defect in the search logic. See `defect_report.md` for details.*

*Note: TC-08 failed due to a defect in the search logic. See `defect_report.md` for details.*
