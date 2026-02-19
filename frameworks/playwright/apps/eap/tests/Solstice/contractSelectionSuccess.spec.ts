import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getMainPage().open();
    await poManager.setOpenIdConnectClientMockCookie('code', 'state');
    await poManager.setMintClientMockCookie('100,101');
    await poManager.setResetDeviceActivationClientMockCookie('aa:bb:cc:dd:ee:ff', '3');
    await poManager.setCookiesForCustomerToHaveContracts('contractId1,contractId2,contractId3');
    await poManager.getMainPage().goToLogin();
    await poManager.getVKDLoginPage().unfoldLogInWithUserNameAndPassword();
    await poManager.getVKDLoginPage().clickOnLogInWithUserNameAndPasswordButton();
    await poManager.getFakeMeinVodafoneLoginPage().verifyPageOpenedViaUrl();
    await poManager.getFakeMeinVodafoneLoginPage().fillFakeMeinVodafonePageFields('code', 'state', '/v2/account');
    await poManager.getFakeMeinVodafoneLoginPage().clickSubmit();
    await poManager.getV2ContractSelectionPage().verifyPageOpenedViaUrl();
    await poManager.getV2ContractSelectionPage().verifyDisplayOf('Bitte wähle den Vertrag aus, für den das Gerät aktiviert werden soll');
    await poManager.getV2ContractSelectionPage().verifyDisplayOfContract('contractId1');
    await poManager.getV2ContractSelectionPage().verifyDisplayOfContract('contractId2');
    await poManager.getV2ContractSelectionPage().verifyDisplayOfContract('contractId3');
    await poManager.getV2ContractSelectionPage().verifyDisplayOf('Vertrag auswählen');
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Solstice - Contract selection success', () => {
    test('I select the first contract', async () => {
        await poManager.getV2ContractSelectionPage().selectContract('contractId1');
        await poManager.getV2ContractSelectionPage().submit();
        await poManager.getV2ActivationPage().verifyPageOpenedViaUrl();
        await poManager.getV2ActivationPage().verifyDisplayOf('Kabelmodem aktivieren');
        await poManager.getV2ActivationPage().verifyDisplayOf('aa:bb:cc:dd:ee:ff');
        await poManager.getV2ActivationPage().verifySubmitButtonIsDisabled();
    });
    test('The v1 activation hint contains a link to the v1 login', async () => {
        await poManager.setMintLogoutMockCookie();
        await poManager.getV2ContractSelectionPage().clickV1LoginHint();
        await poManager.getV1VKDLoginPage().verifyPageOpenedViaUrl();
    });
});
