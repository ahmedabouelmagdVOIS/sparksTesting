import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getMainPage().open();
    await poManager.setCookiesForASuccessfulSolsticeLogin();
    await poManager.setCookiesForDeviceActivationWithState('Completed');
    await poManager.getFakeMeinVodafoneLoginPage().open();
    await poManager.getFakeMeinVodafoneLoginPage().iLoginAsASolsticeCustomer('OIDCCode1', 'OIDCState1');
    await poManager.getV2ContractSelectionPage().selectContract('contractId1');
    await poManager.getV2ContractSelectionPage().submit();
    await poManager.getV2ActivationPage().verifyPageOpenedViaUrl();
    await poManager.verifyScreenshot();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Solstice - Activation page', () => {
    test('Confirmation button is enabled if both, terms and conditions and security hints are checked', async () => {
        await poManager.getV2ActivationPage().verifyConfirmationButtonIsDisabled();
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().verifyConfirmationButtonIsEnabled();
    });

    test('Successful device activation', async () => {
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().submit();
        await poManager.getV2ActivationStatePage().verifyPageOpenedViaUrl();
    });

    test('Activation already pending', async () => {
        await poManager.setCookiesForDeviceActivationWithException('PendingOrderException');
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().submit();
        await poManager.getV2ActivationPendingErrorPage().verifyPageOpenedViaUrl();
    });

    test('Activation returns error', async () => {
        await poManager.setCookiesForDeviceActivationWithException('SolsticeWorkflowException');
        await poManager.getV2ActivationPage().acceptTermsAndSecurityHints();
        await poManager.getV2ActivationPage().submit();
        await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
    });

    test('Zurueck button returns to contract selection page', async () => {
        await poManager.getV2ActivationPage().goBack();
        await poManager.getV2ContractSelectionPage().verifyPageOpenedViaUrl();
    });

    test('Terms and condition link points to the right place', async () => {
        await poManager.getActivationPage().theTermsAndConditionsLinkPointsToTheExpectedPdf();
    });

    test('Open the security hints and answer questions with yes', async () => {
        await poManager.getActivationPage().openSecurityHints();
        await poManager.getActivationPage().isSecurityQuestionVisible('1');
        await poManager.verifyScreenshot();
        await poManager.getActivationPage().answerAllSecurityQuestionsWithYes();
        await poManager.getActivationPage().isSuccessfullSecurityQuestionConfirmationVisible();
    });

    test('Open the security hints and answer questions with no', async () => {
        await poManager.getActivationPage().openSecurityHints();
        await poManager.getActivationPage().isSecurityQuestionVisible('1');
        await poManager.getActivationPage().answerAllSecurityQuestionsWithNo();
        await poManager.getActivationPage().isUnsuccessfullSecurityQuestionConfirmationVisible();
    });
});
