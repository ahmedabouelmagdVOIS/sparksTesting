import { Page } from '@playwright/test';

export class EapPage {
    readonly page: Page;
    readonly pageIdentifyingString: string;
    readonly PAGE_NAME: string = 'Eap Page Base class, this should never be called';
    readonly TIMEOUT_IN_SECONDS = 15;

    constructor(page: Page, pageIdentifyingString: string = '') {
        this.page = page;
        this.pageIdentifyingString = pageIdentifyingString;
    }

    // Throws error if submit is called on base page
    async submit() {
        throw new Error(`No submit possible on page ${this.PAGE_NAME}`);
    }

    // Verifies the page by checking for identifying text
    async verifyPage(): Promise<void> {
        const isVisible = await this.page.locator(`text=${this.pageIdentifyingString}`).isVisible({ timeout: this.TIMEOUT_IN_SECONDS * 1000 });
        if (!isVisible) {
            throw new Error(`Cannot find expected text "${this.pageIdentifyingString}" on the "${this.PAGE_NAME}" page.`);
        }
    }

    // Throws error if not implemented in derived class
    async tryToProceedWithInvalidData() {
        throw new Error(`Method tryToProceedWithInvalidData not implemented for ${this.PAGE_NAME}`);
    }

    async open(): Promise<void> {
        throw new Error(`Method open not implemented for ${this.PAGE_NAME}`);
    }

    async verifyPageOpenedViaUrl() {
        throw new Error(`Method verifyPageOpenedViaUrl not implemented for ${this.PAGE_NAME}`);
    }

    getPageName(): string {
        return this.PAGE_NAME;
    }

    getPageIdentifyingString(): string {
        return this.pageIdentifyingString;
    }

    getFullPageURL(): string {
        return this.page.url();
    }

    async openWithoutVerification() {
        await this.page.goto(this.getFullPageURL());
    }
}
