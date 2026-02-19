import { readJsonFileAsString, replaceKeys} from './jsonHelpers';

export async function uploadExpectations(expectationsPath: string, mockserverBaseUrl: string, authorization: string, changes?: Record<string, string | number | null> | null): Promise<Response> {
    const expectationsString = await readJsonFileAsString(expectationsPath);
    const editedExpectationsString = replaceKeys(expectationsString, changes);
    const editedExpectationsJSON = JSON.parse(editedExpectationsString);
    return fetch(`${mockserverBaseUrl}/mockserver/expectation`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedExpectationsJSON)
    });
}

export async function clearExpectations(mockserverBaseUrl:string, authorization: string, pathMatcher: string): Promise<Response> {
    const body = {
        httpRequest: {
            path: `.*${pathMatcher}.*`
        },
        type: 'EXPECTATION'
    };
    return fetch(`${mockserverBaseUrl}/mockserver/clear`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}