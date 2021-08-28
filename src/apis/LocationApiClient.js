import { Constants, } from '../Constants';
import { HereApiClient, } from './HereApiClient';

export const LocationApiClient = {};

LocationApiClient.getSuggestions = async (providerId, query, locale) => {
    if (providerId === Constants.LOCATION_PROVIDERS[0].id) return HereApiClient.autocomplete(query, locale);

    throw new Error(`Unrecognized location provider (ID = ${providerId})`);
};

LocationApiClient.getGeocode = async (providerId, query, locale) => {
    if (providerId === Constants.LOCATION_PROVIDERS[0].id) return HereApiClient.geocode(query, locale);

    throw new Error(`Unrecognized location provider (ID = ${providerId})`);
};
