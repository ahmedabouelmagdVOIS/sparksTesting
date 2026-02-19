import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test('Customer activates their own device successfully and sees a success message', async () => {
    await poManager.getV1VKDLoginPage().open();
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceDoesNotHaveVoiceContract();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
    await poManager.getV1ActivationPage().verifyPageContent();
    await poManager.getV1ActivationPage().acceptTermsAndSecurityHints();
    await poManager.getV1ActivationPage().submit();
    await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
    await poManager.getV1ActivationPage().verifySuccessfulActivation();
    await poManager.getV1ActivationPage().verifyCustomerOwnModemActivationTextDisplay();
});

test('Customer activates the company-owned device successfully and sees a success message', async () => {
    await poManager.getV1VKDLoginPage().open();
    await poManager.setTheEapIpFakesMockCookie('10.0.0.1','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerHasVodafoneOwnedDeviceDoesNotHaveVoiceContract();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
    await poManager.getV1ActivationPage().verifySuccessfulActivation();
    await poManager.getV1ActivationPage().verifyCompanyModemActivationTextDisplay();
});
