import {expect, Locator, Page} from '@playwright/test';


export async function clickText(page: Page, text: string) {
    const locator = page.locator(`text=${text}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
}

export async function fillTextField(page: Page, fieldId: string, value: string) {
    const locator = page.locator(`#${fieldId}`);
    await locator.waitFor({ state: 'attached' });
    await locator.waitFor({ state: 'visible' });
    // Wait for the field to be enabled
    for (let i = 0; i < 50; i++) { // up to 2 seconds
        if (await locator.isEnabled()) break;
        await new Promise(res => setTimeout(res, 100));
    }
    await locator.fill(value);
}

export async function fillTextFieldBySelector(page: Page, fieldSelector: string, value: string) {
    const locator = page.locator(fieldSelector);
    await locator.fill(value);
}

export async function isButtonEnabled(button: Locator) {
    await button.waitFor({ state: 'visible' });
    expect(await button.isDisabled()).toBeFalsy();
}

export async function isButtonDisabled(button: Locator) {
    await button.waitFor({ state: 'visible' });
    expect(await button.isDisabled()).toBeTruthy();
}


export async function clickById(page: Page, elementId: string): Promise<void> {
    const element = page.locator(`#${elementId}`);
    await element.click();
}

export async function waitForTextToBeVisible(page: Page, text: string, timeout: number = 5000): Promise<boolean> {
    return await page.locator(`text=${text}`).waitFor({ state: 'visible', timeout }).then(() => true, () => false);
}

export async function verifyTextCount(page: Page, text: string, expectedCount: number) {
    const elements = await page.locator(`text=${text}`).all();
    expect(elements.length === expectedCount).toBeTruthy();
}

export async function waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
}

export async function scrollToView(page: Page, selectorOrLocator: string | Locator): Promise<void> {
    const locator = typeof selectorOrLocator === 'string' ? page.locator(selectorOrLocator) : selectorOrLocator;
    await locator.scrollIntoViewIfNeeded();
}
