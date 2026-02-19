import {Page, Locator, expect} from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';
import {clickText, waitForElement, waitForTextToBeVisible} from "../../../common/actionHelpers";

export class V2ContractSelectionPage extends EapPage {
    readonly PAGE_NAME: string = 'EAP V2 contract selection';
    readonly pageIdentifyingString: string;
    readonly path = '/v2/contract-selection';
    readonly SUBMIT_BUTTON_ID = 'submit-contract-selection';
    readonly  ERROR_MESSAGE_NO_CONTRACT = 'Es konnte kein Internetvertrag gefunden werden.';

    readonly submitButton: Locator;

    constructor(page: Page, pageIdentifyingString: string = 'Bitte wähle den Vertrag aus, für den das Gerät aktiviert werden soll:') {
        super(page, pageIdentifyingString);
        this.submitButton = page.locator(`#${this.SUBMIT_BUTTON_ID}`);
    }

    async logOut(): Promise<void> {
        const logoutButton = this.page.locator('#submit-logout-request');
        await logoutButton.waitFor({ state: 'visible' });
        await logoutButton.click();
    }

    async selectContract(contractId: string): Promise<void> {
        const locator = this.page.getByText(contractId, {exact: true});
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async openWithUserNotLoggedIn(): Promise<void> {
        await this.page.goto(this.path);
        // Navigation to V2VKDLoginPage should be handled in your test logic
    }

    async submit(){
        await clickText(this.page, 'Vertrag auswählen');
    }

    async errorMessageIsVisible(): Promise<boolean> {
        return await this.page.locator(`text=${this.ERROR_MESSAGE_NO_CONTRACT}`).isVisible();
    }

    async verifyNoContractsErrorMessageDisplay(): Promise<void> {
        expect(await waitForTextToBeVisible(this.page, this.ERROR_MESSAGE_NO_CONTRACT)).toBeTruthy();
    }

    getPossibleErrorMessage(): string {
        return this.ERROR_MESSAGE_NO_CONTRACT;
    }

    async clickV1LoginHint(): Promise<void> {
        await clickText(this.page, 'Dann meld Dich damit an.');
    }

    async verifySuggestionToUseTheActivationCode(): Promise<boolean> {
        return await this.page.locator('text=Hast Du eine 9-stellige Kundennummer und einen Aktivierungscode?').isVisible();
    }

    /**
     * Finds the logout button after the page has loaded, if the loading image is not visible.
     * Returns the Locator for the logout button, or null if the loading image is visible.
     */
    protected async findLogoutButtonAfterPageHasLoaded(): Promise<Locator | null> {
        const loadingImage = this.page.locator('#loadingImage');
        const isVisible = await loadingImage.isVisible();
        if (!isVisible) {
            return this.page.locator('#submit-logout-request');
        }
        return null;
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

    async verifyDisplayOfContract(contractId: string) {
        const locator = this.page.getByText(contractId, { exact: true });
        await expect(locator).toBeVisible();
    }

}