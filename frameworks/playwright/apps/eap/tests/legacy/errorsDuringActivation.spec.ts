import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getV1VKDLoginPage().open();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

const testData = [
    {
        ipAddress: '10.0.0.2',
        deviceType: 'an unassigned',
        errorPageText: 'Leider können wir dieses Gerät nicht aktivieren.'
    },
    {
        ipAddress: '10.0.0.3',
        deviceType: 'an outdated',
        errorPageText: 'Dein Gerät erfüllt leider nicht die Mindestanforderungen für eine Aktivierung.'
    },
    {
        ipAddress: '10.0.0.4',
        deviceType: 'a refurbished',
        errorPageText: 'Leider nutzt Du ein gesperrtes Gerät.'
    }
];
testData.forEach(({ ipAddress, deviceType, errorPageText }) => {
    test(`Customer logs in with ${deviceType} device (${ipAddress}) and sees error: ${errorPageText}`, async () => {
        await poManager.setTheEapIpFakesMockCookie(ipAddress, 'VKD');
        await poManager.setCookiesForSuccessfulLegacyLogin();
        await poManager.setCookiesForCustomerHasVodafoneOwnedDevice();
        await poManager.setCookiesForCustomerHasAllowedCustomerTypeWithDeviceType(deviceType);
        await poManager.getVKDLoginPage().fillCustomerId('123456789');
        await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
        await poManager.getVKDLoginPage().weiter();
        await poManager.getV1ActivationPage().iWaitForErrorBox();
        await poManager.getV1ActivationPage().verifyErrorTextToBe(errorPageText);
    });
});

test('Customer logs in with their own outdated device and sees an error message', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.3','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDevice();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getV1ActivationPage().iWaitForErrorBox();
    await poManager.getV1ActivationPage().verifyErrorTextToBe('Dein Gerät erfüllt leider nicht die Mindestanforderungen für eine Aktivierung.');
});

test('Customer with an unallowed customer type logs in and sees an error message', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerDoesNotHaveAllowedCustomerType();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getV1ActivationPage().iWaitForErrorBox();
    await poManager.getV1ActivationPage().verifyErrorTextToBe('Diesen Service kannst Du im Moment leider nicht nutzen.');
});

test('Customer with a not retrievable customer type logs in and sees the maintenance page', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerErrorInAllowedCustomerType();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
});

test('Customer without an Internet contract logs in and sees an error message', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceHasVoiceContractDoesNotHaveInternetContract();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getV1ActivationPage().iWaitForErrorBox();
    await poManager.getV1ActivationPage().verifyErrorTextToBe('Leider hast Du noch kein Internet-Produkt von Vodafone gebucht.');
});

test('Customer logs in with a not working device and sees the maintenance page', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.5','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDevice();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
});

test('Customer logs in with a working device but an error occurs while retrieving their SIP credentials and they see an error message', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceHasVoiceContract();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.setCookiesForVoiceAdapterClientError();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
    await poManager.getV1ActivationPage().verifyPageContent();
    await poManager.getV1ActivationPage().acceptTermsAndSecurityHints();
    await poManager.getV1ActivationPage().submit();
    await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
});

test('Customer enters an invalid customer ID', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.setCookiesForFailedLegacyLogin();
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getVKDLoginPage().isPleaseCheckAgainBoxVisible();
});

test('Customer enters an invalid activation Code', async () => {
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.getVKDLoginPage().weiter();
    await poManager.getVKDLoginPage().isWrongDataBoxVisible();
});
