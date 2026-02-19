import {test} from '@playwright/test';
import {POManager} from '../../../../pages/POManager';

test.setTimeout(0);


let poManager: POManager;

const allSalutationCases = ['MALE_SALUTATION', 'FEMALE_SALUTATION', 'NO_SALUTATION', 'COMPANY_SALUTATION', 'EMPTY_SALUTATION', 'INVALID_SALUTATION'];

test.beforeEach(async ({page}) => {
    poManager = new POManager(page);
    await poManager.assertSuccessfulAssetRequests();
    await poManager.clearLegacyCapoExpectations();
    const customerId = await poManager.getCustomerId();
    await poManager.uploadLegacyCapoExpectations(customerId, '1.2.3.5', 'a1:b2:c3:d4:e5:f6', 'WSP');
    await poManager.setHeaders({'x-cpe-ip': '1.2.3.5'});
});

test.afterEach(async () => {
    await poManager.clearLegacyCapoExpectations();
});

test.describe('All salutation is greeted with "Guten Tag" in the O2 page', () => {
    for (const salutation of allSalutationCases) {
        test(`Testing the "${salutation}" salutation`, async () => {
            await poManager.setSalutationMockCookie(salutation);
            await poManager.openCapo();
            await poManager.getO2Page().o2PageIsOpened();
            await poManager.getO2Page().assertGreeting();
        });
    }
});

test('Verify the O2 support hotline number is "089 6666 300 612"', async () => {
    await poManager.openCapo();
    await poManager.getO2Page().o2PageIsOpened();
    await poManager.getO2Page().assertHotline();
});

test('Verify The O2 early activation instructions', async () => {
    await poManager.openCapo();
    await poManager.getO2Page().o2PageIsOpened();
    await poManager.getO2Page().assertEarlyActivationInfo()
});
