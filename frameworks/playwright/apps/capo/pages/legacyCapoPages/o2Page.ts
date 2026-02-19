import { Page, expect } from '@playwright/test';
import { waitForTextToBeVisible } from '../../../../common/actionHelpers';
import {open} from "../../../../common/pageHelpers";


export class O2Page {
  readonly page: Page;
  readonly o2PagePageLocator = 'Ihr Highspeed-Internet ist bald startklar';
  readonly greetingText = 'Guten Tag,';
  readonly hotlineText = '089 6666 300 612';

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await open(this.page, '/tef');
  }

  async o2PageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.o2PagePageLocator)).toBeTruthy();
  }

  async assertGreeting() {
    expect(await waitForTextToBeVisible(this.page, this.greetingText)).toBeTruthy();
  }

  async assertHotline() {
    expect(await waitForTextToBeVisible(this.page, this.hotlineText)).toBeTruthy();
  }

  async assertEarlyActivationInfo() {
    expect(await waitForTextToBeVisible(this.page, 'Den Aktivierungstermin finden Sie auf Ihrer Auftragsbestätigung. Sollten Sie diesen Termin vorziehen wollen rufen Sie uns gerne an.')).toBeTruthy();
  }

}
