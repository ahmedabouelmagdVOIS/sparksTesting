import { Page, Locator } from '@playwright/test';
import { V2ContractSelectionPage } from './V2ContractSelectionPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';

export class UMContractSelectionPage extends V2ContractSelectionPage {
    readonly PAGE_NAME = 'UM contract selection';
    readonly pageIdentifyingString = 'Ist der gesuchte Vertrag nicht dabei? Dann meld Dich beim Kundenservice.';

    constructor(page: Page) {
        super(page, 'Ist der gesuchte Vertrag nicht dabei? Dann meld Dich beim Kundenservice.');
    }

    /**
     * Clicks the submit button and navigates to ActivationPage.
     * Navigation to ActivationPage should be handled in your test logic.
     */
    async submit() {
        const submitButton = this.page.locator('#submit-activation-request');
        await submitButton.waitFor({ state: 'visible' });
        await submitButton.click();
        // Navigation to ActivationPage should be handled in your test logic
    }

    /**
     * Clicks the logout button and navigates to V2UMLoginPage.
     * Navigation to V2UMLoginPage should be handled in your test logic.
     */
    async logOut(): Promise<void> {
        // Assuming findLogoutButtonAfterPageHasLoaded is implemented in the base class
        const logoutButton = await this.findLogoutButtonAfterPageHasLoaded();
        await logoutButton.click();
        // Navigation to V2UMLoginPage should be handled in your test logic
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}