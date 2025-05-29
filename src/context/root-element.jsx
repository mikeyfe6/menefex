import * as React from "react";

import { I18nextProvider } from "react-i18next";

import { HydrationProvider } from "./hydration-context";
import i18n from "../i18n/config";

const RootElement = ({ children }) => (
    <HydrationProvider>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </HydrationProvider>
);

export default RootElement;
