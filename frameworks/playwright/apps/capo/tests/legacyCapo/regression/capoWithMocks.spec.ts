import {test} from '@playwright/test';
import {POManager} from '../../../pages/POManager';

test.setTimeout(0);


let poManager: POManager;


test.beforeEach(async ({page}) => {
    poManager = new POManager(page);
    await poManager.assertSuccessfulAssetRequests();
    await poManager.clearLegacyCapoExpectations();
});

test.afterEach(async () => {
    await poManager.clearLegacyCapoExpectations();
});

test('Device activation fails because customer not found', async () => {
    await poManager.uploadLegacyCapoExpectations(null, '5.7.8.4', '43:bc:6d:e8:af:72', null);
    await poManager.setHeaders({'x-cpe-ip': '5.7.8.4'});
    await poManager.openCapo();
    await poManager.getLegacyLandingPageErrorPage().landingPageErrorPageIsOpened();
});

test('Wholesale customer goes through device activation flow', async () => {
    const customerId = await poManager.getCustomerId();
    await poManager.uploadLegacyCapoExpectations(customerId, '9.3.4.6', '1b:c5:7d:83:f8:9a', 'WSP');
    await poManager.setHeaders({'x-cpe-ip': '9.3.4.6'});
    await poManager.openCapo();
    await poManager.getO2Page().o2PageIsOpened();
});

test('Vodafone customer goes through device activation flow', async () => {
    const customerId = await poManager.getCustomerId();
    await poManager.uploadLegacyCapoExpectations(customerId, '5.5.0.2', '84:d6:ca:73:9f:0e', 'CCB');
    await poManager.setHeaders({'x-cpe-ip': '5.5.0.2'});
    await poManager.openCapo();
    await poManager.getLegacyLandingPage().validateEarlyActivationButtonIsDisplayed();
    await poManager.getLegacyLandingPage().validatePostponeEarlyActivationButtonIsDisplayed();
    await poManager.getLegacyLandingPage().postponeEarlyActivation();
    await poManager.getLegacyPostponeEarlyActivationPage().postponeEarlyActivationPageIsOpened();
    await poManager.openCapo();
    await poManager.getLegacyLandingPage().validateEarlyActivationButtonIsDisplayed();
    await poManager.getLegacyLandingPage().validatePostponeEarlyActivationButtonIsDisplayed();
    await poManager.getLegacyLandingPage().earlyActivate();
    await poManager.getLegacySuccessfulActivationPage().successfulActivationPageIsOpened();
    await poManager.openCapo();
    await poManager.getLegacyActivationPendingPage().activationPendingPageIsOpened()
});
