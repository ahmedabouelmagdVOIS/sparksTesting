import {Page} from '@playwright/test';
import { EapPage } from './EapPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';

export class O2Page extends EapPage {
    readonly PAGE_NAME = 'O2 info';
    readonly path = '/O2info';
    readonly pageIdentifyingString = '089 78 79 79 40 0'; // O2 hotline

    constructor(page: Page) {
        super(page, '089 78 79 79 40 0');
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }
}
