// eslint-disable-next-line no-restricted-imports
import en from '../../resources/i18n/en.json';
import { createI18n } from 'vue-i18n';

export type Locale = 'en';

export const LOCALE_STORAGE_KEY = 'locale';

export function calculateCurrentLocale(): Locale {
  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
  if (storedLocale) {
    return storedLocale;
  }

  const browserLocale = navigator.language.slice(0, 2) || navigator.languages?.[ 0 ].slice(0, 2) || 'en';

  localStorage.setItem(LOCALE_STORAGE_KEY, browserLocale);
  return browserLocale as Locale;
}

export function setLocale(locale: string): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  i18n.global.locale.value = calculateCurrentLocale();
}

export const pluralizationRule = (count: number, formCount: number): number => {
  if (formCount === 1) return 0;

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  const isSingular = lastDigit === 1 && lastTwoDigits !== 11;
  const isFew = [2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits);


  if (isSingular) {
    return 0;
  }

  if (isFew) {
    return 1;
  }

  return 2;
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'ru',
  messages: { en },
  pluralRules: {
    ru: pluralizationRule,
  },
});

export default i18n;
