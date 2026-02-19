import { Page, expect } from '@playwright/test';
const locators = require('../../../../../common/Locators/JMC/Locators.json');


export class LogisticsPartnerSimulator {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async OpenLogisticsPartnerSimulator(): Promise<void> {
        await this.page.goto(`/jmc/logisticsPartnerSimulator.html`);
          }

    async SimulateLoxxessResponse(ZipFileName: string ): Promise<string> {
        await this.page.fill(locators.LogisticsPartnerSimulator.BundleFileName_ID, ZipFileName);               
        await this.page.locator(locators.LogisticsPartnerSimulator.ConfirmButton_XPATH).click();
        const responseDescription = (await this.page.locator('text=/\\b[\\w-]+\\.zip\\b/').first().textContent()) ?? '';
        return responseDescription;
      
       
    }

}
