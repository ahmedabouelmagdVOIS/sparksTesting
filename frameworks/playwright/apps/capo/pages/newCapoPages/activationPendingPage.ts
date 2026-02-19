import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class ActivationPendingPage {
  readonly page: Page;
  readonly activationPendingPageLocator = 'Dein Anschluss wird gerade aktiviert';

  constructor(page: Page) {
    this.page = page;
  }

  async activationPendingPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.activationPendingPageLocator)).toBeTruthy();
  }

  async validatePageImageIsVisible() {
    const image = this.page.locator('img[alt="image"]');
    await expect(image).toBeVisible();
    const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  }

  async validateHotlineLinkIsValid() {
    const hotlineLink = this.page.getByText(/^Hotline/);
    await expect(hotlineLink).toBeVisible();
    const href = await hotlineLink.getAttribute('href');
    expect(href).toMatch(/^tel:\d+$/);
  }

}
