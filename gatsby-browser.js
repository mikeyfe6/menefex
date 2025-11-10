export { wrapRoot as wrapRootElement } from "./src/lib/wrapRoot";

import "./src/styles/resets.scss";

export const onServiceWorkerUpdateReady = () => {
    window.location.reload();
};

export const shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    // Allow default behavior for hash links
    if (location.hash) {
        return false; // Let browser handle anchor scrolling
    }
    
    // Restore scroll position on back/forward navigation
    const savedPosition = getSavedScrollPosition(location);
    return savedPosition || [0, 0];
};
