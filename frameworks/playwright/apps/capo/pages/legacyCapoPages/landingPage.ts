import { Page, expect } from '@playwright/test';
import { waitForTextToBeVisible } from '../../../../common/actionHelpers';

export class LandingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getEarlyActivationButtonLocator() {
    return this.page.getByRole('button', {name: 'Sofort nutzen'});
  }

  async getPostponeEarlyActivationButtonLocator() {
    return this.page.getByRole('button', { name: 'Später nutzen' });
  }

  async postponeEarlyActivation() {
    await (await this.getPostponeEarlyActivationButtonLocator()).click();
  }

  async earlyActivate() {
    await (await this.getEarlyActivationButtonLocator()).click();
  }

  async landingPageIsOpened() {
    expect(this.getEarlyActivationButtonLocator()).toBeTruthy();
  }

  async validateEarlyActivationButtonIsDisplayed() {
    expect(this.getEarlyActivationButtonLocator()).toBeTruthy();
  }

  async validatePostponeEarlyActivationButtonIsDisplayed() {
    expect(this.getPostponeEarlyActivationButtonLocator()).toBeTruthy();
  }

}
