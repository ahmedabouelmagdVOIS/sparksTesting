import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class SuccessfulActivationPage {
  readonly page: Page;
  readonly successfulActivationPageLocator = 'Es geht los';

  constructor(page: Page) {
    this.page = page;
  }

  async successfulActivationPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.successfulActivationPageLocator)).toBeTruthy();
  }
}
