---
applyTo: '**'
---
# Copilot Instructions for FeatureTestingInternalInitiative

## Big Picture Architecture
- **Multi-framework repo:** Supports Playwright (TypeScript), Cypress (JavaScript), and RestAssured (Java/Maven) for end-to-end and API testing.
- **Shared resources:** `common/Locators/` (JSON locators), `common/Scripts/` (utilities), and `frameworks/playwright/common/` (helpers) are central for code reuse.
- **Project structure:**
  - `frameworks/playwright/apps/<app>/` — Each app has its own pages, tests, testData, and runConfigurations.
  - `frameworks/cypress/Projects/<project>/` — Each Cypress project is isolated.
  - `frameworks/RestAssured/` — Java API tests, with Maven config.

## Developer Workflows
- **Install dependencies:**
  - Playwright: `cd frameworks/playwright && npm install`
  - Cypress: `cd frameworks/cypress/Projects && npm install`
  - RestAssured: `cd frameworks/RestAssured && mvn clean install`
- **Run tests:**
  - Playwright: `npx playwright test` or with env vars: `APP_NAME=eap ENV=test1b npx playwright test --project=eap`
  - Cypress: `npx cypress open`
  - RestAssured: `mvn test`
- **View reports:**
  - Playwright: `frameworks/playwright/testResults/<timestamp>/reports/` (HTML)
  - Cypress: See project-specific `Reports/` folders
  - RestAssured: Standard Maven output

## Project-Specific Conventions
- **Playwright:**
  - All apps must be lowercase in `apps/` and referenced via `APP_NAME` env var.
  - `.env` files per app/environment (e.g., `apps/eap/.env.eap.test1b`).
  - Page Object Models in `pages/`, managed via PoManager.
  - Visual regression snapshots in `testData/snapshots/`.
  - Custom screenshot styling via `screenshot.css`.
- **Cypress:**
  - Config per project: `cypress.config.js`.
  - Fixtures in `fixtures/`.
- **RestAssured:**
  - Config via `pom.xml` and Java sources under `src/`.

## Integration Points & Patterns
- **Locators:** Centralized in `common/Locators/` for all frameworks.
- **Helpers:** Shared helpers/utilities in `frameworks/playwright/common/`.
- **Test Data:** JSON files in `testData/` folders per app/project.
- **Reports & Traces:** Timestamped folders for Playwright; project-specific for Cypress.

## Examples
- Add a new Playwright app: create `apps/<app>/`, add `pages/`, `tests/`, `testData/`, `runConfigurations/`, `.env` files, update PoManager.
- Add a new Cypress project: duplicate an existing project in `Projects/`, update config and fixtures.
- Add new locators: update `common/Locators/`.

## References
- Key configs: `frameworks/playwright/playwright.config.ts`, `frameworks/cypress/Projects/<project>/cypress.config.js`, `frameworks/RestAssured/pom.xml`
- For troubleshooting, see framework-specific README files or contact maintainers listed in Playwright README.

---
_Review and update this file as workflows or conventions evolve. If unclear, ask maintainers or reference README files._
