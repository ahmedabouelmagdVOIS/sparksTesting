import {Page, Locator, expect} from '@playwright/test';
import { EapPage } from './EapPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';
import {clickText, waitForTextToBeVisible} from "../../../common/actionHelpers";

export class V2LoginPage extends EapPage {
    readonly path = '/login?initial=v2';
    readonly  SSO_LOGIN_BUTTON_TEXT = 'Zur Anmeldung mit Benutzername und Passwort';

    readonly ssoLoginButton: Locator;

    constructor(page: Page, pageIdentifyingString: string = '') {
        super(page, pageIdentifyingString);
        this.ssoLoginButton = page.getByText(this.SSO_LOGIN_BUTTON_TEXT);
    }

    async pressTheSSOLoginButton(): Promise<void> {
        await clickText(this.page, this.SSO_LOGIN_BUTTON_TEXT)
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async verifyDisplayOf(textContent: string) {
        expect(await waitForTextToBeVisible(this.page, textContent)).toBeTruthy();
    }
}