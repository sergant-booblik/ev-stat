import { describe, expect, it } from 'vitest';
import { pluralizationRule } from '@/i18n';

describe('pluralizationRule', () => {
  it('should return 0 when number ends with 1 and not 11', () => {
    expect(pluralizationRule(41, 3)).toBe(0);
  });

  it('should return 1 when number ends with 2, 3, or 4 and not 12, 13, or 14', () => {
    expect(pluralizationRule(42, 3)).toBe(1);
  });

  it('should return 2 when number ends with 11, 12, 13, or 14', () => {
    expect(pluralizationRule(12, 3)).toBe(2);
  });

  it('should return 0 when number is 1', () => {
    expect(pluralizationRule(1, 3)).toBe(0);
  });

  it('should return 1 when number is 2', () => {
    expect(pluralizationRule(2, 3)).toBe(1);
  });

  it('should return 2 when number is 0', () => {
    expect(pluralizationRule(0, 3)).toBe(2);
  });

  it('should return 0 when length is 1 regardless of number', () => {
    expect(pluralizationRule(42, 1)).toBe(0);
  });
});
