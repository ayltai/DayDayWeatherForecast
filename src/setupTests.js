import '@testing-library/jest-dom/extend-expect';

require('jest-fetch-mock').enableMocks();

jest.mock('react-i18next', () => ({
    useTranslation  : () => ({
        t : key => key,
    }),
    withTranslation : () => Component => Component,
}));
