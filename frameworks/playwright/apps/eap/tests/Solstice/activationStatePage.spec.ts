import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getMainPage().open();
    await poManager.setCookiesForASuccessfulSolsticeLogin();
    await poManager.setCookiesForDeviceActivationWithState('Completed');
    await poManager.getFakeMeinVodafoneLoginPage().open();
    await poManager.verifyScreenshot();
    await poManager.getFakeMeinVodafoneLoginPage().iLoginAsASolsticeCustomer('OIDCCode1', 'OIDCState1');
    await poManager.getV2ContractSelectionPage().selectContract('contractId1');
    await poManager.verifyScreenshot();
    await poManager.getV2ContractSelectionPage().submit();
    await poManager.getV2ActivationPage().verifyPageOpenedViaUrl();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Solstice - Activation state page', () => {
    test('Activation state is pending', async () => {
        await poManager.setCookiesForDeviceActivationWithState('Pending');
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().submit();
        await poManager.getV2ActivationStatePage().verifyErrorTextToBe('Dein Endgerät wird gerade aktiviert. Dieser Vorgang kann einige Minuten dauern.');
    });
    test('Activation state is success', async () => {
        await poManager.setCookiesForDeviceActivationWithState('Completed');
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().submit();
        await poManager.getV2ActivationStatePage().verifyErrorTextToBe('Dein Endgerät wurde erfolgreich aktiviert.');
    });

    const sipCredentialsTestData = [
        { numberOfSipCredentials: 1 },
        { numberOfSipCredentials: 10 }
    ];

    sipCredentialsTestData.forEach(({ numberOfSipCredentials }) => {
        test(`Activation state is success and I get SIP credentials (${numberOfSipCredentials} credentials)`, async () => {
            await poManager.setCookiesForDeviceActivationWithStateAndNumberOfCredentials('Completed', numberOfSipCredentials);
            await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
            await poManager.getV2ActivationPage().submit();
            await poManager.getV2ActivationStatePage().verifyErrorTextToBe('Bitte starte Dein Kabelmodem jetzt neu, um den Vorgang abzuschließen.');
            await poManager.getV2ActivationStatePage().verifySIPCredentialsDisplay();
        });
    });

    test('Activation state is failed', async () => {
        await poManager.setCookiesForDeviceActivationWithState('Failed');
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().submit();
        await poManager.getV2ActivationStatePage().verifyErrorTextToBe('Dein Endgerät konnte nicht aktiviert werden.');
    });
});
