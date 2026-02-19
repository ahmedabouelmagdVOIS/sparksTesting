import { Page, Locator } from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';

export class MaintenancePage extends EapPage {
    readonly PAGE_NAME = 'Maintenance';
    readonly path = '/maintenance';
    readonly pageIdentifyingString = 'Das Aktivierungsportal ist ausgefallen.';
    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page, 'Das Aktivierungsportal ist ausgefallen.');
        this.logoutButton = page.locator('#submit-logout-request');
    }

    /**
     * Clicks the logout button.
     * Navigation to V2VKDLoginPage should be handled in your test logic.
     */
    async logOut(): Promise<void> {
        await this.logoutButton.waitFor({ state: 'visible' });
        await this.logoutButton.click();
        // Navigation to V2VKDLoginPage should be handled in your test logic
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}