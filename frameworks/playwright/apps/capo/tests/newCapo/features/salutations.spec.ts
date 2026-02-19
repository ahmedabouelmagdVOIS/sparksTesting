import { test } from '@playwright/test';
import { POManager } from '../../../pages/POManager';

let poManager: POManager;
let serverUuid: string;

const salutationCases = ['Herr', 'Frau', 'Keine Anrede'];
const companyCases = ['Firma', '', 'INVALID_SALUTATION'];
const allCases = ['Herr', 'Frau', 'Keine Anrede', 'Firma', '', 'INVALID_SALUTATION'];
const nullCases = [null, 123456];

test.beforeEach(async ({ page }) => {
  poManager = new POManager(page);
  serverUuid = await poManager.getServerUuid();
  await poManager.clearNewCapoExpectations();
  await poManager.assertSuccessfulAssetRequests();
});

test.afterEach(async () => {
  await poManager.clearNewCapoExpectations();
});

test.describe('A user with "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstNAme" in case of early activation is already triggered', () => {
  for (const salutation of salutationCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_pending',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewActivationPendingPage().activationPendingPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('A user with "Firma" or empty or invalid salutation is greeted with "Hallo" in case of early activation is already triggered', () => {
  for (const salutation of companyCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_pending',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewActivationPendingPage().activationPendingPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('A user with "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstName" if the early activation is postponed', () => {
  for (const salutation of salutationCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const firstName = 'Mansour-' + await poManager.generateRandomId();
      const mockserverUpdatedData = {
        firstName: firstName,
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.getNewLandingPage().postponeEarlyActivation();
      await poManager.getNewPostponeEarlyActivationPage().postponeEarlyActivationPageIsOpened();
      await poManager.assertGreetingWithName(firstName);
    });
  }
});

test.describe('A user with "Firma", empty or invalid salutation is greeted with "Hallo" if the early activation is postponed', () => {
  for (const salutation of companyCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.getNewLandingPage().postponeEarlyActivation();
      await poManager.getNewPostponeEarlyActivationPage().postponeEarlyActivationPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('A user with "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstName" on the landing page', () => {
  for (const salutation of salutationCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const firstName = 'Mansour-' + await poManager.generateRandomId();
      const mockserverUpdatedData = {
        firstName: firstName,
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.assertGreetingWithName(firstName);
    });
  }
});

test.describe('A user with "Firma", empty or invalid salutation is greeted with "Hallo" on the landing page', () => {
  for (const salutation of companyCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('A user with an "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstName" after successful early activation', () => {
  for (const salutation of salutationCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const firstName = 'Mansour-' + await poManager.generateRandomId();
      const mockserverUpdatedData = {
        firstName: firstName,
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.getNewLandingPage().earlyActivate();
      await poManager.getNewSuccessfulActivationPage().successfulActivationPageIsOpened();
      await poManager.assertGreetingWithName(firstName);
    });
  }
});

test.describe('A user with "Firma", empty or invalid salutation is greeted with "Hallo" after successful early activation', () => {
  for (const salutation of companyCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.getNewLandingPage().earlyActivate();
      await poManager.getNewSuccessfulActivationPage().successfulActivationPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('A user with an empty $firstName is greeted with "Hallo"', () => {
  for (const salutation of allCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: '',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('The user is greeted with "Hallo" in case of early activation error', () => {
  for (const salutation of allCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_error',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.getNewLandingPage().earlyActivate();
      await poManager.getNewActivationErrorPage().activationErrorPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('The user is greeted with "Hallo" in case of an error before the landing page', () => {
  for (const salutation of allCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_ineligible',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPageErrorPage().landingPageErrorPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});

test.describe('A user with a null or numerical salutation is greeted with "Hallo"', () => {
  for (const salutation of nullCases) {
    test(`Testing the "${salutation}" salutation`, async () => {
      const mockserverUpdatedData = {
        firstName: 'Mansour',
        salutation: salutation,
        serverUuid: serverUuid
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.setHeaders({
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk=',
      });
      await poManager.openCapo();
      await poManager.getNewLandingPage().landingPageIsOpened();
      await poManager.newCapoAssertGreetingWithoutName();
    });
  }
});
