import React from "react";

import RootElement from "./src/components/root-element";

const HtmlAttributes = {
    lang: "nl",
};

const HeadComponents = [
    <link
        key="mnfxRss"
        rel="alternate"
        type="application/rss+xml"
        title="Menefex WMB: RSS Feeds"
        href="https://menefex.nl/rss.xml"
    />,
    <script key="mnfxDefer" defer={false} />,
];

const BodyAttributes = {
    // 'data-theme': 'dark',
};

export const onRenderBody = ({
    setHeadComponents,
    setHtmlAttributes,
    setBodyAttributes,
}) => {
    setHtmlAttributes(HtmlAttributes);
    setHeadComponents(HeadComponents);
    setBodyAttributes(BodyAttributes);
};

export const onPreRenderHTML = ({
    getHeadComponents,
    replaceHeadComponents,
}) => {
    const headComponents = getHeadComponents();
    replaceHeadComponents(headComponents);
};

export const wrapRootElement = ({ element }) => {
    return <RootElement>{element}</RootElement>;
};
