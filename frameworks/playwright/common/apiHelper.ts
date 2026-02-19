import {expect, Page} from '@playwright/test';

export async function runFakeApiRequest(page: Page, path: string, ip_address: string, network: string) {
    await page.request.post(path, {
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            ip_address: ip_address,
            network: network
        }
    });
}

export async function setApiDelay(page: Page, milliseconds: number): Promise<void> {
    await page.route('**/api/**', async (route) => {
        await new Promise(resolve => setTimeout(resolve, milliseconds)); // Add delay
        await route.continue(); // Continue with the request after the delay
    });
}

export async function setHeaders(page: Page, headers: Record<string, string | null>): Promise<void> {
    await page.route('**/*', async (route) => {
        const request = route.request();
        const mergedHeaders: Record<string, string> = {...request.headers()};
        for (const [key, value] of Object.entries(headers)) {
            if (value === null) {
                delete mergedHeaders[key];
            } else if (value !== undefined) {
                mergedHeaders[key] = value;
            }
        }
        await route.continue({headers: mergedHeaders});
    });
}

export async function assertSuccessfulAssetRequests(page: Page): Promise<void> {
    await page.route('**/*.{js,png,svg,woff}', async (route) => {
        const request = route.request();
        const response = await request.response();
        if (response) {
            const status = response.status();
            if (status >= 400) {
                console.error(`Request to ${request.url()} failed with status code ${status}`);
            }
        }
        await route.continue();
    });
}

export async function assertApiResponse(
  page: Page,
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  headers: Record<string, string> | null,
  expectedStatus: number,
  expectedProperties?: Record<string, any> | null,
  expectedResponseHeaders?: Record<string, string> | null
): Promise<void> {
  const response = await page.request.fetch(path, {
    method,
    headers: headers || undefined
  });
  expect(response.status()).toBe(expectedStatus);
  const contentType = response.headers()['content-type'] || '';
  let responseBody: any = null;
  if (contentType.includes('application/json')) {
    responseBody = await response.json();
    if (expectedProperties) {
      for (const [key, value] of Object.entries(expectedProperties)) {
        expect(responseBody).toHaveProperty(key, value);
      }
    }
  }
  if (expectedResponseHeaders) {
    const actualHeaders = response.headers();
    for (const [headerName, headerValue] of Object.entries(expectedResponseHeaders)) {
      expect(actualHeaders[headerName.toLowerCase()]).toBe(headerValue);
    }
  }
}
