import {expect, Page} from '@playwright/test';

import {ActivationErrorPage as LegacyActivationErrorPage} from './legacyCapoPages/activationErrorPage';
import {ActivationPendingPage as LegacyActivationPendingPage} from './legacyCapoPages/activationPendingPage';
import {LandingPage as LegacyLandingPage} from './legacyCapoPages/landingPage';
import {LandingPageErrorPage as LegacyLandingPageErrorPage} from './legacyCapoPages/landingPageError';
import {
    PostponeEarlyActivationPage as LegacyPostponeEarlyActivationPage
} from './legacyCapoPages/postponeEarlyActivationPage';
import {SuccessfulActivationPage as LegacySuccessfulActivationPage} from './legacyCapoPages/successfulActivationPage';

import {ActivationErrorPage as NewActivationErrorPage} from './newCapoPages/activationErrorPage';
import {ActivationPendingPage as NewActivationPendingPage} from './newCapoPages/activationPendingPage';
import {LandingPage as NewLandingPage} from './newCapoPages/landingPage';
import {LandingPageErrorPage as NewLandingPageErrorPage} from './newCapoPages/landingPageError';
import {
    PostponeEarlyActivationPage as NewPostponeEarlyActivationPage
} from './newCapoPages/postponeEarlyActivationPage';
import {SuccessfulActivationPage as NewSuccessfulActivationPage} from './newCapoPages/successfulActivationPage';

import {assertSuccessfulAssetRequests, setHeaders, assertApiResponse} from '../../../common/apiHelper';
import {clearExpectations, uploadExpectations} from "../../../common/mockserverHelpers";
import {waitForTextToBeVisible} from "../../../common/actionHelpers";
import {open, verifyPageOpenedViaUrl} from "../../../common/pageHelpers";
import {baseUrl, environment} from "../../../common/config";
import {setCookies, setDemoCookie} from "../../../common/cookiesManager";
import {getCustomerId} from "../../../common/gimliHelpers";
import {generateRandomId} from "../../../common/commonHelpers";
import { O2Page } from './legacyCapoPages/o2Page';
import { QaToolsPage } from './legacyCapoPages/qaToolsPage';


export class POManager {
    private readonly page: Page;

    private readonly legacyActivationErrorPage: LegacyActivationErrorPage;
    private readonly legacyActivationPendingPage: LegacyActivationPendingPage;
    private readonly legacyLandingPage: LegacyLandingPage;
    private readonly legacyLandingPageErrorPage: LegacyLandingPageErrorPage;
    private readonly legacyPostponeEarlyActivationPage: LegacyPostponeEarlyActivationPage;
    private readonly legacySuccessfulActivationPage: LegacySuccessfulActivationPage;

    private readonly newActivationErrorPage: NewActivationErrorPage;
    private readonly newActivationPendingPage: NewActivationPendingPage;
    private readonly newLandingPage: NewLandingPage;
    private readonly newLandingPageErrorPage: NewLandingPageErrorPage;
    private readonly newPostponeEarlyActivationPage: NewPostponeEarlyActivationPage;
    private readonly newSuccessfulActivationPage: NewSuccessfulActivationPage;

    private readonly o2Page: O2Page;
    private readonly qaToolsPage: QaToolsPage;

    readonly mockserverBaseUrl = 'https://mockserver.k8s-cet-ingress.pst-test.development-network.coma-mgmt.coma-vf.de';
    readonly authorization = 'dXNlcjpTUGZHUEtJNUM1WVM2Q2lZemQ5NQ==';
    readonly newCapoPathMatcher: string = 'captiveportal';
    readonly legacyCapoDxlPathMatcher: string = 'dxl-preprod/solstice/v1/tmf-api/resourceInventoryManagement/v4/resource';
    readonly legacyCapoSbpPathMatcher: string = 'SbpProvisioningAccountData/provisioning-account-data/ProvisioningAccountData';

    readonly capoAppPath = '/';
    readonly capoPageLocator = 'Seite wird geladen';

    readonly newCapoExpectationsPath = './apps/capo/testData/mockserverExpectations/newCapoMockserverExpectations/allExpectations.json';
    readonly legacyCapoDxlExpectationsPath = './apps/capo/testData/mockserverExpectations/legacyCapoMockserverExpectations/dxlDeviceForIpAddress.json';
    readonly legacyCapoSbpExpectationsPath = './apps/capo/testData/mockserverExpectations/legacyCapoMockserverExpectations/sbpFindContracts.json';
    readonly legacyCapoSbpExpectationsPathForNoCustomerFound = './apps/capo/testData/mockserverExpectations/legacyCapoMockserverExpectations/sbpFindContractsNoCustomerFound.json';
    constructor(page: Page) {
        this.page = page;

        this.legacyActivationErrorPage = new LegacyActivationErrorPage(page);
        this.legacyActivationPendingPage = new LegacyActivationPendingPage(page);
        this.legacyLandingPage = new LegacyLandingPage(page);
        this.legacyLandingPageErrorPage = new LegacyLandingPageErrorPage(page);
        this.legacyPostponeEarlyActivationPage = new LegacyPostponeEarlyActivationPage(page);
        this.legacySuccessfulActivationPage = new LegacySuccessfulActivationPage(page);

        this.newActivationErrorPage = new NewActivationErrorPage(page);
        this.newActivationPendingPage = new NewActivationPendingPage(page);
        this.newLandingPage = new NewLandingPage(page);
        this.newLandingPageErrorPage = new NewLandingPageErrorPage(page);
        this.newPostponeEarlyActivationPage = new NewPostponeEarlyActivationPage(page);
        this.newSuccessfulActivationPage = new NewSuccessfulActivationPage(page);

        this.o2Page = new O2Page(page);
        this.qaToolsPage = new QaToolsPage(page);
    }

    getLegacyActivationErrorPage(): LegacyActivationErrorPage {
        return this.legacyActivationErrorPage;
    }

    getLegacyActivationPendingPage(): LegacyActivationPendingPage {
        return this.legacyActivationPendingPage;
    }

    getLegacyLandingPage(): LegacyLandingPage {
        return this.legacyLandingPage;
    }

    getLegacyLandingPageErrorPage(): LegacyLandingPageErrorPage {
        return this.legacyLandingPageErrorPage;
    }

    getLegacyPostponeEarlyActivationPage(): LegacyPostponeEarlyActivationPage {
        return this.legacyPostponeEarlyActivationPage;
    }

    getLegacySuccessfulActivationPage(): LegacySuccessfulActivationPage {
        return this.legacySuccessfulActivationPage;
    }

    getNewActivationErrorPage(): NewActivationErrorPage {
        return this.newActivationErrorPage;
    }

    getNewActivationPendingPage(): NewActivationPendingPage {
        return this.newActivationPendingPage;
    }

    getNewLandingPage(): NewLandingPage {
        return this.newLandingPage;
    }

    getNewLandingPageErrorPage(): NewLandingPageErrorPage {
        return this.newLandingPageErrorPage;
    }

    getNewPostponeEarlyActivationPage(): NewPostponeEarlyActivationPage {
        return this.newPostponeEarlyActivationPage;
    }

    getNewSuccessfulActivationPage(): NewSuccessfulActivationPage {
        return this.newSuccessfulActivationPage;
    }

    getO2Page(): O2Page {
        return this.o2Page;
    }

    getQaToolsPage(): QaToolsPage {
        return this.qaToolsPage;
    }

    async openCapo() {
        await open(this.page, this.capoAppPath);
    }

    async open(path: string) {
        await open(this.page, path);
    }

    async verifyPageOpenedViaUrl(path: string) {
        await verifyPageOpenedViaUrl(this.page, path);
    }

    async capoIsOpened(timeout: number = 5000) {
        expect(await waitForTextToBeVisible(this.page, this.capoPageLocator, timeout)).toBeTruthy();
    }

    async assertGreetingWithName(firstName: string) {
        const greeting = `Hallo ${firstName},`;
        expect(await waitForTextToBeVisible(this.page, greeting)).toBeTruthy();
    }

    async newCapoAssertGreetingWithoutName() {
        const greeting = 'Hallo!';
        expect(await waitForTextToBeVisible(this.page, greeting)).toBeTruthy();
    }

    async legacyCapoAssertGreetingWithoutName() {
        const greeting = 'Hallo,';
        expect(await waitForTextToBeVisible(this.page, greeting)).toBeTruthy();
    }

    async assertSuccessfulAssetRequests() {
        await assertSuccessfulAssetRequests(this.page);
    }

    async clearNewCapoExpectations() {
        await clearExpectations(this.mockserverBaseUrl, this.authorization, this.newCapoPathMatcher);
    }

    async clearLegacyCapoExpectations() {
        await clearExpectations(this.mockserverBaseUrl, this.authorization, this.legacyCapoDxlPathMatcher);
        await clearExpectations(this.mockserverBaseUrl, this.authorization, this.legacyCapoSbpPathMatcher);
    }

    async uploadNewCapoExpectations(dataToUpdate: Record<string, string | number | null> | null = null) {
        await uploadExpectations(this.newCapoExpectationsPath, this.mockserverBaseUrl, this.authorization, dataToUpdate)
    }

    async uploadLegacyCapoDxlExpectations(dataToUpdate: Record<string, any>) {
        await uploadExpectations(this.legacyCapoDxlExpectationsPath, this.mockserverBaseUrl, this.authorization, dataToUpdate)
    }

    async uploadLegacyCapoSbpExpectations(dataToUpdate: Record<string, any>) {
        await uploadExpectations(this.legacyCapoSbpExpectationsPath, this.mockserverBaseUrl, this.authorization, dataToUpdate)
    }

    async uploadLegacyCapoSbpExpectationsForNoCustomerFound(dataToUpdate: Record<string, any>) {
        await uploadExpectations(this.legacyCapoSbpExpectationsPathForNoCustomerFound, this.mockserverBaseUrl, this.authorization, dataToUpdate)
    }

    async setHeaders(headers: Record<string, string | null>) {
        await setHeaders(this.page, headers);
    }

    async getServerUuid(): Promise<string> {
        const response = await this.page.request.get(`${baseUrl}/api/internal/mockservercontrol?setup=true&clear=true`, {
            headers: {
                'authorization': 'Basic ZHVtbXk6ZHVtbXk=',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to get server UUID, status: ${response.status}`);
        }
        const responseBody = await response.text();
        const regex = /\/captiveportal\/([a-f0-9-]+)\//;
        const match = responseBody.match(regex);
        if (match && match[1]) {
            return match[1];
        } else {
            throw new Error('Server UUID not found in response');
        }
    }

    async setSalutationMockCookie(salutation: string) {
        await setDemoCookie(this.page, 'capoSalutationMock', {salutation: salutation});
    }

    async getCustomerId(): Promise<string> {
        return await getCustomerId(environment);
    }

    // TODO: delete it later and use uploadNewCapoExpectations instead.
    async uploadDxlOathFailMock() {
        const response = await fetch(`${baseUrl}/api/internal/mockservercontrol?setup=true&clear=true&malformedOauthResponse=true`, {
            method: 'GET',
            headers: {
                'authorization': 'Basic ZHVtbXk6ZHVtbXk=',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to get server UUID, status: ${response.status}`);
        }
    }

    async generateRandomId() {
        await generateRandomId(this.page);
    }

    async assertApiResponse(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers: Record<string, string> | null, expectedStatus: number, expectedProperties: Record<string, any> | null, expectedResponseHeaders: Record<string, string> | null): Promise<void> {
        await assertApiResponse(this.page, path, method, headers, expectedStatus, expectedProperties, expectedResponseHeaders);
    }

    async uploadLegacyCapoExpectations(customerId: string | null, ipAddress: string, macAddress: string, customerType: 'CCB' | 'WSP' | null) {
        if (customerId && customerType) {
            const dxlUpdatedData = {
                dummyIpAddress: ipAddress,
                dummyMacAddress: macAddress.toUpperCase(),
            };
            const sbpUpdatedData = {
                dummyMacAddressLowercase: macAddress.toLowerCase(),
                customerAccountNumber: customerId,
                customerType: customerType,
            };
            await this.uploadLegacyCapoDxlExpectations(dxlUpdatedData);
            await this.uploadLegacyCapoSbpExpectations(sbpUpdatedData);
        } else {
            const dxlUpdatedData = {
                dummyIpAddress: ipAddress,
                dummyMacAddress: macAddress.toUpperCase(),
            };
            const sbpUpdatedData = {
                dummyMacAddressLowercase: macAddress.toLowerCase(),
            };
            await this.uploadLegacyCapoDxlExpectations(dxlUpdatedData);
            await this.uploadLegacyCapoSbpExpectationsForNoCustomerFound(sbpUpdatedData);
        }
    }

}
