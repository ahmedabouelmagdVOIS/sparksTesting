import {Page, Locator, expect} from '@playwright/test';
import { ActivationPage } from "./ActivationPage";
import { EapPage } from "./EapPage";
import { FakeMeinVodafoneLoginPage } from "./FakeMeinVodafoneLoginPage";
import { FakesPage } from "./FakesPage";
import { MainPage } from "./MainPage";
import { MaintenancePage } from "./MaintenancePage";
import { MeinVodafoneLoginPage } from "./MeinVodafoneLoginPage";
import { MeinVodafonePage } from "./MeinVodafonePage";
import { MeinVodafonePasswordResetPage } from "./MeinVodafonePasswordResetPage";
import { O2Page } from "./O2Page";
import { UMContractSelectionPage } from "./UMContractSelectionPage";
import { UMLoginPage } from "./UMLoginPage";
import { V1ActivationPage } from "./V1ActivationPage";
import { V1RequestCodePage } from "./V1RequestCodePage";
import { V1RequestCodeStatePage } from "./V1RequestCodeStatePage";
import { V1VKDLoginPage } from "./V1VKDLoginPage";
import { V2AccountPage } from "./V2AccountPage";
import { V2ActivationPage } from "./V2ActivationPage";
import { V2ActivationPendingErrorPage } from "./V2ActivationPendingErrorPage";
import { V2ActivationStatePage } from "./V2ActivationStatePage";
import { V2ContractSelectionPage } from "./V2ContractSelectionPage";
import { V2LoginPage } from "./V2LoginPage";
import { V2UMLoginPage } from "./V2UMLoginPage";
import { V2VKDLoginPage } from "./V2VKDLoginPage";
import { VKDLoginPage } from "./VKDLoginPage";
import { runFakeApiRequest } from '../../../common/apiHelper';
import { open } from '../../../common/pageHelpers';
import {waitForPath, shouldBeOnInANewTab, openPageWithParameters} from '../../../common/pageHelpers';
import {setDemoCookie} from "../../../common/cookiesManager";

export class POManager {
    private readonly page: Page;

    private readonly activationPage: ActivationPage;
    private readonly eapPage: EapPage;
    private readonly fakeMeinVodafoneLoginPage: FakeMeinVodafoneLoginPage;
    private readonly fakesPage: FakesPage;
    private readonly mainPage: MainPage;
    private readonly maintenancePage: MaintenancePage;
    private readonly meinVodafoneLoginPage: MeinVodafoneLoginPage;
    private readonly meinVodafonePage: MeinVodafonePage;
    private readonly meinVodafonePasswordResetPage: MeinVodafonePasswordResetPage;
    private readonly o2Page: O2Page;
    private readonly umContractSelectionPage: UMContractSelectionPage;
    private readonly umLoginPage: UMLoginPage;
    private readonly v1ActivationPage: V1ActivationPage;
    private readonly v1RequestCodePage: V1RequestCodePage;
    private readonly v1RequestCodeStatePage: V1RequestCodeStatePage;
    private readonly v1VKDLoginPage: V1VKDLoginPage;
    private readonly v2AccountPage: V2AccountPage;
    private readonly v2ActivationPage: V2ActivationPage;
    private readonly v2ActivationPendingErrorPage: V2ActivationPendingErrorPage;
    private readonly v2ActivationStatePage: V2ActivationStatePage;
    private readonly v2ContractSelectionPage: V2ContractSelectionPage;
    private readonly v2LoginPage: V2LoginPage;
    private readonly v2UMLoginPage: V2UMLoginPage;
    private readonly v2VKDLoginPage: V2VKDLoginPage;
    private readonly vkdLoginPage: VKDLoginPage;

    constructor(page: Page) {
        this.page = page;
        this.activationPage = new ActivationPage(page);
        this.eapPage = new EapPage(page);
        this.fakeMeinVodafoneLoginPage = new FakeMeinVodafoneLoginPage(page);
        this.fakesPage = new FakesPage(page);
        this.mainPage = new MainPage(page);
        this.maintenancePage = new MaintenancePage(page);
        this.meinVodafoneLoginPage = new MeinVodafoneLoginPage(page);
        this.meinVodafonePage = new MeinVodafonePage(page);
        this.meinVodafonePasswordResetPage = new MeinVodafonePasswordResetPage(page);
        this.o2Page = new O2Page(page);
        this.umContractSelectionPage = new UMContractSelectionPage(page);
        this.umLoginPage = new UMLoginPage(page);
        this.v1ActivationPage = new V1ActivationPage(page);
        this.v1RequestCodePage = new V1RequestCodePage(page);
        this.v1RequestCodeStatePage = new V1RequestCodeStatePage(page);
        this.v1VKDLoginPage = new V1VKDLoginPage(page);
        this.v2AccountPage = new V2AccountPage(page);
        this.v2ActivationPage = new V2ActivationPage(page);
        this.v2ActivationPendingErrorPage = new V2ActivationPendingErrorPage(page);
        this.v2ActivationStatePage = new V2ActivationStatePage(page);
        this.v2ContractSelectionPage = new V2ContractSelectionPage(page);
        this.v2LoginPage = new V2LoginPage(page);
        this.v2UMLoginPage = new V2UMLoginPage(page);
        this.v2VKDLoginPage = new V2VKDLoginPage(page);
        this.vkdLoginPage = new VKDLoginPage(page);
    }

    getActivationPage(): ActivationPage {
        return this.activationPage;
    }
    getEapPage(): EapPage {
        return this.eapPage;
    }
    getFakeMeinVodafoneLoginPage(): FakeMeinVodafoneLoginPage {
        return this.fakeMeinVodafoneLoginPage;
    }
    getFakesPage(): FakesPage {
        return this.fakesPage;
    }
    getMainPage(): MainPage {
        return this.mainPage;
    }
    getMaintenancePage(): MaintenancePage {
        return this.maintenancePage;
    }
    getMeinVodafoneLoginPage(): MeinVodafoneLoginPage {
        return this.meinVodafoneLoginPage;
    }
    getMeinVodafonePage(): MeinVodafonePage {
        return this.meinVodafonePage;
    }
    getMeinVodafonePasswordResetPage(): MeinVodafonePasswordResetPage {
        return this.meinVodafonePasswordResetPage;
    }
    getO2Page(): O2Page {
        return this.o2Page;
    }
    getUMContractSelectionPage(): UMContractSelectionPage {
        return this.umContractSelectionPage;
    }
    getUMLoginPage(): UMLoginPage {
        return this.umLoginPage;
    }
    getV1ActivationPage(): V1ActivationPage {
        return this.v1ActivationPage;
    }
    getV1RequestCodePage(): V1RequestCodePage {
        return this.v1RequestCodePage;
    }
    getV1RequestCodeStatePage(): V1RequestCodeStatePage {
        return this.v1RequestCodeStatePage;
    }
    getV1VKDLoginPage(): V1VKDLoginPage {
        return this.v1VKDLoginPage;
    }
    getV2AccountPage(): V2AccountPage {
        return this.v2AccountPage;
    }
    getV2ActivationPage(): V2ActivationPage {
        return this.v2ActivationPage;
    }
    getV2ActivationPendingErrorPage(): V2ActivationPendingErrorPage {
        return this.v2ActivationPendingErrorPage;
    }
    getV2ActivationStatePage(): V2ActivationStatePage {
        return this.v2ActivationStatePage;
    }
    getV2ContractSelectionPage(): V2ContractSelectionPage {
        return this.v2ContractSelectionPage;
    }
    getV2LoginPage(): V2LoginPage {
        return this.v2LoginPage;
    }
    getV2UMLoginPage(): V2UMLoginPage {
        return this.v2UMLoginPage;
    }
    getV2VKDLoginPage(): V2VKDLoginPage {
        return this.v2VKDLoginPage;
    }
    getVKDLoginPage(): VKDLoginPage {
        return this.vkdLoginPage;
    }

    /**
     * Calls the EAP fakes endpoint.
     */
    async setTheEapIpFakesMockCookie(ip_address: string, network: string): Promise<void> {
        await setDemoCookie(this.page, 'eapIpFakesMock', {ipAddress: ip_address, network: network});
    }

    async waitForPagePath(expectedPath: string) {
        await waitForPath(this.page, expectedPath);
    }

    async setCookiesForSuccessfulLegacyLogin() {
        await setDemoCookie(this.page, 'provisioningExecuteMockForEap', {});
        await setDemoCookie(this.page, 'provisioningHsiDataMockForEap', {});
        await setDemoCookie(this.page, 'eapAccountManagementServiceMock', {error: 'NO_ERROR'});
    }

    async setCookiesForCustomerDoesNotHaveVodafoneOwnedDevice() {
        await setDemoCookie(this.page, 'eapCRMDataProviderMock', {isDeviceCompanyOwned: 'false', hasKAVContract: 'false', hasKAIContract: 'true'});
    }

    async setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceHasVoiceContractDoesNotHaveInternetContract() {
        await setDemoCookie(this.page, 'eapCRMDataProviderMock', {isDeviceCompanyOwned: 'false', hasKAVContract: 'true', hasKAIContract: 'false'});
    }

    async setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceHasVoiceContract() {
        await setDemoCookie(this.page, 'eapCRMDataProviderMock', {isDeviceCompanyOwned: 'false', hasKAVContract: 'true', hasKAIContract: 'true'});
    }

    async setCookiesForCustomerDoesNotHaveVodafoneOwnedDeviceDoesNotHaveVoiceContract() {
        await setDemoCookie(this.page, 'eapCRMDataProviderMock', {isDeviceCompanyOwned: 'false', hasKAVContract: 'false', hasKAIContract: 'true'});
    }

    async setCookiesForCustomerHasVodafoneOwnedDeviceDoesNotHaveVoiceContract() {
        await setDemoCookie(this.page, 'eapCRMDataProviderMock', {isDeviceCompanyOwned: 'true', hasKAVContract: 'false', hasKAIContract: 'true'});
    }

    async setCookiesForCustomerHasVodafoneOwnedDevice() {
        await setDemoCookie(this.page, 'eapCRMDataProviderMock', {isDeviceCompanyOwned: 'true', hasKAVContract: 'true', hasKAIContract: 'true'});
    }

    async setCookiesForCustomerHasVodafoneOwnedDeviceHasVoiceContract() {
        await setDemoCookie(this.page, 'eapCRMDataProviderMock', {isDeviceCompanyOwned: 'true', hasKAVContract: 'true', hasKAIContract: 'true'});
    }

    async setCookiesForCustomerHasAllowedCustomerType() {
        await setDemoCookie(this.page, 'eapCustomerServiceAddressCheckMock', {allowedCustomerType: 'true', companyOwnedDeviceCase: 'success - ip:10.0.0.1'});
    }

    async setCookiesForCustomerErrorInAllowedCustomerType() {
        await setDemoCookie(this.page, 'eapCustomerServiceAddressCheckMock', {allowedCustomerType: 'error', companyOwnedDeviceCase: 'success - ip:10.0.0.1'});
    }


    async setCookiesForCustomerDoesNotHaveAllowedCustomerType() {
        await setDemoCookie(this.page, 'eapCustomerServiceAddressCheckMock', {allowedCustomerType: 'false', companyOwnedDeviceCase: 'success - ip:10.0.0.1'});
    }

    async setCookiesForCustomerHasAllowedCustomerTypeWithDeviceType(deviceType: string) {
        let companyOwnedDeviceCase = 'success - ip:10.0.0.1';
        switch (deviceType) {
            case 'an unassigned':
                companyOwnedDeviceCase = 'unassignedDeviceError - ip:10.0.0.2';
                break;
            case 'an outdated':
                companyOwnedDeviceCase = 'docsisVersionTooLowError - ip:10.0.0.3';
                break;
            case 'a refurbished':
                companyOwnedDeviceCase = 'refurbishedDeviceError - ip:10.0.0.4';
        }
        await setDemoCookie(this.page, 'eapCustomerServiceAddressCheckMock', {allowedCustomerType: 'true', companyOwnedDeviceCase: companyOwnedDeviceCase});
    }

    async setCookiesForVoiceAdapterClientError() {
        await setDemoCookie(this.page, 'eapVoiceAdapterClientMock', {withSipCredentials: 'error'});
    }

    async setCookiesForFailedLegacyLogin() {
        await setDemoCookie(this.page, 'provisioningExecuteMockForEap', {});
        await setDemoCookie(this.page, 'provisioningHsiDataMockForEap', {});
        await setDemoCookie(this.page, 'eapAccountManagementServiceMock', {error: 'ACCOUNT_NOT_FOUND'});
    }


    async setAccountManagementServiceMockWithNoError() {
        await setDemoCookie(this.page, 'eapAccountManagementServiceMock', {error: 'NO_ERROR'});
    }

    async setCookiesForVoiceAdapterClient(credentialsFormat: string, withPasswords: string, numberOfPhoneNumbers: number) {
        let withSipCredentials = '';
        let optionsForSipCredentials = '';
        if (credentialsFormat === 'new') {
            withSipCredentials = 'true - new data format';
        } else if (credentialsFormat === 'old') {
            withSipCredentials = 'true - old data format';
        }
        if(withPasswords === 'with') {
            if(numberOfPhoneNumbers === 1){
                optionsForSipCredentials = 'with password - 1 telephone number';
            } else if (numberOfPhoneNumbers === 10) {
                optionsForSipCredentials = 'with password - 10 telephone numbers';
            }
        } else if (withPasswords === 'without') {
            if(numberOfPhoneNumbers === 1){
                optionsForSipCredentials = 'without password - 1 telephone number';
            } else if (numberOfPhoneNumbers === 10) {
                optionsForSipCredentials = 'without password - 10 telephone numbers';
            }
        }
        await setDemoCookie(this.page, 'eapVoiceAdapterClientMock', {withSipCredentials: withSipCredentials, optionsForSipCredentials: optionsForSipCredentials});
    }

    /**
     * Waits for a new tab to open, switches to it, and verifies the URL contains the expected address.
     * @param expectedAddress The expected path or URL fragment in the new tab
     */
    async shouldBeOnInANewTab(expectedAddress: string): Promise<void> {
        await shouldBeOnInANewTab(this.page, expectedAddress);
    }

    async setCookiesForASuccessfulSolsticeLogin() {
        await this.setOpenIdConnectClientMockCookie('OIDCCode1', 'OIDCState1', 'None');
        await this.setMintClientMockCookie('solsticeCustomerId1,solsticeCustomerId2', 'true', 'None');
        await this.setResetDeviceActivationClientMockCookie('0C:47:3D:19:83:50', '3');
        await this.setCookiesForCustomerToHaveContracts('contractId1,contractId2,contractId3');
    }

    async setCookiesForDeviceActivationWithState(state: string) {
        await setDemoCookie(this.page, 'eapDeviceActivationClientMock', {ActivationState: state});
    }

    async setCookiesForDeviceActivationWithException(pendingOrderException: string) {
        await setDemoCookie(this.page, 'eapDeviceActivationClientMock', {ErrorActivateDevice: pendingOrderException});
    }

    async setCookiesForDeviceActivationWithStateAndNumberOfCredentials(state: string, numberOfSipCredentials: any) {
        if (numberOfSipCredentials === 1 ){
            await setDemoCookie(this.page, 'eapDeviceActivationClientMock', {ActivationState: state, withSipCredentials: 'true - 1 SIP Account'});
        } else if (numberOfSipCredentials === 10 ){
            await setDemoCookie(this.page, 'eapDeviceActivationClientMock', {ActivationState: state, withSipCredentials: 'true - 10 SIP Accounts'});
        } else if (numberOfSipCredentials === 0 ){
            await setDemoCookie(this.page, 'eapDeviceActivationClientMock', {ActivationState: state, withSipCredentials: 'false'});
        }
    }

    async setCookiesForCustomerToHaveContracts(contracts: string) {
        await setDemoCookie(this.page, 'eapDeviceActivationClientMock', {ContractIds: contracts});
    }

    async loginToMeinVodafoneWithUrl() {
        await openPageWithParameters(this.page, '/v2/account', { code: 'OIDCCode1',  state: 'OIDCState1'});
    }

    async setMintClientMockCookie(solsticeCustomerIds: string, isSolsticeCustomer: string = 'true', exception: string = 'None'): Promise<void> {
        await setDemoCookie(this.page, 'eapMintClientMock', {
            isSolsticeCustomer: isSolsticeCustomer,
            solsticeCustomerIds: solsticeCustomerIds,
            Exception: exception
        });
    }

    async setMintClientMockCookieWithoutCustomerIds(){
        await this.setMintClientMockCookie('', 'true', 'None');
    }

    async setMintClientMockCookieWithException(exception: string){
        await this.setMintClientMockCookie('solsticeCustomerId1,solsticeCustomerId2', 'true', exception);
    }

    async setMintClientMockCookieAsNotSolsticeCustomer(){
        await this.setMintClientMockCookie('', 'false', 'None');
    }

    async setMintLogoutMockCookie(): Promise<void> {
        await setDemoCookie(this.page, 'eapMintLogoutMock', {});
    }

    async setOpenIdConnectClientMockCookie(expectedCode: string, expectedState: string, exception: string = 'None'): Promise<void> {
        await setDemoCookie(this.page, 'eapOpenIdConnectClientMock', {expectedCode: expectedCode, expectedState: expectedState, Exception: exception});
    }

    async setResetDeviceActivationClientMockCookie(macAddress: string, docsisVersion: string): Promise<void> {
        await setDemoCookie(this.page, 'eapResourceInventoryManagementClientMock', {macAddress: macAddress, docsisVersion: docsisVersion});
    }

    async loginToMeinVodafoneWithUrlUsingWrongParameters() {
        await openPageWithParameters(this.page, '/v2/account', { code: 'wrongCode',  state: 'wrongState'});
    }

    async loginToMeinVodafoneWithUrlUsingWithoutParameters(): Promise<void> {
        await open(this.page, '/v2/account');
    }

    async setOpenIdConnectClientMockToThrowException(exception: string) {
        await setDemoCookie(this.page, 'eapOpenIdConnectClientMock', {expectedCode: 'OIDCCode1', expectedState: 'OIDCState1', Exception: exception});
    }

    async verifyScreenshot() {
        await expect(this.page).toHaveScreenshot();
    }

}
