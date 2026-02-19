import { Page, expect } from '@playwright/test';
import { waitForTextToBeVisible } from '../../../../common/actionHelpers';

export class ActivationErrorPage {
  readonly page: Page;
  readonly activationErrorPageLocator = 'Wir haben technische Probleme und können Deinen Anschluss gerade nicht aktivieren';

  constructor(page: Page) {
    this.page = page;
  }

  async activationErrorPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.activationErrorPageLocator)).toBeTruthy();
  }

  async assertError(expectedErrorCode: string) {
    expect(await waitForTextToBeVisible(this.page, `Fehler: ${expectedErrorCode}`, 1000)).toBeTruthy();
    expect(await waitForTextToBeVisible(this.page, 'Wir haben technische Probleme und können Deinen Anschluss gerade nicht aktivieren.', 100)).toBeTruthy();
    expect(await waitForTextToBeVisible(this.page, `Hallo!`, 100)).toBeTruthy();
    expect(await waitForTextToBeVisible(this.page, `Freundliche Grüße`, 100)).toBeTruthy();
    await this.validateHotlineLinkIsValid();
  }

  async validateHotlineLinkIsValid() {
    const hotlineLink = this.page.getByText(/^Hotline/);
    await expect(hotlineLink).toBeVisible();
    const href = await hotlineLink.getAttribute('href');
    expect(href).toMatch(/^tel:\d+$/);
  }

}
