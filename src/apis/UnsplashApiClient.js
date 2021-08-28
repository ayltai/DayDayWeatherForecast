import { handleError, } from '../utils/ErrorHelpers';
import { WebClient, } from '../utils/WebClient';

export const UnsplashApiClient = {};

UnsplashApiClient.getRandomPhoto = async (query, width, height) => {
    try {
        const response = await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_UNSPLASH}/photos/random?client_id=${process.env.REACT_APP_API_KEY_UNSPLASH}`);
        response.urls.regular = response.urls.regular.replace('w=1080', `w=${width}&h=${height}`);
        return response;
    } catch (error) {
        handleError(error);
    }

    return undefined;
};
