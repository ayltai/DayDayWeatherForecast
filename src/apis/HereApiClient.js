import { WebClient, } from '../utils/WebClient';

export const HereApiClient = {};

HereApiClient.autocomplete = async (query, locale = 'en-US') => {
    const response = await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_HERE}/v1/autocomplete?apiKey=${process.env.REACT_APP_API_KEY_HERE}&q=${encodeURIComponent(query.replaceAll(' ', '-'))}&lang=${locale}`);

    if (response.items && response.items.length) return response.items.map(item => item.address.label);

    return [];
};

HereApiClient.geocode = async (query, locale = 'en-US') => {
    const response = await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_HERE}/v1/geocode?apiKey=${process.env.REACT_APP_API_KEY_HERE}&q=${encodeURIComponent(query.replaceAll(' ', '-'))}&lang=${locale}`);

    if (response.items && response.items.length) return [ response.items[0].position.lat, response.items[0].position.lng, ];

    return undefined;
};
