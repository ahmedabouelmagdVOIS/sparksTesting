import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class SuccessfulActivationPage {
  readonly page: Page;
  readonly successfulActivationPageLocator = 'Danke!';
  readonly earlyActivationMessageIdOnly: string = 'In ein paar Minuten schalten wir Deinen Anschluss frei. Du kannst ihn dann mit Deinem neuen Tarif direkt nutzen.';
  readonly earlyActivationMessage: string = 'In ein paar Minuten schalten wir Deinen Red Internet 50 Cable Anschluss frei. Du kannst ihn dann mit Deinem neuen Tarif direkt nutzen.';
  readonly earlyActivationButtonLocator = 'Sofort nutzen';

  constructor(page: Page) {
    this.page = page;
  }

  async successfulActivationPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.successfulActivationPageLocator)).toBeTruthy();
  }

  async validateClosingGreeting() {
    const closing = this.page.getByText(/^Freundliche Grüße/);
    await expect(closing).toBeVisible();
    const html = await closing.innerHTML();
    expect(html).toContain('Freundliche Grüße<br>Dein Vodafone-Team');
  }

  async validateEarlyActivationButtonDisappearance() {
    await expect(this.page.getByText(this.earlyActivationButtonLocator)).not.toBeVisible();
  }

  async validatePageMessageIdOnly() {
    await expect(this.page.getByText(this.earlyActivationMessageIdOnly)).toBeVisible();
  }

  async validatePageMessage() {
    await expect(this.page.getByText(this.earlyActivationMessage)).toBeVisible();
  }

  async theApiHeaderHasTheCorrectUuidRegex(apiPath: string, regex: RegExp, timeout: number = 5000) {
    const response = await this.page.waitForResponse(
        resp => resp.url().includes(apiPath),
        { timeout }
    );
    const headers = response.request().headers();
    expect(headers).toHaveProperty('x-log-ref');
    expect(headers['x-log-ref']).toMatch(regex);
  }

}
