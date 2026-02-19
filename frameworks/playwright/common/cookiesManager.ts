import { Page } from '@playwright/test';
import {baseUrl} from "./config";

/**
 * Sets a demo cookie on the Playwright page using the provided JSON config.
 * @param page Playwright Page object
 * @param cookieName Name of the cookie to set
 * @param cookieElements Object of cookie elements and their values
 */
export async function setDemoCookie(
  page: Page,
  cookieName: string,
  cookieElements: Record<string, string>
): Promise<void> {
  // Set the main demo cookie
  await setCookie(page, cookieName, 'true');

  // Set each cookie element with its name and value
  for (const [elementName, elementValue] of Object.entries(cookieElements)) {
    await setCookie(page, `${cookieName}_option_${elementName}`, elementValue);
  }
}

/**
 * Sets a cookie in the browser for the given name and value.
 * @param page Playwright Page object
 * @param cookieName Name of the cookie to set
 * @param cookieValue Value of the cookie to set
 */
export async function setCookie(
  page: Page,
  cookieName: string,
  cookieValue: string
): Promise<void> {
  await page.context().addCookies([
    {
      name: cookieName,
      value: cookieValue,
      domain: new URL(baseUrl).hostname,
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
      expires: -1 // Session cookie
    }
  ]);
}

export async function setCookies(page: Page, cookies: Record<string, string>): Promise<void> {
  for (const [cookieName, cookieValue] of Object.entries(cookies)) {
     await setCookie(page, cookieName, cookieValue);
  }
}