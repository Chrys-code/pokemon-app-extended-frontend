import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export const useTimeout = (
    callback: any,
    delay: number
): {
    reset: () => void;
    clear: () => void;
} => {
    const callbackRef: MutableRefObject<any> = useRef(callback);
    const timeoutRef: MutableRefObject<any> = useRef<number>();

    useEffect((): void => {
        callbackRef.current = callback;
    }, [callback]);

    const set: () => void = useCallback((): void => {
        timeoutRef.current = setTimeout((): any => callbackRef.current(), delay);
    }, [delay]);

    const clear: () => void = useCallback((): void => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    useEffect((): (() => void) => {
        set();
        return clear;
    }, [delay, set, clear]);

    const reset: () => void = useCallback((): void => {
        clear();
        set();
    }, [clear, set]);

    return { reset, clear };
};