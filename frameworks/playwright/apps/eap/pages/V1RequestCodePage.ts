import {Page, Locator, expect} from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';
import {fillTextField, waitForTextToBeVisible} from "../../../common/actionHelpers";

export class V1RequestCodePage extends EapPage {
    readonly PAGE_NAME = 'EAP V1 request activation code';
    readonly pageIdentifyingString = 'Du willst Deinen Aktivierungscode anfordern? Gib dafür bitte Deine Kundennummer ein.';
    readonly path = '/v1/request-code';

    readonly  SOLSTICE_CUSTOMER_LOGIN_HINT =
        'Du hast eine 12-stellige Kundennummer (beginnend mit 10)? Dann kannst Du Dein Kabelmodem nur mit Benutzername und Passwort aktivieren.';
    readonly  HINT_LINK_ID = 'v2Login';
    readonly  CUSTOMER_ID_FIELD = 'customerId';
    readonly  SUBMIT_BUTTON_TEXT = 'Anfordern';

    readonly customerIdField: Locator;
    readonly submitButton: Locator;
    readonly hintLink: Locator;

    constructor(page: Page) {
        super(page, 'Du willst Deinen Aktivierungscode anfordern? Gib dafür bitte Deine Kundennummer ein.');
        this.customerIdField = page.locator(`[name="${this.CUSTOMER_ID_FIELD}"]`);
        this.submitButton = page.getByRole('button', { name: this.SUBMIT_BUTTON_TEXT });
        this.hintLink = page.locator(`#${this.HINT_LINK_ID}`);
    }

    async submit() {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        // Navigation to V1RequestCodeStatePage should be handled in your test logic
    }

    async tryToProceedWithInvalidData() {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        // Navigation to V1RequestCodeStatePage should be handled in your test logic
    }

    async solsticeCustomerLoginHintIsVisible(): Promise<boolean> {
        return await this.page.locator(`text=${this.SOLSTICE_CUSTOMER_LOGIN_HINT}`).isVisible();
    }

    async clickLinkInHint(): Promise<void> {
        await this.hintLink.waitFor({ state: 'visible' });
        await this.hintLink.click();
        // Navigation to V2VKDLoginPage should be handled in your test logic
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async fillCustomerId(customerId: string) {
        await fillTextField(this.page, 'customerId', customerId);
    }

    async verifyPageOpenedViaText() {
        expect(await waitForTextToBeVisible(this.page, this.pageIdentifyingString)).toBeTruthy();
    }
}