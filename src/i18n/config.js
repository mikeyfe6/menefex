import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import nl from "./nl";
import en from "./en";

const resources = {
    en: { translation: en || {} },
    nl: { translation: nl || {} },
};

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "nl",
        debug: true,
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
