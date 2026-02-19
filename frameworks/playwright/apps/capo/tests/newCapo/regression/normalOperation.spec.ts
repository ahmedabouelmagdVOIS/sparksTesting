import {test} from '@playwright/test';
import { POManager } from '../../../pages/POManager';

const viewportSizes: [number, number][] = [
  [320, 480],
  [768, 1024],
  [1920, 1080]
];

let poManager: POManager;
let serverUuid: string ;


const INTERACTION_TIMEOUT_MS = 100;
const API_DELAY_MS = 200;
const MOCKSERVER_CALL_MS = 2000;
const WITH_API_TIMEOUT_MS = INTERACTION_TIMEOUT_MS + API_DELAY_MS + MOCKSERVER_CALL_MS;


for (const viewportSize of viewportSizes) {

  test.describe(`Viewport: ${viewportSize[0]}x${viewportSize[1]}`, () => {

    test.beforeEach(async ({ page }) => {
      poManager = new POManager(page);
      serverUuid = await poManager.getServerUuid();
      await poManager.clearNewCapoExpectations();
      const mockserverUpdatedData = {
        firstName: 'testMax',
        salutation: 'Herr',
        serverUuid: serverUuid,
      };
      await poManager.uploadNewCapoExpectations(mockserverUpdatedData);
      await poManager.assertSuccessfulAssetRequests();
    });

    test.afterEach(async () => {
      await poManager.clearNewCapoExpectations();
    });

    test('Has loading screen', async () => {
      const headers = {
        'x-cpe-ip': null,
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
      };
      await poManager.setHeaders(headers);
      await poManager.openCapo();
      await poManager.getNewLandingPage().theLoadingSpinnerIsVisible();
      await poManager.capoIsOpened();
    });

    test('Customer has pending activation', async () => {

      const headers = {
        'x-cpe-ip': 'IP_pending',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
      };
      await poManager.setHeaders(headers);
      await poManager.openCapo();
      await poManager.getNewActivationPendingPage().activationPendingPageIsOpened();
      await poManager.getNewActivationPendingPage().validatePageImageIsVisible();
      await poManager.newCapoAssertGreetingWithoutName();
      await poManager.getNewActivationPendingPage().validateHotlineLinkIsValid();
    });

    test('Customer postpones activation', async ({page}) => {

      const headers = {
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
      };
      await poManager.setHeaders(headers);
      await poManager.openCapo();
      await poManager.capoIsOpened();
      await poManager.assertGreetingWithName('testMax');
      await poManager.getNewLandingPage().validateContent('Red Internet 50 Cable');
      await poManager.getNewLandingPage().postponeEarlyActivation(INTERACTION_TIMEOUT_MS);
      await poManager.getNewPostponeEarlyActivationPage().postponeActivationButtonIsNotVisible();
      await poManager.assertGreetingWithName('testMax');
      await poManager.getNewPostponeEarlyActivationPage().postponeEarlyActivationPageIsOpened();
      await poManager.getNewPostponeEarlyActivationPage().validatePageMessage()
      await poManager.getNewPostponeEarlyActivationPage().validateClosingGreeting();
    });


    test('Customer triggers activation successfully (with api delays)', async () => {

      const headers = {
        'x-cpe-ip': 'IP_activation_success',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
      };
      await poManager.setHeaders(headers);
      await poManager.openCapo();
      await poManager.getNewLandingPage().vodafoneIconIsVisible();
      await poManager.capoIsOpened(INTERACTION_TIMEOUT_MS);
      await poManager.getNewLandingPage().theApiHeaderHasTheCorrectUuidRegex('/api/customer', /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/, WITH_API_TIMEOUT_MS);
      await poManager.getNewLandingPage().validateContent('Red Internet 50 Cable');
      await poManager.assertGreetingWithName('testMax');
      await poManager.getNewLandingPage().earlyActivate();
      await poManager.getNewLandingPage().theLoadingSpinnerIsVisible(INTERACTION_TIMEOUT_MS);
      await poManager.getNewSuccessfulActivationPage().theApiHeaderHasTheCorrectUuidRegex('/api/activate', /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/, WITH_API_TIMEOUT_MS);
      await poManager.assertGreetingWithName('testMax');
      await poManager.getNewSuccessfulActivationPage().validatePageMessage();
      await poManager.getNewSuccessfulActivationPage().validateClosingGreeting();

    });

    test('Customer triggers activation successfully when it has only minimal data', async () => {

      const headers = {
        'x-cpe-ip': 'IP_contract_id_only',
        'x-network': 'VKD',
        'x-use-case': 'ProviderChange',
        'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
      };
      await poManager.setHeaders(headers);
      await poManager.openCapo();
      await poManager.getNewLandingPage().validateContent(undefined);
      await poManager.newCapoAssertGreetingWithoutName();
      await poManager.getNewLandingPage().earlyActivate();
      await poManager.newCapoAssertGreetingWithoutName();
      await poManager.getNewSuccessfulActivationPage().validatePageMessageIdOnly();
      await poManager.getNewSuccessfulActivationPage().validateClosingGreeting();
    });
  });
}
