import { Page, expect } from '@playwright/test';
const locators = require('../../../../../common/Locators/JMC/Locators.json');

export class GeneralJMC {
    readonly page: Page;
    readonly TIMEOUT_IN_SECONDS = 15;

    constructor(page: Page) {
        this.page = page;
    }

async JMCLogin(username: string , password: string): Promise<void> {
    await this.page.goto(`/jmc/login.jsp`);
    await this.page.fill(locators.loginPage.usernameField_ID, username);
    await this.page.fill(locators.loginPage.passwordField_ID, password);
    await this.page.click(locators.loginPage.loginButton_ID);
    await expect(this.page.locator(locators.GeneralJMC.LHSmenu_ID)).toBeVisible({ timeout: 15000 });
    
}
}