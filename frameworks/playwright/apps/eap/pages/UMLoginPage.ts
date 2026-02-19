import {Page} from '@playwright/test';
import { EapPage } from './EapPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';

export class UMLoginPage extends EapPage {
    readonly PAGE_NAME = 'UM login';
    readonly pageIdentifyingString = 'Dann meld Dich beim Kundenservice.';
    readonly path = '/login';

    constructor(page: Page) {
        super(page, 'Dann meld Dich beim Kundenservice.');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}