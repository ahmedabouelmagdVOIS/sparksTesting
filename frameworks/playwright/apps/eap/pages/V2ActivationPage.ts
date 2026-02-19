import {Page, Locator, expect} from '@playwright/test';
import { ActivationPage } from './ActivationPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';
import {clickById, isButtonDisabled, isButtonEnabled, waitForTextToBeVisible} from "../../../common/actionHelpers";

export class V2ActivationPage extends ActivationPage {
    readonly PAGE_NAME = 'EAP V2 activation';
    readonly pageIdentifyingString = 'MAC-Adresse Deines Kabelmodems';
    readonly path = '/v2/activation';
    readonly  BACK_BUTTON_ID = 'back-to-contract-selection';

    readonly backButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pageIdentifyingString = 'MAC-Adresse Deines Kabelmodems';
        this.backButton = page.locator(`#${this.BACK_BUTTON_ID}`);
    }

    /**
     * Opens the page without verification and navigates to V2VKDLoginPage.
     * Navigation to V2VKDLoginPage should be handled in your test logic.
     */
    async openWithUserNotLoggedIn(): Promise<void> {
        await this.page.goto(this.path);
        // Navigation to V2VKDLoginPage should be handled in your test logic
    }

    /**
     * Clicks the submit button and navigates to V2ActivationStatePage.
     * Navigation to V2ActivationStatePage should be handled in your test logic.
     */
    async submit() {
        const submitButton = this.page.locator('#submit-activation-request');
        await submitButton.waitFor({ state: 'visible' });
        await submitButton.click();
    }

    /**
     * Clicks the back button and navigates to V2ContractSelectionPage.
     * Navigation to V2ContractSelectionPage should be handled in your test logic.
     */
    async goBack(): Promise<void> {
        await this.backButton.click();
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
        const startX = labelBox.x;
        const clickX = startX + 1;
        const clickY = labelBox.y + labelBox.height / 2;
        await this.page.mouse.click(clickX, clickY);
    }

    async verifyDisplayOf(textContent: string) {
        expect(await waitForTextToBeVisible(this.page, textContent)).toBeTruthy();
    }

    async verifySubmitButtonIsDisabled() {
        await isButtonDisabled(this.submitButton);
    }
}