import { Page, Locator } from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';
import {clickText, fillTextField} from "../../../common/actionHelpers";

export class V1VKDLoginPage extends EapPage {
    readonly PAGE_NAME = 'EAP V1 login';
    readonly path = '/login?initial=v1';
    readonly pageIdentifyingString = 'Aktivierung Deines eigenen Kabelmodems';

    readonly  SOLSTICE_CUSTOMER_LOGIN_HINT =
        'Du hast eine 12-stellige Kundennummer (beginnend mit 10)? Dann kannst Du Dein Kabelmodem nur mit Benutzername und Passwort aktivieren.';
    readonly  HINT_LINK_ID = 'v2Login';
    readonly  LOGIN_BUTTON_ID = 'loginV1';
    readonly  CUSTOMER_ID_FIELD_ID = 'customerId';
    readonly  ACTIVATION_CODE_FIELD_1_ID = 'actCode1';
    readonly  ACTIVATION_CODE_FIELD_2_ID = 'actCode2';
    readonly  ACTIVATION_CODE_FIELD_3_ID = 'actCode3';
    readonly  REQUEST_ACTIVATION_CODE_TEXT = 'Dann fordere ihn jetzt an.';

    readonly loginButton: Locator;
    readonly customerIdField: Locator;
    readonly activationCodeField1: Locator;
    readonly activationCodeField2: Locator;
    readonly activationCodeField3: Locator;
    readonly hintLink: Locator;

    constructor(page: Page) {
        super(page, 'Aktivierung Deines eigenen Kabelmodems');
        this.loginButton = page.locator(`#${this.LOGIN_BUTTON_ID}`);
        this.customerIdField = page.locator(`#${this.CUSTOMER_ID_FIELD_ID}`);
        this.activationCodeField1 = page.locator(`#${this.ACTIVATION_CODE_FIELD_1_ID}`);
        this.activationCodeField2 = page.locator(`#${this.ACTIVATION_CODE_FIELD_2_ID}`);
        this.activationCodeField3 = page.locator(`#${this.ACTIVATION_CODE_FIELD_3_ID}`);
        this.hintLink = page.locator(`#${this.HINT_LINK_ID}`);
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async submit() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
        // Navigation to V1ActivationPage should be handled in your test logic
    }

    async fillCustomerId(customerId: string) {
        await fillTextField(this.page, 'customerId', customerId);
    }


    async fillActivationCodeWith(activationCode: string): Promise<void> {
        const activationCodePieces = activationCode.split('-');
        await this.activationCodeField1.waitFor({ state: 'visible' });
        await this.activationCodeField1.fill(activationCodePieces[0]);
        await this.activationCodeField2.waitFor({ state: 'visible' });
        await this.activationCodeField2.fill(activationCodePieces[1]);
        await this.activationCodeField3.waitFor({ state: 'visible' });
        await this.activationCodeField3.fill(activationCodePieces[2]);
    }

    async requestNewActivationCode(): Promise<void> {
        await clickText(this.page, this.REQUEST_ACTIVATION_CODE_TEXT)
    }

    async tryToProceedWithInvalidData(): Promise<void> {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
        // Remain on V1VKDLoginPage
    }

    async solsticeCustomerLoginHintIsVisible(): Promise<boolean> {
        return await this.page.locator(`text=${this.SOLSTICE_CUSTOMER_LOGIN_HINT}`).isVisible();
    }

    async clickLinkInHint(): Promise<void> {
        await this.hintLink.waitFor({ state: 'visible' });
        await this.hintLink.click();
        // Navigation to V2VKDLoginPage should be handled in your test logic
    }
}