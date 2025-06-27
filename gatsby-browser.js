import React from "react";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

import RootElement from "./src/context/root-element";

import "./src/styles/resets.scss";

export const wrapRootElement = ({ element }) => (
    <ContentfulLivePreviewProvider locale="nl-NL">
        <RootElement>{element}</RootElement>
    </ContentfulLivePreviewProvider>
);

export const onServiceWorkerUpdateReady = () => {
    window.location.reload();
};
