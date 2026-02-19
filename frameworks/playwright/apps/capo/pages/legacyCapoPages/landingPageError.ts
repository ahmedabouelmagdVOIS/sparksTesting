import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class LandingPageErrorPage {
  readonly page: Page;
  readonly landingPageErrorPageLocator = 'Versuch es bitte später nochmal';

  constructor(page: Page) {
    this.page = page;
  }

  async landingPageErrorPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.landingPageErrorPageLocator)).toBeTruthy();
  }
}
