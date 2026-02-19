# Playwright Framework - README

## Overview
This repository contains an advanced Playwright-based end-to-end testing framework for web applications. It supports multiple app modules, robust configuration, and flexible test execution for CI/CD and local development.

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
  - To update Node.js, visit https://nodejs.org/ and download the latest LTS version for your OS, or use a version manager like [nvm](https://github.com/nvm-sh/nvm):
    ```bash
    nvm install --lts
    nvm use --lts
    ```
- npm (v9 or later recommended)
  - To update npm, run:
    ```bash
    npm install -g npm@latest
    ```

### Setup
1. Clone the repository (if you haven't already):
   ```bash
   git clone https://github.com/ahmedabouelmagdVOIS/sparksTesting.git
   ```
2. Navigate to the Playwright framework directory:
   ```bash
   cd frameworks/playwright
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. (If needed) Install Playwright browsers:
   ```bash
   npx playwright install
   ```

Now you are ready to run tests!

## Directory Structure
```
frameworks/playwright/
├── apps/
│   ├── app_name/
│       ├── pages/            # Page Object Models for the app
│       ├── tests/            # Test specs for the app
│       ├── testData/         # Test data and snapshots
│       └── runConfigurations/# Run configuration files
├── common/                   # Shared helpers/utilities
├── playwright.config.ts      # Main Playwright configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── screenshot.css            # Custom screenshot styling
```

## Playwright Configuration (`playwright.config.ts`)
- **Multi-app support:** Uses environment variables (`APP_NAME`, `ENV`) to select app and environment.
  - `APP_NAME` must match the folder name of your app under `apps/` and must be in lowercase (e.g., `eap`). Using uppercase or mismatched names will cause failures.
  - `ENV` specifies the target environment (e.g., `test1b`, `test2b`).
- **Environment loading:** Reads the relative environment variable file for the selected app and environment (e.g., `apps/eap/.env.eap.test1b`).
  - All passwords and credentials must be stored in the `.env` file for security. Do not hardcode secrets in code or scripts.
- **Output directories:** Test results, reports, and traces are timestamped for local runs; CI runs use fixed paths.
- **Reporter:** HTML reports are generated in the configured output folder.
- **Snapshots:** Custom path for visual regression snapshots per app.
- **Expect:** Custom screenshot style via `screenshot.css`.
- **Options to run tests:**
  - Run all tests for a specific app and environment:
    ```bash
    APP_NAME=eap ENV=test1b npx playwright test --project=eap
    ```
  - Run a specific test file:
    ```bash
    APP_NAME=eap ENV=test1b npx playwright test apps/eap/tests/mainPage.spec.ts --project=eap
    ```
  - Run in headed mode (show browser):
    ```bash
    APP_NAME=eap ENV=test1b npx playwright test --project=eap --headed
    ```
  - Run with debug output:
    ```bash
    APP_NAME=eap ENV=test1b npx playwright test --project=eap --debug
    ```
  - For more options, see Playwright CLI documentation.

## How to Run Tests

### Set Up Environment
- Ensure `.env` files exist for your app/environment in `apps/<app>/` (e.g., `apps/eap/.env.eap.test1b`).

### Run Tests (Examples)
#### For EAP app (custom run):
```bash
APP_NAME=eap ENV=test1b npx playwright test --project=eap
```

### View Reports
- After test execution, HTML reports are generated in the `testResults/<timestamp>/reports` folder (local) or `testResults/reports` (CI).
- Open the HTML file in your browser to view results.

## Adding a New App

To add a new app to the Playwright framework:
1. Create a new folder under `apps/` with your app's lowercase name (e.g., `apps/myapp`).
2. Add the following structure inside your app folder:
   - `pages/` for Page Object Models
   - `tests/` for test specs
   - `testData/` for test data and snapshots
   - `runConfigurations/` for any run configuration files
3. Place test specs in `apps/<app>/tests/`.
4. Use Page Object Models from `apps/<app>/pages/` for maintainable test code.
5. Create a PoManager in `apps/<app>/pages/` to manage page objects and avoid duplicate imports in tests.
6. Shared helpers are in `common/`.
7. Add a `.env` file for each environment you want to test (e.g., `.env.myapp.test1b`).
8. Optionally, add a script in your app's `package.json` under the `scripts` section for easier execution. For example:
   ```json
   "scripts": {
     "test:myapp:test1b": "APP_NAME=myapp ENV=test1b npx playwright test --project=myapp"
   }
   ```
   You can then run your tests with:
   ```bash
   npm run test:myapp:test1b
   ```
   This makes running tests for your app and environment more convenient and repeatable.
9. Optionally, organize your run configurations for better collaboration:
   - Use Playwright's built-in run configuration feature to create and save custom run settings (e.g., browser, environment, test filters).
   - Save these configuration files in `apps/<app>/runConfigurations/`.
   - This approach allows you to save and reuse specific test run configurations for different purposes, such as smoke tests, regression suites, or feature-specific runs.

## TypeScript Support
- All code is written in TypeScript. See `tsconfig.json` for compiler options.

## Visual Regression
- Snapshots for visual tests are stored in `apps/<app>/testData/snapshots/`.
- Custom screenshot styles are defined in `screenshot.css`.

## More Information
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---
For questions or issues, contact salma.desoky@vodafone.com, mohamed.elnewehe@vodafone.com or ahmed.abouelmagd@vodafone.com.
