import { handleError, } from './ErrorHelpers';

export const WebClient = {};

WebClient.get = async url => {
    try {
        const response = await fetch(url, {
            headers : {
                'Accept' : 'application/json',
            },
        });

        if (response.status >= 200 && response.status < 300) return response.json();

        const error = new Error(`Received HTTP ${response.status} for URL ${url}`);
        handleError(error);
    } catch (error) {
        handleError(error);
    }
};
