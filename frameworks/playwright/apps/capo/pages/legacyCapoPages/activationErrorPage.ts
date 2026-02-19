import { Page, expect } from '@playwright/test';
import {waitForTextToBeVisible} from "../../../../common/actionHelpers";

export class ActivationErrorPage {
  readonly page: Page;
  readonly activationErrorPageLocator = 'Wir haben technische Probleme und können Deinen Anschluss gerade nicht aktivieren';

  constructor(page: Page) {
    this.page = page;
  }

  async activationErrorPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.activationErrorPageLocator)).toBeTruthy();
  }
}
