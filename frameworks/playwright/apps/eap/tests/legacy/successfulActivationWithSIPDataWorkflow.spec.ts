import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

const WithoutPasswordTestData = [
    {
        credentialsFormat: 'new',
        numberOfPhoneNumbers: 10,
        withPasswords: 'without',
        numberOfSipUsernames: 10,
        numberOfPasswords: 0
    },
    {
        credentialsFormat: 'old',
        numberOfPhoneNumbers: 1,
        withPasswords: 'without',
        numberOfSipUsernames: 1,
        numberOfPasswords: 0
    }
];
WithoutPasswordTestData.forEach(({ credentialsFormat, numberOfPhoneNumbers, withPasswords, numberOfSipUsernames, numberOfPasswords }) => {
    test(`Customer activates their own device successfully and sees SIP credentials - Without password (${credentialsFormat}, ${numberOfPhoneNumbers} phone numbers, ${numberOfSipUsernames} usernames, ${numberOfPasswords} passwords)`, async () => {
        await poManager.getV1VKDLoginPage().open();
        await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
        await poManager.setCookiesForSuccessfulLegacyLogin();
        await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceHasVoiceContract();
        await poManager.setCookiesForVoiceAdapterClient(credentialsFormat, withPasswords, numberOfPhoneNumbers);
        await poManager.setCookiesForCustomerHasAllowedCustomerType();
        await poManager.getVKDLoginPage().fillCustomerId('123456789');
        await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
        await poManager.getVKDLoginPage().weiter();
        await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
        await poManager.getV1ActivationPage().verifyPageContent();
        await poManager.getV1ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV1ActivationPage().submit();
        await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
        await poManager.getV1ActivationPage().verifySIPCredentialsInstructionDisplay();
        await poManager.getV1ActivationPage().verifyRestartModemInstructionDisplay();
        await poManager.getV1ActivationPage().verifySIPProxyServerDisplayCount(1);
        await poManager.getV1ActivationPage().verifySIPRegistrarDisplayCount(1);
        await poManager.getV1ActivationPage().verifyPhoneNumberDisplayCount(String(numberOfPhoneNumbers));
        await poManager.getV1ActivationPage().verifySIPUsernameDisplayCount(String(numberOfSipUsernames));
        await poManager.getV1ActivationPage().verifySIPPasswordDisplayCount(String(numberOfPasswords));
        await poManager.getV1ActivationPage().verifyPasswordHasAlreadyBeenGivenTextDisplay();
    });
});

const withPasswordTestData = [
    {
        credentialsFormat: 'new',
        numberOfPhoneNumbers: 10,
        withPasswords: 'with',
        numberOfSipUsernames: 10,
        numberOfPasswords: 10
    },
    {
        credentialsFormat: 'old',
        numberOfPhoneNumbers: 1,
        withPasswords: 'with',
        numberOfSipUsernames: 1,
        numberOfPasswords: 1
    }
];
withPasswordTestData.forEach(({ credentialsFormat, numberOfPhoneNumbers, withPasswords, numberOfSipUsernames, numberOfPasswords }) => {
    test(`Customer activates their own device successfully and sees SIP credentials - With password (${credentialsFormat}, ${numberOfPhoneNumbers} phone numbers, ${numberOfSipUsernames} usernames, ${numberOfPasswords} passwords)`, async () => {
        await poManager.getV1VKDLoginPage().open();
        await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
        await poManager.setCookiesForSuccessfulLegacyLogin();
        await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceHasVoiceContract();
        await poManager.setCookiesForVoiceAdapterClient(credentialsFormat, withPasswords, numberOfPhoneNumbers);
        await poManager.setCookiesForCustomerHasAllowedCustomerType();
        await poManager.getVKDLoginPage().fillCustomerId('123456789');
        await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
        await poManager.getVKDLoginPage().weiter();
        await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
        await poManager.getV1ActivationPage().verifyPageContent();
        await poManager.getV1ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV1ActivationPage().submit();
        await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
        await poManager.getV1ActivationPage().verifySIPCredentialsInstructionDisplay();
        await poManager.getV1ActivationPage().verifyRestartModemInstructionDisplay();
        await poManager.getV1ActivationPage().verifySIPProxyServerDisplayCount(1);
        await poManager.getV1ActivationPage().verifySIPRegistrarDisplayCount(1);
        await poManager.getV1ActivationPage().verifyPhoneNumberDisplayCount(String(numberOfPhoneNumbers));
        await poManager.getV1ActivationPage().verifySIPUsernameDisplayCount(String(numberOfSipUsernames));
        await poManager.getV1ActivationPage().verifySIPPasswordDisplayCount(String(numberOfPasswords));
        await poManager.getV1ActivationPage().verifyPasswordHasAlreadyBeenGivenTextAbsence();
    });
});

test('Customer activates a company-owned device successfully and sees a success message', async () => {
    await poManager.getV1VKDLoginPage().open();
    await poManager.setTheEapIpFakesMockCookie('10.0.0.1','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerHasVodafoneOwnedDeviceHasVoiceContract();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
    await poManager.getV1ActivationPage().verifySuccessfulActivation();
});
