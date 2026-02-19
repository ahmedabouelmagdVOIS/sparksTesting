import {Page, Locator, expect} from '@playwright/test';
import { ActivationPage } from './ActivationPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';
import {
    clickById,
    isButtonDisabled,
    isButtonEnabled,
    verifyTextCount, waitForElement,
    waitForTextToBeVisible,
    scrollToView
} from "../../../common/actionHelpers";

export class V1ActivationPage extends ActivationPage {
    readonly PAGE_NAME = 'EAP V1 activation';
    readonly pageIdentifyingString = 'Aktivierung Deines';
    readonly activationSuccessMessage = 'Dein Endgerät wurde erfolgreich aktiviert.';
    readonly path = '/v1/activation';
    readonly savePasswordHintFirstPart = 'Bitte bewahr Dein Passwort an einem sicheren Ort auf';
    readonly savePasswordHintSecondPart = 'Wir empfehlen Dir dafür einen Passwort-Safe';
    readonly savePasswordHintWhole = 'Bitte bewahr Dein Passwort an einem sicheren Ort auf. Wir empfehlen Dir dafür einen Passwort-Safe.';
    readonly savePasswordHintNeighbourElement = 'Zugangsdaten als PDF speichern';


    constructor(page: Page) {
        super(page);
        this.pageIdentifyingString = 'Aktivierung Deines';
    }

    /**
     * Clicks the submit button and stays on V1ActivationPage.
     */
    async submit() {
        const submitButton = this.page.locator('#submit-activation-request');
        await submitButton.waitFor({ state: 'visible' });
        await submitButton.click();
        return this;
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async verifyConfirmationButtonIsDisabled() {
        await isButtonDisabled(this.submitButton);
    }

    async verifyConfirmationButtonIsEnabled() {
        await isButtonEnabled(this.submitButton);
    }

    async acceptTermsAndSecurityHints() {
        await clickById(this.page, 'acceptUserLicenseLabel');
        const label = this.page.locator('#acceptSecurityHintsLabel');
        const labelBox = await label.boundingBox();
        if (!labelBox) {
            console.error('Label bounding box is null. Cannot perform click action.');
            return;
        }
        const startX = labelBox.x;
        const clickX = startX + 1;
        const clickY = labelBox.y + labelBox.height / 2;
        await this.page.mouse.click(clickX, clickY);
    }

    async verifySuccessfulActivation() {
        expect(await waitForTextToBeVisible(this.page, this.activationSuccessMessage)).toBeTruthy();
    }

    async verifyPageContent() {
        expect(await waitForTextToBeVisible(this.page, 'Bitte beachte die Bedingungen und Sicherheitshinweise zu Anschluss und Nutzung eines Kabelmodems Deiner Wahl.')).toBeTruthy();
    }

    async verifySIPCredentialsInstructionDisplay() {
        expect(await waitForTextToBeVisible(this.page, 'Bitte trag die untenstehenden SIP-Zugangsdaten in Dein Kabelmodem ein. Sonst kannst Du den Telefondienst inklusive Notruf-Funktion nicht aktivieren.')).toBeTruthy();
    }

    async verifyRestartModemInstructionDisplay() {
        expect(await waitForTextToBeVisible(this.page, 'Bitte starte Dein Kabelmodem jetzt neu')).toBeTruthy();
    }

    async verifySIPProxyServerDisplayCount(expectedCount: number) {
        await verifyTextCount(this.page, 'SIP-Proxy-Server:', expectedCount);
    }

    async verifySIPRegistrarDisplayCount(expectedCount: number) {
        await verifyTextCount(this.page, 'SIP-Registrar:', expectedCount);
    }

    async verifySTUNServerDisplayCount(expectedCount: number) {
        await verifyTextCount(this.page, 'STUN-Server:', expectedCount);
    }

    async verifySTUNPortDisplayCount(expectedCount: number) {
        await verifyTextCount(this.page, 'STUN-Port:', expectedCount);
    }

    async verifyPhoneNumberDisplayCount(expectedCount: string) {
        await verifyTextCount(this.page, 'Telefonnummer:', Number(expectedCount));
    }

    async verifySIPUsernameDisplayCount(expectedCount: string) {
        await verifyTextCount(this.page, 'SIP-Benutzername:', Number(expectedCount));
    }

    async verifySIPPasswordDisplayCount(expectedCount: string) {
        await verifyTextCount(this.page, 'SIP-Passwort:', Number(expectedCount));
    }

    async verifyPasswordHasAlreadyBeenGivenTextDisplay() {
        expect(await waitForTextToBeVisible(this.page, 'Du hast schon ein SIP-Passwort für jede Telefonnummer bekommen.')).toBeTruthy();
    }

    async verifyPasswordHasAlreadyBeenGivenTextAbsence() {
        expect(await waitForTextToBeVisible(this.page, 'Du hast schon ein SIP-Passwort für jede Telefonnummer bekommen.', 500)).toBeFalsy();
    }

    async verifyCustomerOwnModemActivationTextDisplay() {
        expect(await waitForTextToBeVisible(this.page, 'Aktivierung Deines eigenen Kabelmodems')).toBeTruthy();
    }

    async verifyCompanyModemActivationTextDisplay() {
        expect(await waitForTextToBeVisible(this.page, 'Aktivierung Deines Kabelmodems')).toBeTruthy();
    }

    async iWaitForErrorBox() {
        await waitForElement(this.page.locator('div.alertBox'));
    }

    async verifyErrorTextToBe(error: string) {
        expect(await waitForTextToBeVisible(this.page, error)).toBeTruthy();
    }

    async verifyPageOpenedViaText() {
        expect(await waitForTextToBeVisible(this.page, this.pageIdentifyingString)).toBeTruthy();
    }

    async verifySavePasswordHintTextDisplay() {
        await scrollToView(this.page, `text=${this.savePasswordHintNeighbourElement}`);
        expect(await waitForTextToBeVisible(this.page, this.savePasswordHintFirstPart)).toBeTruthy();
        expect(await waitForTextToBeVisible(this.page, this.savePasswordHintSecondPart)).toBeTruthy();
        expect(await waitForTextToBeVisible(this.page, this.savePasswordHintWhole)).toBeTruthy();
    }

    async verifySavePasswordHintTextAbsence() {
        await scrollToView(this.page, `text=${this.savePasswordHintNeighbourElement}`);
        expect(await waitForTextToBeVisible(this.page, this.savePasswordHintFirstPart, 1000)).toBeFalsy();
        expect(await waitForTextToBeVisible(this.page, this.savePasswordHintSecondPart, 1000)).toBeFalsy();
        expect(await waitForTextToBeVisible(this.page, this.savePasswordHintWhole, 1000)).toBeFalsy();
    }

}