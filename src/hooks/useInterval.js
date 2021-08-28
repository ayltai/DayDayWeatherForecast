import React from 'react';

export const useInterval = (callback, milliseconds, ...rest) => {
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [ callback, ]);

    React.useEffect(() => {
        const timer = setInterval(() => savedCallback.current(rest), milliseconds);

        return () => clearInterval(timer);
    }, [ milliseconds, ]);
};
