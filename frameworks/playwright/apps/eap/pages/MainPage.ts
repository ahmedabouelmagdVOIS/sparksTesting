import {Page, Locator} from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';


export class MainPage extends EapPage {
    readonly page: Page;
    readonly PAGE_NAME = 'EAP main';
    readonly path = '/';
    readonly VF_LINK_ID = 'VFLink';
    readonly O2_LINK_ID = 'O2Link';
    readonly vfLink: Locator;
    readonly o2Link: Locator;

    constructor(page: Page) {
        super(page, 'Willkommen bei der Aktivierung Deines Kabelmodems');
        this.page = page;
        this.vfLink = page.locator(`#${this.VF_LINK_ID}`);
        this.o2Link = page.locator(`#${this.O2_LINK_ID}`);
    }

    /**
     * Navigates to the login page for VKD or UM network.
     * @returns Promise<void>
     */
    async goToLogin(): Promise<void> {
        await this.vfLink.waitFor({ state: 'visible' });
        await this.vfLink.click();
        // Navigation to VKDLoginPage or UMLoginPage should be handled in your test logic
    }

    /**
     * Navigates to the O2 page.
     * @returns Promise<void>
     */
    async goToO2(): Promise<void> {
        await this.o2Link.waitFor({ state: 'visible' });
        await this.o2Link.click();
        // Navigation to O2Page should be handled in your test logic
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

}
