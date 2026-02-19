import {expect, test} from '@playwright/test';
import { POManager } from '../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('Start page', () => {
    test('Successfully open main page', async () => {
        await poManager.getMainPage().open();
        await poManager.getMainPage().verifyPageOpenedViaUrl();
    });

    test(`Navigate to login page for network VKD`, async ({ page }) => {
        await poManager.getMainPage().open();
        await poManager.setTheEapIpFakesMockCookie('10.0.0.1','VKD');
        await poManager.getMainPage().open();
        await poManager.verifyScreenshot();
        await poManager.getMainPage().goToLogin();
        await poManager.getVKDLoginPage().verifyPageOpenedViaUrl();
    });

    test(`Navigate to login page for network UM`, async () => {
        await poManager.getMainPage().open();
        await poManager.setTheEapIpFakesMockCookie('10.0.0.1','UM');
        await poManager.getMainPage().open();
        await poManager.getMainPage().goToLogin();
        await poManager.getUMLoginPage().verifyPageOpenedViaUrl();
    });

    test('Navigate to O2 page', async () => {
        await poManager.getMainPage().open();
        await poManager.getMainPage().goToO2();
        await poManager.getO2Page().verifyPageOpenedViaUrl();
    });
});
