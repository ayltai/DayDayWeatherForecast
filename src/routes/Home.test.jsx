import React from 'react';
import { MemoryRouter, } from 'react-router-dom';

import { render, screen, } from '../utils/TestHelpers';
import { Home, } from './Home';

const responseOpenWeatherMap = {
    'current'         : {
        'dt'         : 1600682660,
        'sunrise'    : 1600639967,
        'sunset'     : 1600683726,
        'temp'       : 28.01,
        'feels_like' : 28.45,
        'pressure'   : 1009,
        'humidity'   : 79,
        'dew_point'  : 24.03,
        'uvi'        : 10.64,
        'clouds'     : 40,
        'visibility' : 10000,
        'wind_speed' : 7.7,
        'wind_deg'   : 100,
        'weather'    : [
            {
                'id'          : 500,
                'main'        : 'Rain',
                'description' : 'light rain',
                'icon'        : '10d',
            },
        ],
        'rain'       : {
            '1h' : 0.26,
        }
    },
    'hourly'          : [
        {
            'dt'         : 1600682400,
            'temp'       : 28.01,
            'feels_like' : 28.87,
            'pressure'   : 1009,
            'humidity'   : 79,
            'dew_point'  : 24.03,
            'clouds'     : 40,
            'visibility' : 10000,
            'wind_speed' : 7.1,
            'wind_deg'   : 124,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10d',
                },
            ],
            'pop'        : 0.53,
            'rain'       : {
                '1h' : 0.37,
            },
        }, {
            'dt'         : 1600686000,
            'temp'       : 28.16,
            'feels_like' : 29.12,
            'pressure'   : 1009,
            'humidity'   : 80,
            'dew_point'  : 24.38,
            'clouds'     : 69,
            'visibility' : 10000,
            'wind_speed' : 7.25,
            'wind_deg'   : 118,
            'weather'    : [
                {
                    'id'          : 803,
                    'main'        : 'Clouds',
                    'description' : 'broken clouds',
                    'icon'        : '04n',
                },
            ],
            'pop'        : 0.77
        }, {
            'dt'         : 1600689600,
            'temp'       : 28.15,
            'feels_like' : 29.22,
            'pressure'   : 1010,
            'humidity'   : 82,
            'dew_point'  : 24.78,
            'clouds'     : 87,
            'visibility' : 10000,
            'wind_speed' : 7.45,
            'wind_deg'   : 118,
            'weather'    : [
                {
                    'id'          : 804,
                    'main'        : 'Clouds',
                    'description' : 'overcast clouds',
                    'icon'        : '04n',
                },
            ],
            'pop'        : 0.8,
        }, {
            'dt'         : 1600693200,
            'temp'       : 28.23,
            'feels_like' : 29.3,
            'pressure'   : 1011,
            'humidity'   : 81,
            'dew_point'  : 24.66,
            'clouds'     : 96,
            'visibility' : 10000,
            'wind_speed' : 7.34,
            'wind_deg'   : 116,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10n',
                },
            ],
            'pop'        : 0.66,
            'rain'       : {
                '1h' : 0.3,
            },
        }, {
            'dt'         : 1600696800,
            'temp'       : 28.18,
            'feels_like' : 29.19,
            'pressure'   : 1012,
            'humidity'   : 81,
            'dew_point'  : 24.61,
            'clouds'     : 100,
            'visibility' : 10000,
            'wind_speed' : 7.38,
            'wind_deg'   : 112,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10n',
                },
            ],
            'pop'        : 0.7,
            'rain'       : {
                '1h' : 0.71,
            },
        }, {
            'dt'         : 1600700400,
            'temp'       : 28.13,
            'feels_like' : 29.03,
            'pressure'   : 1012,
            'humidity'   : 81,
            'dew_point'  : 24.68,
            'clouds'     : 100,
            'visibility' : 10000,
            'wind_speed' : 7.5,
            'wind_deg'   : 110,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10n',
                },
            ],
            'pop'        : 0.7,
            'rain'       : {
                '1h' : 0.84,
            },
        }, {
            'dt'         : 1600704000,
            'temp'       : 28.05,
            'feels_like' : 28.92,
            'pressure'   : 1012,
            'humidity'   : 81,
            'dew_point'  : 24.58,
            'clouds'     : 100,
            'visibility' : 10000,
            'wind_speed' : 7.47,
            'wind_deg'   : 108,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10n',
                },
            ],
            'pop'        : 0.7,
            'rain'       : {
                '1h' : 0.75,
            },
        }, {
            'dt'         : 1600707600,
            'temp'       : 27.87,
            'feels_like' : 28.65,
            'pressure'   : 1011,
            'humidity'   : 81,
            'dew_point'  : 24.51,
            'clouds'     : 100,
            'visibility' : 10000,
            'wind_speed' : 7.45,
            'wind_deg'   : 104,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10n',
                },
            ],
            'pop'        : 0.71,
            'rain'       : {
                '1h' : 0.73,
            },
        }, {
            'dt'         : 1600711200,
            'temp'       : 27.61,
            'feels_like' : 28.31,
            'pressure'   : 1011,
            'humidity'   : 82,
            'dew_point'  : 24.45,
            'clouds'     : 100,
            'visibility' : 10000,
            'wind_speed' : 7.52,
            'wind_deg'   : 102,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10n',
                },
            ],
            'pop'        : 0.66,
            'rain'       : {
                '1h' : 0.58,
            },
        }, {
            'dt'         : 1600714800,
            'temp'       : 27.55,
            'feels_like' : 28.13,
            'pressure'   : 1010,
            'humidity'   : 82,
            'dew_point'  : 24.37,
            'clouds'     : 96,
            'visibility' : 10000,
            'wind_speed' : 7.64,
            'wind_deg'   : 98,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10n',
                },
            ],
            'pop'        : 0.35,
            'rain'       : {
                '1h' : 0.11,
            },
        },
    ],
    'daily'           : [
        {
            'dt'         : 1600660800,
            'sunrise'    : 1600639967,
            'sunset'     : 1600683726,
            'temp'       : {
                'day'   : 29.02,
                'min'   : 28.01,
                'max'   : 29.02,
                'night' : 28.1,
                'eve'   : 28.01,
                'morn'  : 28.51,
            },
            'feels_like' : {
                'day'   : 30.66,
                'night' : 28.98,
                'eve'   : 28.75,
                'morn'  : 30.88,
            },
            'pressure'   : 1012,
            'humidity'   : 76,
            'dew_point'  : 24.53,
            'wind_speed' : 6.26,
            'wind_deg'   : 105,
            'weather'    : [
                {
                    'id'          : 501,
                    'main'        : 'Rain',
                    'description' : 'moderate rain',
                    'icon'        : '10d',
                },
            ],
            'clouds'     : 97,
            'pop'        : 0.93,
            'rain'       : 5.21,
            'uvi'        : 10.64,
        }, {
            'dt'         : 1600747200,
            'sunrise'    : 1600726383,
            'sunset'     : 1600770065,
            'temp'       : {
                'day'   : 28.25,
                'min'   : 27.58,
                'max'   : 28.25,
                'night' : 27.73,
                'eve'   : 27.81,
                'morn'  : 27.61,
            },
            'feels_like' : {
                'day'   : 28.47,
                'night' : 28.45,
                'eve'   : 27.81,
                'morn'  : 27.68,
            },
            'pressure'   : 1011,
            'humidity'   : 76,
            'dew_point'  : 23.82,
            'wind_speed' : 7.67,
            'wind_deg'   : 99,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10d',
                },
            ],
            'clouds'     : 76,
            'pop'        : 0.66,
            'rain'       : 2.23,
            'uvi'        : 11.31,
        }, {
            'dt'         : 1600833600,
            'sunrise'    : 1600812799,
            'sunset'     : 1600856405,
            'temp'       : {
                'day'   : 28.06,
                'min'   : 27.44,
                'max'   : 28.34,
                'night' : 27.63,
                'eve'   : 28.07,
                'morn'  : 27.44,
            },
            'feels_like' : {
                'day'   : 28.37,
                'night' : 29.25,
                'eve'   : 28.71,
                'morn'  : 27.96,
            },
            'pressure'   : 1011,
            'humidity'   : 75,
            'dew_point'  : 23.42,
            'wind_speed' : 7.21,
            'wind_deg'   : 99,
            'weather'    : [
                {
                    'id'          : 804,
                    'main'        : 'Clouds',
                    'description' : 'overcast clouds',
                    'icon'        : '04d',
                },
            ],
            'clouds'     : 95,
            'pop'        : 0.26,
            'uvi'        : 12.76,
        }, {
            'dt'         : 1600920000,
            'sunrise'    : 1600899216,
            'sunset'     : 1600942745,
            'temp'       : {
                'day'   : 28.08,
                'min'   : 27.45,
                'max'   : 28.38,
                'night' : 27.57,
                'eve'   : 28.31,
                'morn'  : 27.51,
            },
            'feels_like' : {
                'day'   : 31.15,
                'night' : 29.3,
                'eve'   : 31.17,
                'morn'  : 29.97,
            },
            'pressure'   : 1012,
            'humidity'   : 76,
            'dew_point'  : 23.6,
            'wind_speed' : 3.46,
            'wind_deg'   : 89,
            'weather'    : [
                {
                    'id'          : 502,
                    'main'        : 'Rain',
                    'description' : 'heavy intensity rain',
                    'icon'        : '10d',
                },
            ],
            'clouds'     : 99,
            'pop'        : 0.86,
            'rain'       : 13.96,
            'uvi'        : 11.28,
        }, {
            'dt'         : 1601006400,
            'sunrise'    : 1600985633,
            'sunset'     : 1601029085,
            'temp'       : {
                'day'   : 27.43,
                'min'   : 26.53,
                'max'   : 27.65,
                'night' : 27.21,
                'eve'   : 27.61,
                'morn'  : 26.53,
            },
            'feels_like' : {
                'day'   : 29.5,
                'night' : 26.49,
                'eve'   : 27.63,
                'morn'  : 28.88,
            },
            'pressure'   : 1011,
            'humidity'   : 74,
            'dew_point'  : 22.42,
            'wind_speed' : 4.05,
            'wind_deg'   : 94,
            'weather'    : [
                {
                    'id'          : 501,
                    'main'        : 'Rain',
                    'description' : 'moderate rain',
                    'icon'        : '10d',
                },
            ],
            'clouds'     : 100,
            'pop'        : 0.87,
            'rain'       : 3.41,
            'uvi'        : 11.27,
        },
    ]
};

const responseUnsplash = {
    'urls'                     : {
        'raw'     : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'full'    : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'regular' : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'small'   : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'thumb'   : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'custom'  : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&h=822&w=320&fit=crop&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
    },
    'links'                    : {
        'self'              : 'https://api.unsplash.com/photos/3hlQ2ty9kUY',
        'html'              : 'https://unsplash.com/photos/3hlQ2ty9kUY',
        'download'          : 'https://unsplash.com/photos/3hlQ2ty9kUY/download',
        'download_location' : 'https://api.unsplash.com/photos/3hlQ2ty9kUY/download',
    },
    'user'                     : {
        'id'                 : '-ne6m-L6lDs',
        'updated_at'         : '2020-04-08T18:42:30-04:00',
        'username'           : 'karishea',
        'name'               : 'Kari Shea',
        'first_name'         : 'Kari',
        'last_name'          : 'Shea',
        'twitter_username'   : 'karishea',
        'portfolio_url'      : 'https://www.karisheacreative.com/',
        'bio'                : 'graphic designer  (full time)  \u2014  photographer  (just for fun)  \u2014  instagram: KariShea              contribute to my house plant addiction   \u2014  paypal.me/KariShea                                         ',
        'location'           : 'Grand Rapids, MI',
        'links'              : {
            'self'      : 'https://api.unsplash.com/users/karishea',
            'html'      : 'https://unsplash.com/@karishea',
            'photos'    : 'https://api.unsplash.com/users/karishea/photos',
            'likes'     : 'https://api.unsplash.com/users/karishea/likes',
            'portfolio' : 'https://api.unsplash.com/users/karishea/portfolio',
            'following' : 'https://api.unsplash.com/users/karishea/following',
            'followers' : 'https://api.unsplash.com/users/karishea/followers',
        },
        'profile_image'      : {
            'small'  : 'https://images.unsplash.com/profile-1586385748806-c32f0b9dc735image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
            'medium' : 'https://images.unsplash.com/profile-1586385748806-c32f0b9dc735image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
            'large'  : 'https://images.unsplash.com/profile-1586385748806-c32f0b9dc735image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
        },
        'instagram_username' : 'karishea',
        'total_collections'  : 49,
        'total_likes'        : 314,
        'total_photos'       : 81,
        'accepted_tos'       : true,
    },
};

const component = (
    <MemoryRouter>
        <Home />
    </MemoryRouter>
);

beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse((request) => {
        if (request.url.startsWith(process.env.REACT_APP_API_ENDPOINT_OPENWEATHERMAP)) return Promise.resolve({
            status  : 200,
            headers : {
                'Content-Type' : 'application/json',
            },
            body    : JSON.stringify(responseOpenWeatherMap),
        });

        if (request.url.startsWith(process.env.REACT_APP_API_ENDPOINT_UNSPLASH)) return Promise.resolve({
            status  : 200,
            headers : {
                'Content-Type' : 'application/json',
            },
            body    : JSON.stringify(responseUnsplash),
        });
    });
});

describe('<Home />', () => {
    it('renders correctly', () => {
        render(component);

        expect(screen.getAllByRole('button').length).toBe(3);
    });
});
