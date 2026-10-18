import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Lang = 'en' | 'es';

const LANG_KEY = '@triage/lang';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY).then((v) => {
      if (v === 'en' || v === 'es') setLangState(v);
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l);
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
