import { useCallback, useEffect, useRef, useMemo, RefObject } from 'react';
import { debounce } from 'lodash';

/**
 * @description
 *  A react hook that invokes a callback when user scrolls to the bottom
 *
 * @param onBottom Required callback that will be invoked when scrolled to bottom
 * @param {number} offset - Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page
 * @returns {RefObject} ref - If passed to a element as a ref, e.g. a div it will register scrolling to the bottom of that div instead of document viewport
 */
export const useBottomScrollListener = <T extends HTMLElement>(onBottom: () => void, offset: number = 0): RefObject<T> => {

    const debouncedOnBottom = useCallback(() => debounce(onBottom, 200, { leading: true }), [onBottom]);
    const containerRef = useRef<T>(null);

    const handleOnScroll = useCallback(() => {
        if (containerRef.current != null) {
            const scrollNode: T = containerRef.current;
            const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight);
            const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

            if (scrollPosition <= scrollContainerBottomPosition) {
                debouncedOnBottom();
            }
        } else {
            const scrollNode: Element = document.scrollingElement || document.documentElement;
            const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + window.innerHeight);
            const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

            if (scrollPosition <= scrollContainerBottomPosition) {
                debouncedOnBottom();
            }
        }
    }, [offset, onBottom, containerRef.current]);

    useEffect((): (() => void) => {
        const ref: T | null = containerRef.current;
        if (ref != null) {
            ref.addEventListener('scroll', handleOnScroll);
        } else {
            window.addEventListener('scroll', handleOnScroll);
        }

        return () => {
            if (ref != null) {
                ref.removeEventListener('scroll', handleOnScroll);
            } else {
                window.removeEventListener('scroll', handleOnScroll);
            }
        };
    }, [handleOnScroll, debounce]);

    return containerRef;
}
