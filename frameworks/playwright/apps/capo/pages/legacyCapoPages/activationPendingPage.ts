import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class ActivationPendingPage {
  readonly page: Page;
  readonly activationPendingPageLocator = 'Dein Anschluss ist noch nicht freigeschaltet';

  constructor(page: Page) {
    this.page = page;
  }

  async activationPendingPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.activationPendingPageLocator)).toBeTruthy();
  }
}
