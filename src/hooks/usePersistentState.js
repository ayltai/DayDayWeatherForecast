import React from 'react';

import { handleError, } from '../utils/ErrorHelpers';

const STORAGE       = 'storage';
const LOCAL_STORAGE = 'local-storage';

export const usePersistentState = (defaultValue, key) => {
    const getValue = () => {
        if (typeof window === 'undefined') return defaultValue;

        try {
            const item = window.localStorage.getItem(key);
            return item && item !== 'undefined' ? JSON.parse(item) : defaultValue;
        } catch (error) {
            handleError(error);

            return defaultValue;
        }
    };

    const [ storedValue, setStoredValue, ] = React.useState(getValue);

    const setValue = value => {
        try {
            const newValue = value instanceof Function ? value(storedValue) : value;

            window.localStorage.setItem(key, JSON.stringify(newValue));

            setStoredValue(newValue);

            window.dispatchEvent(new Event(LOCAL_STORAGE));
        } catch (error) {
            handleError(error);
        }
    };

    React.useEffect(() => {
        setStoredValue(getValue());
    }, []);

    React.useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(getValue());
        };

        window.addEventListener(STORAGE, handleStorageChange);
        window.addEventListener(LOCAL_STORAGE, handleStorageChange);

        return () => {
            window.removeEventListener(STORAGE, handleStorageChange);
            window.removeEventListener(LOCAL_STORAGE, handleStorageChange);
        };
    }, []);

    return [ storedValue, setValue, ];
};
