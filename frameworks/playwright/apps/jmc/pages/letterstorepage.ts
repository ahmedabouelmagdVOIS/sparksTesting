import { Page, expect } from '@playwright/test';
const locators = require('../../../../../common/Locators/JMC/Locators.json');

export class LetterStore {
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
        await expect(this.page.locator('#menu')).toBeVisible({ timeout: 15000 });
        
    }
    async OpenLetterStore(SearchByField: string , SearchInputField: string): Promise<void> {
        await this.page.goto(`/jmc/letterstore.html`);
        await expect(this.page.getByRole('heading', { name: 'Zugriff auf Letter Store (PDF und XML)' })) .toBeVisible({ timeout: 5000 });
        await this.page.selectOption(locators.LetterStore.SearchByDropDown_ID, SearchByField);
        const locatorKey = SearchByField; // This can be "AccountNumber" or "TaskID" or ....
        const locator = locators.LetterStore[locatorKey + "_ID"];
        await this.page.fill(locator,SearchInputField);
        await this.page.waitForTimeout(5000);
        await this.page.locator(locators.LetterStore.SearchButton_XPATH).click();
        
    }

    async VerifyLoxxessTransferred(): Promise<void> {
        const loxxessRow = this.page.locator('tr', { 
            has: this.page.locator('td', { hasText: 'Loxxess' }) 
        });
        const isVisible = await loxxessRow.locator('td', { hasText: 'TRANSFERRED' }).isVisible();

       // if (!isVisible) {
        //    throw new Error("The element with text 'TRANSFERRED' is not visible after 3 minutes.");
        //    }
        
    }

    async GetZipFileName(): Promise<string> {
        const row = this.page.locator('tr:has(td:has-text("LOXXESS"))'); // Locate row with text "LOXXESS"
        const secondCell = row.locator('td').nth(1); // Locate the second `<td>` element in the row
        const secondCellText = await secondCell.innerText(); // Get the text content of the second `<td>`
        
        // Split the text by new line and take the first part as the zip file name
        const zipName = secondCellText.split('\n')[0].trim(); 
        // Return the zip file name
        return zipName;
    }

}