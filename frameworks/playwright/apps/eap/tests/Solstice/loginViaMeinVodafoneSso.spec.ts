import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getMainPage().open();
    await poManager.setCookiesForASuccessfulSolsticeLogin();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Solstice - Log in via Mein Vodafone SSO', () => {
    const loginExamples = [
        { network: 'VKD'},
        { network: 'UM'},
    ];
    for (const example of loginExamples) {
        test(`Click the SSO login button for network ${example.network}`, async () => {
            await poManager.setTheEapIpFakesMockCookie('10.0.0.1', example.network);
            await poManager.getV2VKDLoginPage().open();
            await poManager.getV2VKDLoginPage().pressTheSSOLoginButton();
            await poManager.getFakeMeinVodafoneLoginPage().verifyPageOpenedViaUrl();
        });
    }
    const contractSelectionExamples = [
        { network: 'VKD', pageLocator: 'Bitte wähle den Vertrag aus, für den das Gerät aktiviert werden soll:' },
        { network: 'UM', pageLocator: 'Ist der gesuchte Vertrag nicht dabei? Dann meld Dich beim Kundenservice.' },
    ];
    for (const example of contractSelectionExamples) {
        test(`Open the contract selection page after successful login at MeinVodafone for network ${example.network}`, async () => {
            await poManager.setTheEapIpFakesMockCookie('10.0.0.1', example.network);
            await poManager.loginToMeinVodafoneWithUrl();
            await poManager.getV2ContractSelectionPage().verifyDisplayOf(example.pageLocator);
        });
        test(`Login state is kept between page loads for network ${example.network}`, async () => {
            await poManager.setTheEapIpFakesMockCookie('10.0.0.1', example.network);
            await poManager.loginToMeinVodafoneWithUrl();
            await poManager.getV2ContractSelectionPage().verifyDisplayOf(example.pageLocator);
            await poManager.getV2LoginPage().open();
            await poManager.getV2ContractSelectionPage().verifyDisplayOf(example.pageLocator);
        });
    }
    test('Sending the wrong OIDC authorization code', async () => {
        await poManager.setMintClientMockCookie('solsticeCustomerId1, solsticeCustomerId2');
        await poManager.loginToMeinVodafoneWithUrlUsingWrongParameters();
        await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
    });
    test('Open the account page directly without URL parameters', async () => {
        await poManager.loginToMeinVodafoneWithUrlUsingWithoutParameters();
        await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
    });
    test('Error on retrieving the MeinVodafone URL', async () => {
        await poManager.setOpenIdConnectClientMockToThrowException('clientException');
        await poManager.getV2VKDLoginPage().open();
        await poManager.getV2VKDLoginPage().pressTheSSOLoginButton();
        await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
    });

});
