import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko.json';
import en from './locales/en.json';
import zh from './locales/zh.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import tl from './locales/tl.json';

const resources = {
  ko: { translation: ko },
  en: { translation: en },
  zh: { translation: zh },
  es: { translation: es },
  pt: { translation: pt },
  tl: { translation: tl }
};

const supportedLanguages = ['ko', 'en', 'zh', 'es', 'pt', 'tl'];

// 브라우저 저장소 및 locale 감지를 통한 초기 언어 설정
const getInitialLanguage = () => {
  try {
    const savedLang = localStorage.getItem('user_lang');
    if (savedLang) {
      const primarySaved = savedLang.split('-')[0].toLowerCase();
      if (supportedLanguages.includes(primarySaved)) {
        return primarySaved;
      }
    }
  } catch (e) {
    console.warn('Failed to read language preference from localStorage:', e);
  }

  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  const primaryLang = browserLang.split('-')[0];
  return supportedLanguages.includes(primaryLang) ? primaryLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // 리액트는 이미 xss 방지를 하므로 false 설정
    }
  });

// 사용자가 언어를 변경할 때마다 localStorage에 자동 영구 저장
i18n.on('languageChanged', (lng) => {
  try {
    if (lng) {
      const primary = lng.split('-')[0].toLowerCase();
      localStorage.setItem('user_lang', primary);
    }
  } catch (e) {
    console.warn('Failed to save language preference to localStorage:', e);
  }
});

export default i18n;
