import {expect, Page} from '@playwright/test';
import { baseUrl } from "./config";


export async function verifyPageOpenedViaUrl(page: Page, path: string) {
    const expectedUrl = `${baseUrl}${path}`;
    await expect(page).toHaveURL(expectedUrl);
}

export async function open(page: Page, path: string): Promise<void> {
    await page.goto(path);
}

export async function waitForPath(page: Page, expectedPath: string): Promise<void> {
    await expect(page).toHaveURL(expectedPath);
}

/**
 * Waits for a new tab to open, switches to it, and verifies the URL contains the expected address.
 * @param page Playwright Page object
 * @param expectedAddress The expected path or URL fragment in the new tab
 */
export async function shouldBeOnInANewTab(page: Page, expectedAddress: string): Promise<void> {
    const [newPage] = await Promise.all([
        page.waitForEvent('popup', { timeout: 5000 }),
    ]);
    await expect(newPage).toHaveURL(`${baseUrl}${expectedAddress}`, { timeout: 5000 });
}


export async function openPageWithParameters(page: Page, path: string, parameters: Record<string, string | number | boolean>): Promise<void> {
    const query = new URLSearchParams(parameters as Record<string, string>).toString();
    const pathWithParameters = query ? `${path}?${query}` : path;
    await page.goto(pathWithParameters);
}