import {expect, Page} from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';
import {
    clickText,
    fillTextField,
    waitForElement,
    waitForTextToBeVisible
} from '../../../common/actionHelpers';

export class VKDLoginPage extends EapPage {
    readonly PAGE_NAME = 'VKD login';
    readonly pageIdentifyingString = 'Du willst Dein Kabelmodem aktivieren? Dafür brauchst Du Deine Kundennummer und Deinen persönlichen Aktivierungscode';
    readonly path = '/login';

    constructor(page: Page) {
        super(page, 'Du willst Dein Kabelmodem aktivieren? Dafür brauchst Du Deine Kundennummer und Deinen persönlichen Aktivierungscode');
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async fillCustomerId(customerId: string) {
        await fillTextField(this.page, 'customerId', customerId);
    }

    async fillActivationCode(code: string) {
        const activationCodeParts = code.split("-");
        await fillTextField(this.page, 'actCode1', activationCodeParts[0]);
        await fillTextField(this.page, 'actCode2', activationCodeParts[1]);
        await fillTextField(this.page, 'actCode3', activationCodeParts[2]);
    }

    async weiter() {
        await clickText(this.page, 'Weiter');
    }

    async isPleaseCheckAgainBoxVisible(): Promise<boolean> {
        return await this.page.locator('text=Du hast leider die falschen Daten eingegeben. Bitte überprüf alles noch einmal.').isVisible();
    }

    async iWaitForErrorBox() {
        await waitForElement(this.page.locator('div.alertBox'));
    }

    async isWrongDataBoxVisible(): Promise<boolean> {
        return await this.page.locator('text=Deine Eingabe enthält Fehler.').isVisible();
    }

    async unfoldLogInWithUserNameAndPassword() {
        await clickText(this.page, 'Aktivierung mit Benutzername und Passwort');
    }

    async clickOnLogInWithUserNameAndPasswordButton() {
        await clickText(this.page, 'Zur Anmeldung mit Benutzername und Passwort');
    }
}