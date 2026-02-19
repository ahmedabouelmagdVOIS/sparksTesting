import {expect, Page} from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';
import {waitForTextToBeVisible, scrollToView} from "../../../common/actionHelpers";

export class V2ActivationStatePage extends EapPage {
    readonly PAGE_NAME = 'EAP V2 activation state';
    readonly pageIdentifyingString = 'NOT APPLICABLE OVERWRITE VERIFYPAGE';
    readonly path = '/v2/activation-state';

    readonly activationSuccessMessage = 'Dein Endgerät wurde erfolgreich aktiviert.';
    readonly activationSuccessWithSipMessage = 'Bitte starte Dein Kabelmodem jetzt neu, um den Vorgang abzuschließen.';
    readonly activationPendingMessage = 'Dein Endgerät wird gerade aktiviert. Dieser Vorgang kann einige Minuten dauern.';
    readonly activationFailedMessage = 'Dein Endgerät konnte nicht aktiviert werden.';
    readonly sipCredentialsTextExcerpt = 'SIP-Proxy-Server';
    readonly savePasswordHintFirstPart = 'Bitte bewahr Dein Passwort an einem sicheren Ort auf';
    readonly savePasswordHintSecondPart = 'Wir empfehlen Dir dafür einen Passwort-Safe';
    readonly savePasswordHintWhole = 'Bitte bewahr Dein Passwort an einem sicheren Ort auf. Wir empfehlen Dir dafür einen Passwort-Safe.';
    readonly savePasswordHintNeighbourElement = 'Vodafone-Kundenservice:';


    constructor(page: Page) {
        super(page, 'NOT APPLICABLE OVERWRITE VERIFYPAGE');
    }

    async verifyPage(): Promise<void> {
        const messages = [
            this.activationSuccessMessage,
            this.activationSuccessWithSipMessage,
            this.activationPendingMessage,
            this.activationFailedMessage,
        ];
        let found = false;
        for (const msg of messages) {
            if (await this.page.locator(`text=${msg}`).isVisible()) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error(`Cannot find expected text "${this.pageIdentifyingString}" on the "${this.PAGE_NAME}" page`);
        }
    }

    async isActivationSuccess(): Promise<boolean> {
        return await this.page.locator(`text=${this.activationSuccessMessage}`).isVisible();
    }

    async isActivationSuccessWithSip(): Promise<boolean> {
        return await this.page.locator(`text=${this.activationSuccessWithSipMessage}`).isVisible();
    }

    async isActivationPending(): Promise<boolean> {
        return await this.page.locator(`text=${this.activationPendingMessage}`).isVisible();
    }

    async isActivationFailed(): Promise<boolean> {
        return await this.page.locator(`text=${this.activationFailedMessage}`).isVisible();
    }

    async areSipCredentialsVisible(): Promise<boolean> {
        return await this.page.locator(`text=${this.sipCredentialsTextExcerpt}`).isVisible();
    }

    getActivationFailedMessage(): string {
        return this.activationFailedMessage;
    }

    getActivationPendingMessage(): string {
        return this.activationPendingMessage;
    }

    getActivationSuccessMessage(): string {
        return this.activationSuccessMessage;
    }

    getActivationSuccessWithSipMessage(): string {
        return this.activationSuccessWithSipMessage;
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async openWithUserNotLoggedIn(): Promise<void> {
        await this.page.goto(this.path);
        // Navigation to V2VKDLoginPage should be handled in your test logic
    }

    async verifySIPCredentialsDisplay() {
        expect(await waitForTextToBeVisible(this.page, this.sipCredentialsTextExcerpt)).toBeTruthy();
    }

    async verifySIPCredentialsDisplayOrAbsence(showPasswordHint: boolean) {
        if (showPasswordHint){
            expect(await waitForTextToBeVisible(this.page, this.sipCredentialsTextExcerpt)).toBeTruthy();
        } else {
            expect(await waitForTextToBeVisible(this.page, this.sipCredentialsTextExcerpt)).toBeFalsy();
        }
    }

    async verifySavePasswordHintTextDisplayOrAbsence(showPasswordHint: boolean) {
        if (showPasswordHint) {
            await scrollToView(this.page, `text=${this.savePasswordHintNeighbourElement}`);
            expect(await waitForTextToBeVisible(this.page, this.savePasswordHintFirstPart)).toBeTruthy();
            expect(await waitForTextToBeVisible(this.page, this.savePasswordHintSecondPart)).toBeTruthy();
            expect(await waitForTextToBeVisible(this.page, this.savePasswordHintWhole)).toBeTruthy();
        } else {
            await scrollToView(this.page, `text=${this.savePasswordHintNeighbourElement}`);
            expect(await waitForTextToBeVisible(this.page, this.savePasswordHintFirstPart, 1000)).toBeFalsy();
            expect(await waitForTextToBeVisible(this.page, this.savePasswordHintSecondPart, 1000)).toBeFalsy();
            expect(await waitForTextToBeVisible(this.page, this.savePasswordHintWhole, 1000)).toBeFalsy();
        }
    }

    async verifyErrorTextToBe(error: string) {
        expect(await waitForTextToBeVisible(this.page, error)).toBeTruthy();
    }

}
