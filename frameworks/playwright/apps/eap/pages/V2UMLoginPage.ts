import { Page } from '@playwright/test';
import { V2LoginPage } from './V2LoginPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';

export class V2UMLoginPage extends V2LoginPage {
    readonly PAGE_NAME = 'UM V2 login';
    readonly pageIdentifyingString = 'Hast Du eine Kundennummer mit 9 oder 10 Stellen? Dann meld Dich beim Kundenservice.';

    constructor(page: Page) {
        super(page, 'Hast Du eine Kundennummer mit 9 oder 10 Stellen? Dann meld Dich beim Kundenservice.');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}