import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { calculateCurrentLocale, LOCALE_STORAGE_KEY } from '@/i18n';

describe('calculateCurrentLocale', () => {
  const originalLanguage = navigator.language;

  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-EN',
      configurable: true, // Обязательно
    });
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, 'language', {
      value: originalLanguage,
      configurable: true,
    });
  });

  it('should return locale from localStorage if it exists', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en');
    const locale = calculateCurrentLocale();
    expect(locale).toBe('en');
  });

  it('should return the browser language if localStorage does not contain a locale', () => {
    const locale = calculateCurrentLocale();
    expect(locale).toBe('en');
  });

  it('should default to "en" if no locale is found in localStorage or navigator', () => {
    localStorage.clear();
    const locale = calculateCurrentLocale();
    expect(locale).toBe('en');
  });

  it('should save the determined locale in localStorage', () => {
    localStorage.clear();
    calculateCurrentLocale();
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');
  });
});
