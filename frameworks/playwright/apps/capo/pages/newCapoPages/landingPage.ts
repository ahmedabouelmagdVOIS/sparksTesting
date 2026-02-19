import { Page, expect } from '@playwright/test';
import { waitForTextToBeVisible } from '../../../../common/actionHelpers';

export class LandingPage {
  readonly page: Page;
  readonly postponeEarlyActivationButtonLocator = 'Später nutzen';
  readonly earlyActivationButtonLocator = 'Sofort nutzen';
  readonly landingPageLocator = 'Dein Anschluss funktioniert schon';

  constructor(page: Page) {
    this.page = page;
  }

  async postponeEarlyActivation(timeout: number = 5000) {
    await this.page.getByRole('button', { name: this.postponeEarlyActivationButtonLocator }).click({ timeout });
  }

  async earlyActivate() {
    await this.page.getByRole('button', { name: this.earlyActivationButtonLocator }).click();
  }

  async landingPageIsOpened() {
    expect(await waitForTextToBeVisible(this.page, this.landingPageLocator)).toBeTruthy();
  }

  async validateContent(productName: string | undefined) {
    // 1. Title check
    await expect(this.page).toHaveTitle('Vodafone Anbieterwechsel');

    // 2. Product description text
    const productDescriptionInText = productName === undefined ? '' : productName + ' ';
    await expect(
      this.page.getByText(
        `nutz Deinen neuen ${productDescriptionInText}Anschluss schon heute. Dann bekommst Du noch den Anbieterwechsel-Vorteil von uns.`
      )
    ).toBeVisible();

    // 3. Info text
    await expect(
      this.page.getByText(
        'Das heißt: Bis zum Ende Deines alten Vertrags, allerdings höchstens 12 Monate lang, schenken wir Dir den Tarifpreis für Deinen neuen Vodafone Kabel Festnetz-Anschluss.'
      )
    ).toBeVisible();

    await this.validateClosingGreeting()

    // 5. Sofort nutzen info
    await expect(
      this.page.getByText(
        `Wenn Du auf „Sofort nutzen“ klickst, wird Dein ${productDescriptionInText}Tarif automatisch sofort aktiviert. An welchem Tag Du dann offiziell zu uns wechselst, schreiben wir Dir per E-Mail. Während Du den Anbieterwechsel-Vorteil von uns bekommst, berechnen wir Dir Einmal-Preise, Zusatzdienste und eventuelle Nutzungskosten. Danach auch den Tarifpreis.`
      )
    ).toBeVisible();

    // 6. FAQ section
    const faq = this.page.getByText(/^Gut zu wissen/);
    await expect(faq).toBeVisible();

    // 7. Gutschriften not visible initially
    const gutschriften = this.page.getByText(/^Du bekommst Gutschriften/);
    await expect(gutschriften).not.toBeVisible();

    // 8. Expand/collapse FAQ
    const wieLange = this.page.getByText(/^Wie und wie lange bekomme/);
    await wieLange.click();
    await expect(gutschriften).toBeVisible();
    await wieLange.click();

    // 9. Image check
    await this.validateThatLandingPageImageIsVisible();
  }

  async validateClosingGreeting() {
    const closing = this.page.getByText(/^Freundliche Grüße/);
    await expect(closing).toBeVisible();
    const html = await closing.innerHTML();
    expect(html).toContain('Freundliche Grüße<br>Dein Vodafone-Team');
  }

  async theLoadingSpinnerIsVisible(timeout: number = 5000) {
    await expect(this.page.locator('svg[class^="LoadingSpinner"]')).toBeVisible({ timeout });
  }


  async validateThatLandingPageImageIsVisible() {
    const imgs = this.page.locator('img');
    const count = await imgs.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const src = await imgs.nth(i).getAttribute('src');
      if (/1907_CF_GIGATV_NEOSEEN009_2_.*\.png/.test(src ?? '')) {
        await expect(imgs.nth(i)).toBeVisible();
        const naturalWidth = await imgs.nth(i).evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
        found = true;
        break;
      }
    }
    expect(found).toBeTruthy();
  }

  async vodafoneIconIsVisible() {
    const favicon = this.page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', /favicon\.svg$/);
  }

  async theApiHeaderHasTheCorrectUuidRegex(apiPath: string, regex: RegExp, timeout: number = 5000) {
    const response = await this.page.waitForResponse(
      resp => resp.url().includes(apiPath),
      { timeout }
    );
    const headers = response.request().headers();
    expect(headers).toHaveProperty('x-log-ref');
    expect(headers['x-log-ref']).toMatch(regex);
  }

}
