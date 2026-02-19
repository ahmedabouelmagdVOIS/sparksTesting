import { test, expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getMainPage().open();
    await poManager.setCookiesForASuccessfulSolsticeLogin();
    await poManager.setMintLogoutMockCookie();
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Solstice - Logout from EAP', () => {
    const logoutExamples = [
        { network: 'VKD', pageLocator: 'Aktivierung Deines eigenen Kabelmodems' },
        { network: 'UM', pageLocator: 'Hast Du eine Kundennummer mit 9 oder 10 Stellen? Dann meld Dich beim Kundenservice.' },
    ];
    for (const example of logoutExamples) {
        test(`Customer with customer ids linked to MeinVodafone account can logout on the contract selection page for network ${example.network}`, async () => {
            await poManager.setTheEapIpFakesMockCookie('10.0.0.1', example.network);
            await poManager.loginToMeinVodafoneWithUrl();
            await poManager.getV2ContractSelectionPage().logOut();
            await poManager.getV2LoginPage().verifyDisplayOf(example.pageLocator);
        });
        test(`Customer without customer ids linked to MeinVodafone account can logout on the no contract found page for network ${example.network}`, async () => {
            await poManager.setTheEapIpFakesMockCookie('10.0.0.1', example.network);
            await poManager.setMintClientMockCookieWithoutCustomerIds();
            await poManager.loginToMeinVodafoneWithUrl();
            await poManager.getV2ContractSelectionPage().verifyDisplayOf('Es konnte kein Internetvertrag gefunden werden.');
            await poManager.getV2ContractSelectionPage().logOut();
            await poManager.getV2LoginPage().verifyDisplayOf(example.pageLocator);
        });
        test(`A non Solstice customer can logout on the no contract found page for network ${example.network}`, async () => {
            await poManager.setTheEapIpFakesMockCookie('10.0.0.1', example.network);
            await poManager.setMintClientMockCookieAsNotSolsticeCustomer();
            await poManager.loginToMeinVodafoneWithUrl();
            await poManager.getV2ContractSelectionPage().verifyDisplayOf('Es konnte kein Internetvertrag gefunden werden.');
            await poManager.getV2ContractSelectionPage().logOut();
            await poManager.getV2LoginPage().verifyDisplayOf(example.pageLocator);
        });
    }
    test('A Solstice customer can logout on the maintenance page', async () => {
        await poManager.setMintClientMockCookieWithException('InvalidArgumentException');
        await poManager.loginToMeinVodafoneWithUrl();
        await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
        await poManager.getV2ContractSelectionPage().logOut();
        await poManager.getV2VKDLoginPage().verifyPageOpenedViaUrl();
    });
});
