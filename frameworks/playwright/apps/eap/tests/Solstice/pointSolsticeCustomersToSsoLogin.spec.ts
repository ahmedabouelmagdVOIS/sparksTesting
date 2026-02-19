import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getV1VKDLoginPage().open();
    await poManager.getV1VKDLoginPage().verifyPageOpenedViaUrl();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Solstice - Point Solstice customers to SSO login', () => {
    test('Customer enters a Solstice customer id on the legacy main page', async () => {
        await poManager.getV1VKDLoginPage().fillCustomerId('101234567890');
        await poManager.getV1VKDLoginPage().solsticeCustomerLoginHintIsVisible();
        await poManager.verifyScreenshot();
        await poManager.getV1VKDLoginPage().clickLinkInHint();
        await poManager.getV2VKDLoginPage().verifyPageOpenedViaUrl();
    });
    test('Customer requests an activation code using a Solstice customer id', async () => {
        await poManager.setTheEapIpFakesMockCookie('10.12.179.9','VKD');
        await poManager.getV1VKDLoginPage().requestNewActivationCode();
        await poManager.getV1RequestCodePage().verifyPageOpenedViaText();
        await poManager.getV1RequestCodePage().fillCustomerId('101234567890');
        await poManager.getV1RequestCodePage().solsticeCustomerLoginHintIsVisible();
        await poManager.verifyScreenshot();
        await poManager.getV1RequestCodePage().clickLinkInHint();
        await poManager.getV2VKDLoginPage().verifyPageOpenedViaUrl();
    });
});
