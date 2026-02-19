import { Page, Locator } from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';

export class FakesPage extends EapPage {
    readonly PAGE_NAME = 'EAP fakes';
    readonly path = '/api/fakes';
    readonly  EAP_FAKES_FIELD_IP_ADDRESS = 'ip_address';
    readonly submitButton: Locator;
    readonly ipAddressField: Locator;

    constructor(page: Page) {
        super(page, 'EAP DevTool Fakes');
        this.submitButton = page.locator('#eap-fakes-submit-btn');
        this.ipAddressField = page.locator(`[name="${this.EAP_FAKES_FIELD_IP_ADDRESS}"]`);
    }

    async submit() {
        await this.submitButton.click();
    }

    async fillFakeIpAddress(ipAddress: string): Promise<void> {
        await this.ipAddressField.fill(ipAddress);
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}