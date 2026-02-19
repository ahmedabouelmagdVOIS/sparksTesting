import { Page } from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl, waitForPath} from '../../../common/pageHelpers';
import {baseUrl} from "../../../common/config";

export class FakeMeinVodafoneLoginPage extends EapPage {
    readonly PAGE_NAME = 'FakeMeinVodafoneLogin'; // Use the actual title if available
    readonly path = '/api/fakemeinvodafonelogin';

    constructor(page: Page) {
        // If you have the actual page title, replace 'FakeMeinVodafoneLogin' below
        super(page, 'sadsada');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async iLoginAsASolsticeCustomer(expectedCode: string, expectedState: string) {
        await this.fillFakeMeinVodafonePageFields(expectedCode, expectedState);
        await this.clickSubmit();
    }

    async clickSubmit() {
        await this.page.locator('#redirectSubmit').click();
    }

    async fillFakeMeinVodafonePageFields(expectedCode: string, expectedState: string, redirectUrl: string = '/v2/account') {
        await this.fillInTheRedirectUrlField(redirectUrl);
        await this.page.locator('#authCode').fill(expectedCode);
        await this.page.locator('#state').fill(expectedState);
    }

    async fillInTheRedirectUrlField(path: string) {
        const fullRedirectUrl = `${baseUrl}${path}`;
        await this.page.locator('#redirectURL').fill(fullRedirectUrl);
    }
}
