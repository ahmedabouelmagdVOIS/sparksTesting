import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getMainPage().open();
    await poManager.setTheEapIpFakesMockCookie('10.12.182.87','VKD');
    await poManager.setCookiesForCustomerToHaveContracts('contractId1,contractId2,contractId3');
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Solstice - Access pages without logged in user', () => {
    test('Contract selection redirects to login page when not logged in', async () => {
        await poManager.getV2ContractSelectionPage().open();
        await poManager.getV2VKDLoginPage().verifyPageOpenedViaUrl();
    });
    test('Activation page redirects to login page when not logged in', async () => {
        await poManager.getV2ActivationPage().open();
        await poManager.getV2VKDLoginPage().verifyPageOpenedViaUrl();
    });
    test('Activation state page redirects to login page when not logged in', async () => {
        await poManager.getV2ActivationStatePage().open();
        await poManager.getV2VKDLoginPage().verifyPageOpenedViaUrl();
    });
});
