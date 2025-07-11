import * as React from "react";

import { wrapRoot } from "./src/lib/wrapRoot";

export const wrapRootElement = wrapRoot;

const HtmlAttributes = {
    lang: "nl-NL",
    prefix: "og: https://ogp.me/ns#",
};

const HeadComponents = [
    <link
        key="mnfxRss"
        rel="alternate"
        type="application/rss+xml"
        title="Menefex WMB: RSS Feeds"
        href="https://menefex.nl/rss.xml"
    />,
];

export const onRenderBody = ({
    setHeadComponents,
    setHtmlAttributes,
    setBodyAttributes,
}) => {
    setHtmlAttributes(HtmlAttributes);
    setHeadComponents(HeadComponents);
    setBodyAttributes({});
};

export const onPreRenderHTML = ({
    getHeadComponents,
    replaceHeadComponents,
}) => {
    const headComponents = getHeadComponents();
    replaceHeadComponents(headComponents);
};
