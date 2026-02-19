import { Page, expect } from '@playwright/test';
import {fillTextFieldBySelector, waitForTextToBeVisible} from "../../../../common/actionHelpers";
import {open} from "../../../../common/pageHelpers";

export class QaToolsPage {
    readonly page: Page;
    readonly qaToolsPagePath = '/qa-tools';

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await open(this.page, this.qaToolsPagePath);
    }

    async getEarlyActivationButtonLocator() {
        return this.page.getByRole('button', {name: 'Sofort nutzen'});
    }

    async earlyActivate() {
        await (await this.getEarlyActivationButtonLocator()).click();
    }

    async fillCustomerNumber(number: string) {
        await fillTextFieldBySelector(this.page, 'input#number.form-control[name="number"][placeholder="012345678"]', number);
    }

}
