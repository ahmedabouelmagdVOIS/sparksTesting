import {test} from '@playwright/test';
import {POManager} from '../../../../pages/POManager';

test.setTimeout(0);

let poManager: POManager;

const salutationCases = ['MALE_SALUTATION', 'FEMALE_SALUTATION', 'NO_SALUTATION'];
const companyCases = ['COMPANY_SALUTATION', 'EMPTY_SALUTATION', 'INVALID_SALUTATION'];

test.beforeEach(async ({page}) => {
    poManager = new POManager(page);
    await poManager.assertSuccessfulAssetRequests();
    await poManager.clearLegacyCapoExpectations();
    const customerId = await poManager.getCustomerId();
    await poManager.uploadLegacyCapoExpectations(customerId, '1.2.3.5', 'a1:b2:c3:d4:e5:f6', 'CCB');
    await poManager.setHeaders({'x-cpe-ip': '1.2.3.5'});
});

test.afterEach(async () => {
    await poManager.clearLegacyCapoExpectations();
});

test.describe('A user with "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstNAme" in case of early activation is already triggered', () => {
    for (const salutation of salutationCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().earlyActivate();
            await poManager.openCapo();
            await poManager.getLegacyActivationPendingPage().activationPendingPageIsOpened();
            await poManager.assertGreetingWithName('Captive');
        });
    }
});

test.describe('A user with "Firma" or empty or invalid salutation is greeted with "Hallo" in case of early activation is already triggered', () => {
    for (const salutation of companyCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().earlyActivate();
            await poManager.openCapo();
            await poManager.getLegacyActivationPendingPage().activationPendingPageIsOpened();
            await poManager.legacyCapoAssertGreetingWithoutName();
        });
    }
});

test.describe('A user with "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstName" if the early activation is postponed', () => {
    for (const salutation of salutationCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().landingPageIsOpened();
            await poManager.getLegacyLandingPage().postponeEarlyActivation();
            await poManager.getLegacyPostponeEarlyActivationPage().postponeEarlyActivationPageIsOpened();
            await poManager.assertGreetingWithName('Captive');
        });
    }
});

test.describe('A user with "Firma" or empty or invalid salutation is greeted with "Hallo" if the early activation is postponed', () => {
    for (const salutation of companyCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().landingPageIsOpened();
            await poManager.getLegacyLandingPage().postponeEarlyActivation();
            await poManager.getLegacyPostponeEarlyActivationPage().postponeEarlyActivationPageIsOpened();
            await poManager.legacyCapoAssertGreetingWithoutName();
        });
    }
});

test.describe('A user with "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstName" on the landing page', () => {
    for (const salutation of salutationCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().landingPageIsOpened();
            await poManager.assertGreetingWithName('Captive');
        });
    }
});

test.describe('A user with "Firma" or empty or invalid salutation is greeted with "Hallo" on the landing page', () => {
    for (const salutation of companyCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().landingPageIsOpened();
            await poManager.legacyCapoAssertGreetingWithoutName();
        });
    }
});

test.describe('A user with an "Herr", "Frau" or "Keine Anrede" salutation is greeted with "Hallo $firstName" after successful early activation', () => {
    for (const salutation of salutationCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().landingPageIsOpened();
            await poManager.getLegacyLandingPage().earlyActivate();
            await poManager.getLegacySuccessfulActivationPage().successfulActivationPageIsOpened();
            await poManager.assertGreetingWithName('Captive');
        });
    }
});

test.describe('A user with "Firma" or empty or invalid salutation is greeted with "Hallo" after successful early activation', () => {
    for (const salutation of companyCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getLegacyLandingPage().landingPageIsOpened();
            await poManager.getLegacyLandingPage().earlyActivate();
            await poManager.getLegacySuccessfulActivationPage().successfulActivationPageIsOpened();
            await poManager.legacyCapoAssertGreetingWithoutName();
        });
    }
});

