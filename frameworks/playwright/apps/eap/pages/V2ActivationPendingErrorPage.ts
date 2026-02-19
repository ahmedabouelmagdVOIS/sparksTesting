import { Page } from '@playwright/test';
import { EapPage } from './EapPage';
import { open, verifyPageOpenedViaUrl } from '../../../common/pageHelpers';

export class V2ActivationPendingErrorPage extends EapPage {
    readonly PAGE_NAME = 'EAP V2 Activation pending error';
    readonly pageIdentifyingString =
        'Leider kann dein Gerät momentan nicht aktiviert werden, da wir noch eine deiner Produktbuchungen verarbeiten müssen.';
    readonly path = '/v2/activation';

    constructor(page: Page) {
        super(page, 'Leider kann dein Gerät momentan nicht aktiviert werden, da wir noch eine deiner Produktbuchungen verarbeiten müssen.');
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }
}