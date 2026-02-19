import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getV1VKDLoginPage().open();
    await poManager.setTheEapIpFakesMockCookie('10.12.179.9','VKD');
    await poManager.getV1VKDLoginPage().requestNewActivationCode();
    await poManager.getV1RequestCodePage().verifyPageOpenedViaUrl();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test('Go to request activation code page', async () => {
    await poManager.getV1RequestCodePage().verifyPageOpenedViaUrl();
});

test('Request a new activation code with an invalid ID', async () => {
    await poManager.setCookiesForCustomerDoesNotHaveAllowedCustomerType();
    await poManager.getV1RequestCodePage().fillCustomerId('123456789');
    await poManager.verifyScreenshot();
    await poManager.getV1RequestCodePage().submit();
    await poManager.getV1RequestCodeStatePage().isCustomerCannotUseServiceCurrentlyVisible();
});

test('Request a new activation code with a valid customer ID', async () => {
    await poManager.setAccountManagementServiceMockWithNoError();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.getV1RequestCodePage().fillCustomerId('123456789');
    await poManager.getV1RequestCodePage().submit();
    await poManager.getV1RequestCodeStatePage().isActivationCodeRequestedConfirmationVisible();
});
