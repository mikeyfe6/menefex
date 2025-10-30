import { useEffect, useContext } from "react";

import { useTranslation } from "react-i18next";

import { HydrationContext } from "../context/hydration-context";

const useTranslationSetup = () => {
    const { t, i18n } = useTranslation();
    const { isHydrated } = useContext(HydrationContext);

    useEffect(() => {
        if (isHydrated) {
            const storedLanguage = window.localStorage.getItem("i18nextLng");
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n, isHydrated]);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return { t, isHydrated, i18n };
};

export default useTranslationSetup;
