import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import nl from "./nl";
import en from "./en";

// console.log("nl", nl);
// console.log("en", en);

const resources = {
    en: { translation: en || {} },
    nl: { translation: nl || {} },
};

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "nl",
    debug: process.env.NODE_ENV === "development",
    detection: {
        order: ["localStorage", "cookie", "navigator"],
        caches: ["localStorage", "cookie"],
    },
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
    missingKeyHandler: function (lng, ns, key, fallbackValue) {
        console.warn(`Missing translation: ${key} (${lng})`);
    },
});

export default i18n;
