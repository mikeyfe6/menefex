import React from "react";

import RootElement from "./src/context/root-element";

import "./src/styles/resets.scss";

export const wrapRootElement = ({ element }) => {
    return <RootElement>{element}</RootElement>;
};

export const onServiceWorkerUpdateReady = () => {
    window.location.reload();
};
