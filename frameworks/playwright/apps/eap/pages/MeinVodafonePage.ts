import { Page } from '@playwright/test';
import {open, verifyPageOpenedViaUrl} from '../../../common/pageHelpers';

export class MeinVodafonePage {
    readonly page: Page;
    readonly pageName: string;
    readonly pageIdentifyingString: string;
    readonly TIMEOUT_IN_SECONDS = 10;
    readonly baseUrl: string;
    readonly path: string;

    constructor(page: Page, pageIdentifyingString: string = '', pageName?: string) {
        this.page = page;
        this.pageIdentifyingString = pageIdentifyingString;
        this.pageName = pageName ?? '';
        // Default baseUrl from PHP logic
        this.baseUrl = 'https://opweb5.vfd2-testnet.de';
        // If path is set by child, it will be used as is
        this.path = this.path ?? '';
    }

    getUrl(urlParameters: Record<string, string> = {}): string {
        return this.path;
    }

    async verifyPage(): Promise<void> {
        const isVisible = await this.page.locator(`text=${this.pageIdentifyingString}`).isVisible({ timeout: this.TIMEOUT_IN_SECONDS * 1000 });
        if (!isVisible) {
            throw new Error(`Cannot find expected text "${this.pageIdentifyingString}" on the "${this.getPageName()}" page`);
        }
    }

    async open(): Promise<void> {
        await open(this.page, this.path);
    }

    async verifyPageOpenedViaUrl() {
        await verifyPageOpenedViaUrl(this.page, this.path);
    }

    getPageName(): string {
        return this.pageName;
    }
}