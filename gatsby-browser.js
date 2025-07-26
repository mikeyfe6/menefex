export { wrapRoot as wrapRootElement } from "./src/lib/wrapRoot";

import "./src/styles/resets.scss";

export const onServiceWorkerUpdateReady = () => {
    window.location.reload();
};

export const onRouteUpdate = () => {
    window.scrollTo(0, 0);
};

export const shouldUpdateScroll = () => {
    return false;
};
