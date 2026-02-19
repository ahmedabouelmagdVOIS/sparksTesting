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

test.describe('Solstice - Contract selection failure', () => {
    test('Successfully open the contract selection page with one contract', async () => {
        await poManager.setCookiesForCustomerToHaveContracts('contractId1');
        await poManager.loginToMeinVodafoneWithUrl();
        await poManager.getV2ContractSelectionPage().verifyPageOpenedViaUrl();
    });
    test('Customer has no Solstice contract in VKD', async () => {
        await poManager.setCookiesForCustomerToHaveContracts('');
        await poManager.setTheEapIpFakesMockCookie('10.0.0.1','VKD');
        await poManager.loginToMeinVodafoneWithUrl();
        await poManager.getV2ContractSelectionPage().errorMessageIsVisible();
        await poManager.getV2ContractSelectionPage().verifySuggestionToUseTheActivationCode();
    });
    test('Customer has no Solstice contract in UM', async () => {
        await poManager.setCookiesForCustomerToHaveContracts('');
        await poManager.setTheEapIpFakesMockCookie('10.0.0.1','UM');
        await poManager.loginToMeinVodafoneWithUrl();
        await poManager.getV2ContractSelectionPage().errorMessageIsVisible();
    });
    test('Solstice Customer has no customer id(s) linked to MeinVodafone account in VKD', async () => {
        await poManager.setMintClientMockCookieWithoutCustomerIds();
        await poManager.setTheEapIpFakesMockCookie('10.0.0.1','VKD');
        await poManager.loginToMeinVodafoneWithUrl();
        await poManager.getV2ContractSelectionPage().errorMessageIsVisible();
        await poManager.getV2ContractSelectionPage().verifySuggestionToUseTheActivationCode();
    });
    test('Solstice Customer has no customer id(s) linked to MeinVodafone account in UM', async () => {
        await poManager.setMintClientMockCookieWithoutCustomerIds();
        await poManager.setTheEapIpFakesMockCookie('10.0.0.1','UM');
        await poManager.loginToMeinVodafoneWithUrl();
        await poManager.getV2ContractSelectionPage().errorMessageIsVisible();
    });

    const nonSolsticeCustomerNetworks = ['VKD', 'UM'];
    nonSolsticeCustomerNetworks.forEach(network => {
        test(`Non-solstice customers cannot access the Solstice activation flow (${network})`, async () => {
            await poManager.setMintClientMockCookieAsNotSolsticeCustomer();
            await poManager.setTheEapIpFakesMockCookie('10.0.0.1',network);
            await poManager.loginToMeinVodafoneWithUrl();
            await poManager.getV2ContractSelectionPage().errorMessageIsVisible();
        });
    });

    const contractSelectionExceptions = ['InvalidArgumentException', 'RestApiException'];
    contractSelectionExceptions.forEach(exception => {
        test(`Error when loading the contract selection page (${exception})`, async () => {
            await poManager.setMintClientMockCookieWithException(exception);
            await poManager.loginToMeinVodafoneWithUrl();
            await poManager.getMaintenancePage().verifyPageOpenedViaUrl();
        });
    });
});
