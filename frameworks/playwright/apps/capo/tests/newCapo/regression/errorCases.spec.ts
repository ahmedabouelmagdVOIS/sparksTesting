import {test} from '@playwright/test';
import {POManager} from '../../../pages/POManager';

let poManager: POManager;
let serverUuid: string;

test.describe('Errors while parsing the headers', () => {

    test.beforeEach(async ({page}) => {
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

    // Errors while parsing the headers
    const headerCases = [
        {
            description: 'ERR_H101: a mandatory header is missing',
            network: null,
            expectedErrorCode: 'ERR_H101',
        },
        {
            description: 'ERR_H102: a header contains an invalid value',
            network: 'WRONG',
            expectedErrorCode: 'ERR_H102',
        },
    ];
    for (const {description, network, expectedErrorCode} of headerCases) {
        test(description, async () => {
            await poManager.setHeaders({
                'x-cpe-ip': 'IP_activation_success',
                'x-network': network,
                'x-use-case': 'ProviderChange',
                'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
            });
            await poManager.openCapo();
            await poManager.getNewLandingPageErrorPage().assertError(expectedErrorCode);
        });
    }

    // Errors while loading the customer
    const customerCases = [
        {description: 'ERR_L101: no contract id returned', ip: 'IP_no_contract_id', expectedErrorCode: 'ERR_L101'},
        {
            description: 'ERR_L102: customer state is not supporting early activation',
            ip: 'IP_ineligible',
            expectedErrorCode: 'ERR_L102'
        },
        {description: 'ERR_L103: DXL returns 400', ip: 'IP_bad_request', expectedErrorCode: 'ERR_L103'},
        {description: 'ERR_L104: DXL returns 404', ip: 'IP_network_error', expectedErrorCode: 'ERR_L104'},
        {description: 'ERR_L105: DXL returns 500', ip: 'IP_DXL_error', expectedErrorCode: 'ERR_L105'},
        {
            description: 'ERR_L106: DXL returns unexpected code',
            ip: 'IP_DXL_landing_unexpected_response',
            expectedErrorCode: 'ERR_L106'
        },
    ];
    for (const {description, ip, expectedErrorCode} of customerCases) {
        test(description, async () => {
            const headers = {
                'x-cpe-ip': ip,
                'x-network': 'VKD',
                'x-use-case': 'ProviderChange',
                'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
            };
            await poManager.setHeaders(headers);
            await poManager.openCapo();
            await poManager.getNewLandingPageErrorPage().assertError(expectedErrorCode);
        });
    }

    // Errors while activating the contract
    const activationCases = [
        {description: 'ERR_A101: DXL returns 400', ip: 'IP_activation_bad_request', expectedErrorCode: 'ERR_A101'},
        {
            description: 'ERR_A102: DXL returns 404',
            ip: 'IP_activation_network_error',
            expectedErrorCode: 'ERR_A102'
        },
        {description: 'ERR_A103: DXL returns 500', ip: 'IP_activation_error', expectedErrorCode: 'ERR_A103'},
        {
            description: 'ERR_A104: DXL returns unexpected code',
            ip: 'IP_activation_unexpected_error',
            expectedErrorCode: 'ERR_A104'
        },
    ];
    for (const {description, ip, expectedErrorCode} of activationCases) {
        test(description, async () => {
            const headers = {
                'x-cpe-ip': ip,
                'x-network': 'VKD',
                'x-use-case': 'ProviderChange',
                'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
            };
            await poManager.setHeaders(headers);
            await poManager.openCapo();
            await poManager.getNewLandingPage().earlyActivate();
            await poManager.getNewActivationErrorPage().assertError(expectedErrorCode);
        });
    }

    // Bad requests
    test('ERR_X101: show custom error page if DXL Oauth fails', async () => {
        await poManager.uploadDxlOathFailMock();
        await poManager.assertSuccessfulAssetRequests();
        const headers = {
            'x-cpe-ip': 'IP_activation_success',
            'x-network': 'VKD',
            'x-use-case': 'ProviderChange',
            'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
        };
        await poManager.setHeaders(headers);
        await poManager.openCapo();
        await poManager.getNewLandingPageErrorPage().assertError('ERR_X101');
    });

    test('ERR_X103: show custom error page without authorization', async () => {
        const headers = {
            'x-cpe-ip': 'IP_activation_success',
            'x-network': 'VKD',
            'x-use-case': 'ProviderChange',
            'Authorization': 'WRONG'
        };
        await poManager.setHeaders(headers);
        await poManager.openCapo();
        await poManager.getNewLandingPageErrorPage().assertError('ERR_X103');
    });

    test('ERR_X104: shows the custom error page for a nonexisting path', async () => {
        const headers = {
            'x-cpe-ip': 'IP_activation_success',
            'x-network': 'VKD',
            'x-use-case': 'ProviderChange',
            'Authorization': 'Basic ZHVtbXk6ZHVtbXk='
        };
        await poManager.setHeaders(headers);
        await poManager.open('/idontexist');
        await poManager.getNewLandingPageErrorPage().assertError('ERR_X104');
    });

    test('ERR_X105: responds with 405 for wrong method', async () => {
        const headers = {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const properties = {
            errorMessage: 'Request could not be completed',
            errorCode: 'ERR_X105'
        };
        await poManager.assertApiResponse('/api/activate', 'GET', headers, 405, properties, null);
    });

});
