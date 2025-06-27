export { wrapRoot as wrapRootElement } from "./src/lib/wrapRoot";

import "./src/styles/resets.scss";

export const onServiceWorkerUpdateReady = () => {
    window.location.reload();
};
