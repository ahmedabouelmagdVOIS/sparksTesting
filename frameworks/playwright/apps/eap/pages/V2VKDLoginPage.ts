import { Page } from '@playwright/test';
import { V2LoginPage } from './V2LoginPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';

export class V2VKDLoginPage extends V2LoginPage {
    readonly PAGE_NAME = 'VKD V2 login';
    readonly pageIdentifyingString = 'Aktivierung Deines eigenen Kabelmodems';

    constructor(page: Page) {
        super(page, 'Aktivierung Deines eigenen Kabelmodems');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}