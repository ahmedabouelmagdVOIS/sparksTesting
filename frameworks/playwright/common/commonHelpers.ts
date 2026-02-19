import { Page } from '@playwright/test';

export async function generateRandomId(page: Page): Promise<string> {
    return Math.floor(1000 + Math.random() * 9000).toString();
}