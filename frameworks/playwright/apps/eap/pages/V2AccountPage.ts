import { Page } from '@playwright/test';
import { EapPage } from './EapPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';

export class V2AccountPage extends EapPage {
    readonly PAGE_NAME = 'EAP V2 Account Page';
    readonly pageIdentifyingString = 'None, page will only redirect';
    readonly path = '/v2/account';

    constructor(page: Page) {
        super(page, 'None, page will only redirect');
    }

    /**
     * Opens the page with URL parameters and navigates to the appropriate contract selection page.
     * @param parameters Object containing URL parameters
     * @param network 'UM' or other
     */
    async openPageWithUrlParameters(parameters: Record<string, string>, network: string): Promise<void> {
        const queryString = new URLSearchParams(parameters).toString();
        const fullUrl = `${this.path}?${queryString}`;
        await this.page.goto(fullUrl);
        // Navigation to UMContractSelectionPage or V2ContractSelectionPage should be handled in your test logic
    }

    /**
     * Opens the page with wrong URL parameters and navigates to MaintenancePage.
     */
    async openPageWithWrongUrlParameters(): Promise<void> {
        const wrongParams = { code: 'wrongCode', state: 'wrongState' };
        const queryString = new URLSearchParams(wrongParams).toString();
        const fullUrl = `${this.path}?${queryString}`;
        await this.page.goto(fullUrl);
        // Navigation to MaintenancePage should be handled in your test logic
    }

    /**
     * Opens the page without verification and navigates to MaintenancePage.
     */
    async openWithoutVerification() {
        await this.page.goto(this.path);
        // Navigation to MaintenancePage should be handled in your test logic
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}