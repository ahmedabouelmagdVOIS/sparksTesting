import { Page } from '@playwright/test';
import { EapPage } from './EapPage';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';

export class V1RequestCodeStatePage extends EapPage {
    readonly PAGE_NAME = 'EAP V1 request activation code state';
    readonly pageIdentifyingString = 'Aktivierungscode anfordern';
    readonly path = '/v1/request-code-state';

    constructor(page: Page) {
        super(page, 'Aktivierungscode anfordern');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    async isCustomerCannotUseServiceCurrentlyVisible(): Promise<boolean> {
        return await this.page.locator('text=Diesen Service kannst Du im Moment leider nicht nutzen.').isVisible();
    }

    async isActivationCodeRequestedConfirmationVisible(): Promise<boolean> {
        // Checks for any of the confirmation texts being visible
        const textOptions = [
            'Aktivierungscode angefordert.',
            'Aktivierungscode wurde bereits angefordert.',
            'Aktivierungscode wurde bereits zugestellt.'
        ];
        for (const text of textOptions) {
            if (await this.page.locator(`text=${text}`).isVisible()) {
                return true;
            }
        }
        return false;
    }
}