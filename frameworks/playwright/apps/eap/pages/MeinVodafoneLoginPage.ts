import { Page } from '@playwright/test';
import { MeinVodafonePage } from './MeinVodafonePage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';

export class MeinVodafoneLoginPage extends MeinVodafonePage {
    readonly PAGE_NAME = 'Mein Vodafone login page';
    readonly path = '/meinvodafone/account/login';
    readonly pageIdentifyingString = 'Dein persönliches Service-Portal';
    readonly pageName = 'Mein Vodafone login page';

    constructor(page: Page) {
        super(page, 'Dein persönliches Service-Portal');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}