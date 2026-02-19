import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class PostponeEarlyActivationPage {
  readonly page: Page;
  readonly postponeEarlyActivationPageLocator = 'Du willst Deinen Anschluss später nutzen.';
  readonly postponeEarlyActivationMessage: string = 'Übrigens: Du kannst es Dir jederzeit anders überlegen und Deinen Anschluss doch schon früher nutzen. Verbinde dazu einfach wieder Dein Gerät mit Deinem Kabel-Router, starte Deinen Internet-Browser, öffne eine beliebige Webseite und folg den Anweisungen.';
  readonly postponeEarlyActivationButtonLocator = 'Später nutzen';

  constructor(page: Page) {
    this.page = page;
  }

  async postponeEarlyActivationPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.postponeEarlyActivationPageLocator)).toBeTruthy();
  }

  async validatePageMessage() {
    expect(await waitForTextToBeVisible(this.page, this.postponeEarlyActivationMessage)).toBeTruthy();
  }

  async postponeActivationButtonIsNotVisible() {
    const button = this.page.getByRole('button', { name: this.postponeEarlyActivationButtonLocator });
    await expect(button).not.toBeVisible();
  }

  async validateClosingGreeting() {
    const closing = this.page.getByText(/^Freundliche Grüße/);
    await expect(closing).toBeVisible();
    const html = await closing.innerHTML();
    expect(html).toContain('Freundliche Grüße<br>Dein Vodafone-Team');
  }

}
