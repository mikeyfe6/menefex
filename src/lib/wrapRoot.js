import * as React from "react";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

import RootElement from "../context/root-element";

export const wrapRoot = ({ element }) => (
    <ContentfulLivePreviewProvider
        locale="nl"
        enableInspectorMode={true}
        enableLiveUpdates={true}
        debugMode={process.env.NODE_ENV === "development"}
    >
        <RootElement>{element}</RootElement>
    </ContentfulLivePreviewProvider>
);
