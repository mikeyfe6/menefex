import { useEffect, useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { HydrationContext } from '../context/hydration-context';

const useTranslationSetup = () => {
  const { t, i18n } = useTranslation();
  const { isHydrated } = useContext(HydrationContext);

  useEffect(() => {
    if (isHydrated) {
      const storedLanguage = window.localStorage.getItem('i18nextLng') || 'nl';
      console.log('Stored Language:', storedLanguage);
      i18n.changeLanguage(storedLanguage);
    } else {
      console.log('Not hydrated, setting language to nl');
      i18n.changeLanguage('nl');
    }
  }, [i18n, isHydrated]);

  return { t, isHydrated, i18n };
};

export default useTranslationSetup;
