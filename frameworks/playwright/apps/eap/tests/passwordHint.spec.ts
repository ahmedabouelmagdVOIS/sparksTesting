import { test, expect } from '@playwright/test';
import { POManager } from '../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
});

const WithoutPasswordTestData = [
    {
        credentialsFormat: 'new',
        numberOfPhoneNumbers: 10,
        withPasswords: 'without',
        numberOfPasswords: 0
    },
    {
        credentialsFormat: 'new',
        numberOfPhoneNumbers: 1,
        withPasswords: 'without',
        numberOfPasswords: 0
    },
    {
        credentialsFormat: 'old',
        numberOfPhoneNumbers: 10,
        withPasswords: 'without',
        numberOfPasswords: 0
    },
    {
        credentialsFormat: 'old',
        numberOfPhoneNumbers: 1,
        withPasswords: 'without',
        numberOfPasswords: 0
    }
];
WithoutPasswordTestData.forEach(({ credentialsFormat, numberOfPhoneNumbers, withPasswords, numberOfPasswords }) => {
    test(`Legacy customer activates their own device successfully and sees SIP credentials - Without password (${credentialsFormat}, ${numberOfPhoneNumbers} phone numbers, ${numberOfPasswords} passwords)`, async () => {
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
        await poManager.getV1ActivationPage().verifySavePasswordHintTextAbsence();
    });
});

const withPasswordTestData = [
    {
        credentialsFormat: 'new',
        numberOfPhoneNumbers: 10,
        withPasswords: 'with',
        numberOfPasswords: 10
    },
    {
        credentialsFormat: 'new',
        numberOfPhoneNumbers: 1,
        withPasswords: 'with',
        numberOfPasswords: 1
    },
    {
        credentialsFormat: 'old',
        numberOfPhoneNumbers: 10,
        withPasswords: 'with',
        numberOfPasswords: 10
    },
    {
        credentialsFormat: 'old',
        numberOfPhoneNumbers: 1,
        withPasswords: 'with',
        numberOfPasswords: 1
    }
];
withPasswordTestData.forEach(({ credentialsFormat, numberOfPhoneNumbers, withPasswords, numberOfPasswords }) => {
    test(`Legacy customer activates their own device successfully and sees SIP credentials - With password (${credentialsFormat}, ${numberOfPhoneNumbers} phone numbers, ${numberOfPasswords} passwords)`, async () => {
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
        await poManager.getV1ActivationPage().verifySavePasswordHintTextDisplay();
    });

});

const sipCredentialsTestData = [
    { numberOfSipCredentials: 0,
    showPasswordHint: false },
    { numberOfSipCredentials: 1,
        showPasswordHint: true  },
    { numberOfSipCredentials: 10,
        showPasswordHint: true  }
];

sipCredentialsTestData.forEach(({ numberOfSipCredentials, showPasswordHint }) => {
    test(`Fusion-C customer activates their device successfully and sees '${numberOfSipCredentials}' SIP credentials`, async () => {
        await poManager.getMainPage().open();
        await poManager.setCookiesForASuccessfulSolsticeLogin();
        await poManager.setCookiesForDeviceActivationWithState('Completed');
        await poManager.getFakeMeinVodafoneLoginPage().open();
        await poManager.getFakeMeinVodafoneLoginPage().iLoginAsASolsticeCustomer('OIDCCode1', 'OIDCState1');
        await poManager.getV2ContractSelectionPage().selectContract('contractId1');
        await poManager.getV2ContractSelectionPage().submit();
        await poManager.getV2ActivationPage().verifyPageOpenedViaUrl();
        await poManager.setCookiesForDeviceActivationWithStateAndNumberOfCredentials('Completed', numberOfSipCredentials);
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().submit();
        await poManager.getV2ActivationStatePage().verifySIPCredentialsDisplayOrAbsence(showPasswordHint);
        await poManager.getV2ActivationStatePage().verifySavePasswordHintTextDisplayOrAbsence(showPasswordHint);
    });
});
