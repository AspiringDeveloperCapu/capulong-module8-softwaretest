# Test Plan for IT Asset Management System

## 1. Objectives
The objective of this test plan is to verify and validate the IT Asset Management System (Module 7 implementation) against the architectural design requirements (Module 6). Testing will identify defects, ensure the software functions as expected, and build confidence in the system's readiness.

## 2. Scope
### Items to Test
- Vue.js Frontend Components (Add, Edit, Delete, Search)
- Form validation (required fields, asset types)
- Local data persistence (mock backend or local storage)
- Pure utility functions (search filtering)
- Responsive UI behavior

### Items Not Tested
- Backend API endpoints (Node.js/Express)
- Database persistence (MongoDB Atlas)
- User Authentication

## 3. Environment
- **Platform:** Web Browser (Google Chrome / Mozilla Firefox)
- **Frameworks:** Vue.js 3, Vite
- **Testing Tools:** Manual Testing, Vitest (for automated unit testing), Vue Test Utils

## 4. Risks
- **Data Loss:** If local storage logic fails, records might not persist.
- **Search Inaccuracy:** If search utility function uses incorrect properties, assets may become "invisible" to users.
- **Validation Failure:** Incomplete records might be submitted if validation is bypassed.

## 5. Responsibilities
- **Developer/Tester:** Execute manual tests, write automated unit tests for utility functions and components, document and fix defects, and maintain testing evidence.

## 6. Entry and Exit Criteria
### Entry Criteria
- The Module 7 Vue.js application builds and runs successfully in the development environment.
- Required dependencies (Vitest, Vue Test Utils) are installed.

### Exit Criteria
- 10 manual test cases are executed and documented with clear statuses (Pass/Fail).
- At least one defect is discovered, documented in a defect report, and subsequently fixed.
- At least two Vitest automated tests pass successfully.
- GitHub Actions CI workflow successfully runs tests and builds the application without errors.
