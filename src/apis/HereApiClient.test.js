'use strict';

const { WebClient, } = require('../utils/WebClient');
jest.mock('../utils/WebClient');

const { HereApiClient, } = require('./HereApiClient');

const locale = 'en-US';

const geocodeResponse = {
    'items' : [
        {
            'title'           : '5 Rue Daunou, 75002 Paris, France',
            'id'              : 'here:af:streetsection:bI4Le6cyA.1mlQyLunYpjC:CggIBCCi-9SPARABGgE1KGQ',
            'resultType'      : 'houseNumber',
            'houseNumberType' : 'PA',
            'address'         : {
                'label'       : '5 Rue Daunou, 75002 Paris, France',
                'countryCode' : 'FRA',
                'countryName' : 'France',
                'stateCode'   : 'IDF',
                'state'       : 'Île-de-France',
                'county'      : 'Paris',
                'city'        : 'Paris',
                'district'    : '2e Arrondissement',
                'street'      : 'Rue Daunou',
                'postalCode'  : '75002',
                'houseNumber' : '5'
            },
            'position'        : {
                'lat' : 48.86926,
                'lng' : 2.3321
            },
            'access'          : [
                {
                    'lat' : 48.86931,
                    'lng' : 2.33215
                }
            ],
            'mapView'         : {
                'west'  : 2.33073,
                'south' : 48.86836,
                'east'  : 2.33347,
                'north' : 48.87016
            },
            'scoring'         : {
                'queryScore' : 0.97,
                'fieldScore' : {
                    'country'     : 1,
                    'city'        : 1,
                    'streets'     : [
                        1
                    ],
                    'houseNumber' : 1,
                    'postalCode'  : 0.82
                }
            }
        }
    ]
};

const autocompleteResponse = {
    'items' : [
        {
            'title'           : 'Deutschland, 60486, Frankfurt am Main, Pariser Straße 2',
            'id'              : 'here:af:streetsection:A2eGBPgL70TOTtA85fTiEB:CggIBCDg0K_aAhABGgEy',
            'resultType'      : 'houseNumber',
            'houseNumberType' : 'PA',
            'address'         : {
                'label'       : 'Pariser Straße 2, 60486 Frankfurt am Main, Deutschland',
                'countryCode' : 'DEU',
                'countryName' : 'Deutschland',
                'stateCode'   : 'HE',
                'state'       : 'Hessen',
                'countyCode'  : 'F',
                'county'      : 'Frankfurt am Main',
                'city'        : 'Frankfurt am Main',
                'district'    : 'Gallus',
                'street'      : 'Pariser Straße',
                'postalCode'  : '60486',
                'houseNumber' : '2'
            },
            'highlights'      : {
                'title'   : [
                    {
                        'start' : 20,
                        'end'   : 25
                    },
                    {
                        'start' : 39,
                        'end'   : 46
                    },
                    {
                        'start' : 54,
                        'end'   : 55
                    }
                ],
                'address' : {
                    'label'       : [
                        {
                            'start' : 0,
                            'end'   : 7
                        },
                        {
                            'start' : 15,
                            'end'   : 16
                        },
                        {
                            'start' : 24,
                            'end'   : 29
                        }
                    ],
                    'city'        : [
                        {
                            'start' : 0,
                            'end'   : 5
                        }
                    ],
                    'street'      : [
                        {
                            'start' : 0,
                            'end'   : 7
                        }
                    ],
                    'houseNumber' : [
                        {
                            'start' : 0,
                            'end'   : 1
                        }
                    ]
                }
            }
        },
        {
            'title'      : 'Deutschland, Frankenthal (Pfalz), Pariser Weg',
            'id'         : 'here:af:streetsection:CUcedHTrEUhmgRAcm.mbnD',
            'resultType' : 'street',
            'address'    : {
                'label'       : 'Pariser Weg, 67227 Frankenthal (Pfalz), Deutschland',
                'countryCode' : 'DEU',
                'countryName' : 'Deutschland',
                'stateCode'   : 'RP',
                'state'       : 'Rheinland-Pfalz',
                'countyCode'  : 'FT',
                'county'      : 'Frankenthal (Pfalz)',
                'city'        : 'Frankenthal (Pfalz)',
                'district'    : 'Frankenthal (Pfalz)',
                'street'      : 'Pariser Weg',
                'postalCode'  : '67227'
            },
            'highlights' : {
                'title'   : [
                    {
                        'start' : 13,
                        'end'   : 18
                    },
                    {
                        'start' : 34,
                        'end'   : 41
                    }
                ],
                'address' : {
                    'label'  : [
                        {
                            'start' : 0,
                            'end'   : 7
                        },
                        {
                            'start' : 19,
                            'end'   : 24
                        }
                    ],
                    'city'   : [
                        {
                            'start' : 0,
                            'end'   : 5
                        }
                    ],
                    'street' : [
                        {
                            'start' : 0,
                            'end'   : 7
                        }
                    ]
                }
            }
        }
    ]
};

describe('HereApiClient', () => {
    it('returns suggestions from partial location address', async () => {
        const address = 'Pariser 2 Frank';

        WebClient.get = jest.fn(async () => Promise.resolve(autocompleteResponse));

        const suggestions = await HereApiClient.autocomplete(address, locale);

        expect(suggestions.length).toEqual(2);
        expect(suggestions[0]).toEqual('Pariser Straße 2, 60486 Frankfurt am Main, Deutschland');
    });

    it('resolves location address to geocode', async () => {
        const address = '5 Rue Daunou, 75000 Paris, France';

        WebClient.get = jest.fn(async () => Promise.resolve(geocodeResponse));

        const [ lat, lng, ] = await HereApiClient.geocode(address, locale);

        expect(lat).toEqual(48.86926);
        expect(lng).toEqual(2.3321);
    });
});
