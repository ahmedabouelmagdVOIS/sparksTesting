import {test} from '@playwright/test';
import {POManager} from '../../../pages/POManager';


let poManager: POManager;

test.beforeEach(async ({page}) => {
    poManager = new POManager(page);
});

test('Landing page for new Telefonica customer', async ({page}) => {
    await poManager.getO2Page().open();
    await poManager.getO2Page().o2PageIsOpened();
});

test('Download zip-file containing error page', async ({page, request}) => {
    await poManager.assertApiResponse('/tef/data/errorpage4capoproxy.zip', 'GET', null, 200, null, {'Content-Type': 'application/zip'});
});

test('Invalid customer visits home page', async ({page}) => {
    await poManager.openCapo();
    await poManager.getLegacyLandingPageErrorPage().landingPageErrorPageIsOpened();
});

test('Use QA-Tools for random customer number', async ({page}) => {
    await poManager.getQaToolsPage().open();
    await poManager.getQaToolsPage().fillCustomerNumber('111111111');
    await poManager.getQaToolsPage().earlyActivate();
    await poManager.getLegacyLandingPageErrorPage().landingPageErrorPageIsOpened();
});

