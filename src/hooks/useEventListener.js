import React from 'react';

export const useEventListener = (eventName, handler, element) => {
    const savedHandler = React.useRef();

    React.useEffect(() => {
        const targetElement = element?.current || window;
        if (targetElement && targetElement.addEventListener) {
            if (savedHandler.current !== handler) savedHandler.current = handler;

            const eventListener = event => {
                if (!!savedHandler?.current) savedHandler.current(event);
            };

            targetElement.addEventListener(eventName, eventListener);

            return () => {
                targetElement.removeEventListener(eventName, eventListener);
            };
        }
    }, [ eventName, handler, element, ]);
};
