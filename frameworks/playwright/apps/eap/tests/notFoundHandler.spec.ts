import { test, expect, Page } from '@playwright/test';
import { POManager } from '../pages/POManager';

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
});

test.afterEach(async () => {
    await poManager.verifyScreenshot();
});

test.describe('MainPage - Not Found Handler', () => {
    test('Open not existing path', async ({ page }) => {
        await page.goto("/api/fakes/iDoNotExist");
        await expect(page.locator('text=Page not found')).toBeVisible();
    });
});
