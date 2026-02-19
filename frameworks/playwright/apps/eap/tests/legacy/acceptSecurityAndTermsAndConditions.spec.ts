import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getMainPage().open();
    await poManager.setTheEapIpFakesMockCookie('10.0.0.2','VKD');
    await poManager.setCookiesForSuccessfulLegacyLogin();
    await poManager.setCookiesForCustomerDoesNotHaveVodafoneOwnedDevice();
    await poManager.setCookiesForCustomerHasAllowedCustomerType();
    await poManager.getMainPage().goToLogin();
    await poManager.waitForPagePath('/login');
    await poManager.getVKDLoginPage().fillCustomerId('123456789');
    await poManager.getVKDLoginPage().fillActivationCode('11111-11111-11111');
    await poManager.verifyScreenshot();
    await poManager.getVKDLoginPage().weiter();
    await poManager.waitForPagePath('/v1/activation');
    await poManager.getV1ActivationPage().open();
    await poManager.getV1ActivationPage().verifyPageOpenedViaText();
    await poManager.verifyScreenshot();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test('Confirmation button is enabled if both, terms and conditions and security hints are checked', async () => {
    await poManager.getV1ActivationPage().verifyConfirmationButtonIsDisabled();
    await poManager.getV1ActivationPage().acceptTermsAndSecurityHints();
    await poManager.getV1ActivationPage().verifyConfirmationButtonIsEnabled();
    await poManager.verifyScreenshot();
    await poManager.getV1ActivationPage().submit();
    await poManager.getV1ActivationPage().verifyPageOpenedViaUrl();
    await poManager.getV1ActivationPage().verifySuccessfulActivation();
});

// Only works in headed mode!
// test('Open the terms and condition pdf', async () => {
//     await poManager.getV1ActivationPage().openTermsAndConditions();
//     await poManager.shouldBeOnInANewTab('/downloads/Nutzungsbedingungen.pdf');
// });

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
