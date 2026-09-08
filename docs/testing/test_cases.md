# Manual Test Cases

| Test Case ID | Requirement/Feature | Objective | Preconditions | Test Data | Test Steps | Expected Result | Actual Result | Status | Evidence Filename |
|---|---|---|---|---|---|---|---|---|---|
| TC-01 | Add Record | Verify a valid asset can be added | Application is running | Asset Name: "Dell XPS 15", Category: "Laptop", Serial: "DL-XPS-123", Status: "Available" | 1. Click "Add Asset" 2. Enter valid test data 3. Click "Create Asset" | Record appears in list, count increases, success message displays | Record appears in list | Pass | 03-failed-test-or-defect.png / TC-01.png |
| TC-02 | Add Record Validation | Reject missing required field | Application is running | Asset Name: (empty), Category: "Laptop", Serial: "DL-XPS-123" | 1. Click "Add Asset" 2. Leave Asset Name empty 3. Click "Create Asset" | Form rejects submission, required field warning shows | Form rejects submission | Pass | TC-02.png |
| TC-03 | Add Record Validation | Reject invalid purchase value | Application is running | Cost: "abc" | 1. Click "Add Asset" 2. Enter "abc" in Purchase Value 3. Click "Create Asset" | Form rejects submission, number required | Form rejects submission | Pass | TC-03.png |
| TC-04 | View Records | Display multiple records | At least 2 records exist | N/A | 1. Navigate to main view 2. Observe list | Multiple records are visible in the table/cards | Multiple records display | Pass | TC-04.png |
| TC-05 | Edit Record | Edit and save existing record | At least 1 record exists | Status: "Assigned" | 1. Click "Edit" on a record 2. Change Status to "Assigned" 3. Click "Update Asset" | Record updates with new status in the list | Record updates successfully | Pass | TC-05.png |
| TC-06 | Delete Record | Cancel record deletion | At least 1 record exists | N/A | 1. Click "Delete" on a record 2. Click "Cancel" in confirmation dialog | Record remains in the list unchanged | Record remains | Pass | TC-06.png |
| TC-07 | Delete Record | Confirm record deletion | At least 1 record exists | N/A | 1. Click "Delete" on a record 2. Click "Confirm" in dialog | Record is removed from the list | Record is removed | Pass | TC-07.png |
| TC-08 | Search | Search for an existing record | Record "Dell XPS 15" exists | Keyword: "Dell" | 1. Enter "Dell" in search bar | Only "Dell XPS 15" record is displayed | **No records displayed** | **Fail** | 03-failed-test-or-defect.png |
| TC-09 | Search | Search for a missing record | N/A | Keyword: "UnknownAssetXYZ" | 1. Enter "UnknownAssetXYZ" in search bar | "No assets found" or empty state displays | No assets found | Pass | TC-09.png |
| TC-10 | Persistence | Verify localStorage after refresh | At least 1 record exists | N/A | 1. Note existing records 2. Refresh browser (F5) | The same records load from localStorage | Records reload correctly | Pass | TC-10.png |
| TC-11 | Responsive UI | Check responsive layout | Application is running | N/A | 1. Resize browser window to mobile width (<600px) | Layout adjusts, table becomes scrollable or changes to cards | Layout adjusts | Pass | TC-11.png |
| TC-12 | Summary | Check record count | At least 2 records exist | N/A | 1. Observe total record count | Count matches number of visible records | Count is correct | Pass | TC-12.png |

*Note: TC-08 failed due to a defect in the search logic. See `defect_report.md` for details.*
