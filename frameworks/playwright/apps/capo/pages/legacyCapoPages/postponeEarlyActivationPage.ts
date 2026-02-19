import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class PostponeEarlyActivationPage {
  readonly page: Page;
  readonly postponeEarlyActivationPageLocator = 'Möchtest Du schon früher starten?';

  constructor(page: Page) {
    this.page = page;
  }

  async postponeEarlyActivationPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.postponeEarlyActivationPageLocator)).toBeTruthy();
  }
}
