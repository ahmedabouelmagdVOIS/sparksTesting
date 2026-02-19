import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as dotenv from 'dotenv';
 
const isCI = !!process.env.CI;
 
const appName = (process.env.APP_NAME || 'eap').toLowerCase();

export const env = process.env.ENV || 'test1b';
 
const envPath = path.resolve(__dirname, `apps/${appName}/.env.${appName}.${env}`);
dotenv.config({ path: envPath });
 
export const env_username = process.env.USERNAME;
export const env_password = process.env.PASSWORD;
 
let resultsPath = process.env.RESULTS_PATH?.trim()
  ? path.resolve(process.env.RESULTS_PATH, 'testResults')
  : path.resolve(__dirname, 'testResults');
 
const timeStamp = new Date().toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-') + '_' +
  new Date().toLocaleDateString('en-GB').replace(/\//g, '_');
 
const reportFolder = isCI ? path.join(resultsPath, 'reports') : path.join(resultsPath, timeStamp, 'reports');
const tracesFolder = isCI ? path.join(resultsPath, 'traces') : path.join(resultsPath, timeStamp, 'traces');



export default defineConfig({
  outputDir: tracesFolder,
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : 1,
  reporter: [['html', { open: 'never', outputFolder: reportFolder }]],
  snapshotPathTemplate: path.resolve(__dirname, `apps/${appName}/testData/snapshots/{arg}{ext}`),

  use: {
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
 
  projects: [
    { 
      name: 'eap', 
      testDir: `apps/eap/tests/`,
      use: { ...devices['Desktop Chrome'] } 
    },
    { 
      name: 'jmc',
      testDir: `apps/jmc/tests/`,
      use: { ...devices['Desktop Chrome'] } 
    },
    {
      name: 'capo',
      testDir: `apps/capo/tests/`,
      use: { ...devices['Desktop Chrome'] }
    },
  ],
 
  expect: {
    toHaveScreenshot: { stylePath: './screenshot.css' },
  },
});