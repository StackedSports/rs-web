import React, { useRef } from 'react'

/**
 * @description
 *  A react hook that invokes a callback when user scrolls to the bottom
 *
 * @param onBottom Required callback that will be invoked when scrolled to bottom
 * @param {number} [offset=0] - Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page
 * @returns {RefObject} ref - If passed to a element as a ref, e.g. a div it will register scrolling to the bottom of that div instead of document viewport
 */
export const useBottomScrollListener = ({ onBottom, offset }) => {

    const containerRef = useRef(null);

    const handleOnScroll = useCallback(() => {
        if (containerRef.current != null) {
            const scrollNode = containerRef.current;
            const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight);
            const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

            if (scrollPosition <= scrollContainerBottomPosition) {
                debouncedOnBottom();
            }
        } else {
            const scrollNode = document.scrollingElement || document.documentElement;
            const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + window.innerHeight);
            const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

            if (scrollPosition <= scrollContainerBottomPosition) {
                debouncedOnBottom();
            }
        }

    }, [offset, onBottom, containerRef.current]);

    return containerRef;
}
