import { describe, it, vi, expect, beforeEach } from 'vitest';
import i18n, { setLocale } from '@/i18n';

describe('setLocale', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should sets locale in localStorage and updates i18n locale', () => {
    const setLocaleSpy = vi.spyOn(i18n.global.locale, 'value', 'set');
    setLocale('fr');

    expect(localStorage.getItem('locale')).toBe('fr');
    expect(setLocaleSpy).toHaveBeenCalledWith('fr');
  });
});
