import { Page, Locator, expect } from '@playwright/test';

export class ActivationPage {
    readonly page: Page;

    // Locators
    readonly submitButton: Locator;
    readonly termsAndConditionsLink: Locator;
    readonly securityHintYesButton: Locator;
    readonly securityHintNoButton: Locator;
    readonly acceptSecurityHintsLabel: Locator;
    readonly acceptTermsAndConditionsLabel: Locator;
    readonly securityHintsLink: Locator;

    // Constants
    readonly TERMS_AND_CONDITIONS_TEXT = 'Bedingungen';
    readonly TERMS_AND_CONDITIONS_DESTINATION = '/downloads/Nutzungsbedingungen.pdf';
    readonly SECURITY_HINTS_TEXT = 'Sicherheitshinweise';

    constructor(page: Page) {
        this.page = page;
        this.submitButton = page.locator('#submit-activation-request');
        this.termsAndConditionsLink = page.getByRole('link', { name: this.TERMS_AND_CONDITIONS_TEXT });
        this.securityHintYesButton = page.locator('#securityHintYes');
        this.securityHintNoButton = page.locator('#securityHintNo');
        this.acceptSecurityHintsLabel = page.locator('#acceptSecurityHintsLabel');
        this.acceptTermsAndConditionsLabel = page.locator('#acceptUserLicenseLabel');
        this.securityHintsLink = page.getByRole('link', { name: this.SECURITY_HINTS_TEXT });
    }

    async answerAllSecurityQuestionsWithYes() {
        for (let i = 0; i < 9; i++) {
            await this.securityHintYesButton.waitFor({ state: 'visible' });
            await this.securityHintYesButton.click();
        }
    }

    async answerAllSecurityQuestionsWithNo() {
        for (let i = 0; i < 9; i++) {
            await this.securityHintNoButton.waitFor({ state: 'visible' });
            await this.securityHintNoButton.click();
        }
    }

    async acceptSecurityHints() {
        await this.acceptSecurityHintsLabel.waitFor({ state: 'visible' });
        await this.page.evaluate(() => {
            document.getElementById('acceptSecurityHintsLabel')?.click();
        });
    }

    async acceptTermsAndConditions() {
        await this.acceptTermsAndConditionsLabel.waitFor({ state: 'visible' });
        await this.acceptTermsAndConditionsLabel.click();
    }

    async isSubmitButtonEnabled(): Promise<boolean> {
        await this.submitButton.waitFor({ state: 'visible' });
        return !(await this.submitButton.getAttribute('disabled'));
    }

    async openTermsAndConditions() {
        await this.termsAndConditionsLink.waitFor({ state: 'visible' });
        await this.termsAndConditionsLink.click();
    }

    async openSecurityHints() {
        await this.securityHintsLink.waitFor({ state: 'visible' });
        await this.securityHintsLink.click();
    }

    async tryToProceedWithInvalidData(): Promise<ActivationPage> {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
        return this;
    }

    async isSecurityQuestionVisible(questionNumber: string): Promise<boolean> {
        const questionString = `Frage ${questionNumber}/9`;
        return await this.page.locator(`text=${questionString}`).isVisible();
    }

    async isSuccessfullSecurityQuestionConfirmationVisible(): Promise<boolean> {
        return await this.page.locator('text=Du hast alle Fragen mit JA beantwortet.').isVisible();
    }

    async isUnsuccessfullSecurityQuestionConfirmationVisible(): Promise<boolean> {
        return await this.page.locator('text=Du hast nicht alle Fragen mit JA beantwortet.').isVisible();
    }

    async getTermsAndConditionsLinkDestination(): Promise<string | null> {
        await this.termsAndConditionsLink.waitFor({ state: 'visible' });
        return await this.termsAndConditionsLink.getAttribute('href');
    }

    async theTermsAndConditionsLinkPointsToTheExpectedPdf() {
        const destination = await this.getTermsAndConditionsLinkDestination();
        expect(destination).toBe(this.TERMS_AND_CONDITIONS_DESTINATION);
    }
}
