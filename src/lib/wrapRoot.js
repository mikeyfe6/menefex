import * as React from "react";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";

import RootElement from "../context/root-element";

if (process.env.NODE_ENV === "development") {
    ContentfulLivePreview.init({
        locale: "nl",
        enableInspectorMode: true,
        enableLiveUpdates: true,
    });
}

export const wrapRoot = ({ element }) => (
    <ContentfulLivePreviewProvider locale="nl">
        <RootElement>{element}</RootElement>
    </ContentfulLivePreviewProvider>
);
