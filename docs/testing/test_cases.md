# Manual Test Cases — Module 9 Evolution Baseline & Verification

| Test Case ID | Feature | Objective | Preconditions | Test Data | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-01 | Add Record | (Positive) Add valid asset | App is running | Name: "Dell XPS 15", Category: "Laptop", Serial: "DL-123" | 1. Click Add Asset 2. Enter valid data 3. Save | Record appears in list | Record appears in list | Pass |
| TC-02 | Add Record | (Negative) Reject missing field | App is running | Name: (empty), Category: "Laptop" | 1. Click Add Asset 2. Leave name empty 3. Save | Form rejects submission and warns user | Form rejects submission | Pass |
| TC-03 | Display Records | (Positive) Show all records | Records exist in localStorage | N/A | 1. Open application main view | Stored assets and counts are displayed correctly | All records and counts display | Pass |
| TC-04 | Display Records | (Edge) Show empty state | 0 records exist | N/A | 1. Delete all records 2. View list | Empty state message and icon display | Empty state displays | Pass |
| TC-05 | Edit Record | (Positive) Edit and save | 1 record exists | Status: "Assigned" | 1. Click Edit 2. Change Status 3. Save | Record updates in list and persists | Record updates accurately | Pass |
| TC-06 | Edit Record | (Negative) Edit with invalid data | 1 record exists | Cost: "abc" | 1. Click Edit 2. Enter "abc" in Cost 3. Save | Form rejects invalid numerical input | Form rejects invalid input | Pass |
| TC-07 | Delete Record | (Positive) Confirm deletion | 1 record exists | N/A | 1. Click Delete 2. Confirm dialog | Record is removed and counts update | Record removed successfully | Pass |
| TC-08 | Delete Record | (Negative) Cancel deletion | 1 record exists | N/A | 1. Click Delete 2. Cancel dialog | Record remains intact in list | Record remains in list | Pass |
| TC-09 | Search (CR-M9-01) | (Positive) Search existing keyword | Record "Dell XPS 15" exists | Keyword: "Dell" | 1. Enter "Dell" in search input | Matching record displays in real-time | Record displays immediately | Pass |
| TC-10 | Search (CR-M9-01) | (Negative) Search non-existent keyword | Records exist | Keyword: "NonExistentAsset99" | 1. Enter "NonExistentAsset99" in search | "No assets found" empty state message displays | "No assets found" message displays | Pass |
| TC-11 | Search (CR-M9-01) | (Edge) Case-insensitive & trimmed search by Serial | Asset with serial "PF-49X0192" exists | Keyword: "  49x0192  " | 1. Type "  49x0192  " with whitespace and lowercase | Target asset is found despite case/spaces | Matching ThinkPad asset displays | Pass |
| TC-12 | Responsive UI | Verify layout adaptability across viewports | App is running with records | Desktop (1440px) vs Mobile (375px) | 1. View in desktop resolution 2. Resize viewport to 375px | Stats grid wraps; table scrolls horizontally without breaking | Interface remains fully responsive | Pass |

---

### Retest and Regression Summary (Module 9 Evolution)
- **TC-09 Retest:** Re-executed following the implementation of **CR-M9-01** (centralized `filterRecords` utility). Status transitioned from **Fail** $\rightarrow$ **Pass**.
- **TC-11 Added:** Verified case-insensitivity, whitespace trimming, and multi-field serial number filtering.
- **TC-12 Added:** Verified responsive interface behavior on mobile and desktop viewports.
- **Regression Result:** All existing CRUD, validation, and persistence test cases (TC-01 through TC-08) remain passing with zero regressions.

