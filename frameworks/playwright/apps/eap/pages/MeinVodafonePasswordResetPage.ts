import { Page } from '@playwright/test';
import { MeinVodafonePage } from './MeinVodafonePage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';

export class MeinVodafonePasswordResetPage extends MeinVodafonePage {
    readonly pageIdentifyingString = 'Zugangsdaten vergessen?';
    readonly path = '/meinvodafone/account/login/zugangsdaten_vergessen';
    readonly pageName = 'Mein Vodafone password reset page';

    constructor(page: Page) {
        super(page, 'Zugangsdaten vergessen?', 'Mein Vodafone password reset page');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}
