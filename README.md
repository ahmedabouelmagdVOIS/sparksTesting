# De-Portal Testing Frameworks

<p align="center">
<b>Unified, scalable, and reusable end-to-end testing for the De-Portal ecosystem.</b>
</p>

---

## Overview

This repository provides a robust, modular structure for all testing frameworks used in the De-Portal ecosystem—including <b>Cypress</b>, <b>Playwright</b>, and <b>RestAssured</b>. It is designed for scalability, reusability, and consistent standards across all test projects.

> [!TIP]
> **Why this repo?**
> - Centralizes test automation for multiple platforms
> - Promotes code sharing and best practices
> - Eases onboarding and maintenance

---

## Project Structure

```
common/                # Shared locators, scripts, and helpers
│
├── Locators/          # Page element locators (JSON)
├── Scripts/           # Common scripts/utilities

frameworks/            # All test frameworks
│
├── cypress/           # Cypress projects
│   └── Projects/
│       ├── project-Anubis/
│       └── project-B neon/
│
├── playwright/        # Playwright projects
│   ├── apps/
│   │   ├── eap/       # EAP app: pages, tests, data
│   │   └── JMC/       # JMC app: pages, tests
│   ├── common/        # Playwright helpers
│   └── testResults/   # Reports & traces
│
└── RestAssured/       # Java API tests

README.md              # This file
```

---


## Prerequisites

- **Node.js** (v18+ recommended) for Playwright and Cypress  
	[Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)  
	[Learn about npm](https://www.npmjs.com/get-npm)
- **Java 11+** and **Maven** for RestAssured  
	[Download Java](https://adoptium.net/) · [Download Maven](https://maven.apache.org/download.cgi)
- **Git** (for cloning and version control)  
	[Download Git](https://git-scm.com/downloads)

---

## Installation


1. **Clone the repository:**
	```bash
	git clone <repo-url>
	cd <repo-folder>
	```
2. **Install dependencies for each framework as needed:**
	- Playwright:
	  ```bash
	  cd frameworks/playwright
	  npm install
	  ```
	- Cypress:
	  ```bash
	  cd frameworks/cypress/Projects
	  npm install
	  ```
	- RestAssured:
	  ```bash
	  cd frameworks/RestAssured
	  mvn clean install
	  ```

---



### Run Tests


#### Playwright
```bash
npx playwright test
```

#### Cypress
```bash
npx cypress open
```

#### RestAssured
```bash
mvn test
```

---

## Key Features

- **Multi-framework support:** Playwright, Cypress, and Java (RestAssured)
- **Modular structure:** Shared locators, helpers, and test data
- **Rich test data:** JSON-based locators and test scenarios
- **Extensible:** Add new frameworks or projects with minimal setup
- **Reporting:** Integrated test results and trace outputs

---

## Directory Highlights

- **common/Locators/**: Centralized page element locators (e.g., [JMC/Locators.json](common/Locators/JMC/Locators.json))
- **frameworks/playwright/apps/eap/pages/**: Page Object Models for EAP
- **frameworks/playwright/apps/eap/tests/**: Playwright test suites (legacy & Solstice)
- **frameworks/playwright/apps/eap/testData/**: Test data and snapshots
- **frameworks/playwright/testResults/**: HTML reports and traces
- **frameworks/cypress/Projects/**: Multiple Cypress projects (Anubis, B neon)
- **frameworks/RestAssured/**: Java-based API tests

---

## Configuration & Customization

### Playwright
- Config: [playwright.config.ts](frameworks/playwright/playwright.config.ts)
- Env vars: `.env` file in Playwright root (see config for required variables)
- Test data: [demoCookies.json](frameworks/playwright/apps/eap/testData/demoCookies.json)

### Cypress
- Config: `cypress.config.js` in each project folder
- Fixtures: `fixtures/` in each project

### RestAssured
- Config: `pom.xml` and Java sources under `src/`

---

## Example: Adding a New Test Project

1. Duplicate an existing project folder under the relevant framework.
2. Update config files and dependencies as needed.
3. Add your tests, pages, and data.
4. Register new locators in `common/Locators/` if needed.
5. Update documentation if your project introduces new patterns or requirements.

---

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Cypress Documentation](https://docs.cypress.io/)
- [RestAssured Documentation](https://rest-assured.io/)
- [Node.js Downloads](https://nodejs.org/)
- [Java Downloads](https://adoptium.net/)
- [Maven Downloads](https://maven.apache.org/download.cgi)
- [Git Downloads](https://git-scm.com/downloads)


> [!NOTE]
> For troubleshooting, see framework-specific docs or open an issue in this repository.

---

## Using as a Node.js Package in Other Projects

### 1. Install as a Dependency
  ```bash
  npm install git+https://github.com/VFDE-Portals/FeatureTestingInternalInitiative.git
  ```
### 2. Import in Your Code

```js
const { /* exported modules */ } = require('@vfde-portals/feature-testing-internal-initiative');
// or, for ES modules:
import { /* exported modules */ } from '@vfde-portals/feature-testing-internal-initiative';
```