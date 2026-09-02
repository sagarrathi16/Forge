import { describe, it, expect } from 'vitest';
import { validateEmail } from '../lib/validation';

describe('Email Validation Unit Tests', () => {
  it('should pass for a standard valid email', () => {
    const result = validateEmail('developer@example.com');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should pass for complex valid emails with subdomains and tags', () => {
    const result = validateEmail('user.name+tag@sub.domain.co');
    expect(result.isValid).toBe(true);
  });

  it('should reject missing/falsy email values', () => {
    // @ts-expect-error testing null input
    const resultNull = validateEmail(null);
    expect(resultNull.isValid).toBe(false);
    expect(resultNull.error).toBe('Email address is required.');
  });

  it('should reject empty strings or strings containing only whitespace', () => {
    const resultEmpty = validateEmail('');
    expect(resultEmpty.isValid).toBe(false);
    expect(resultEmpty.error).toBe('Email address is required.');

    const resultWhitespace = validateEmail('   ');
    expect(resultWhitespace.isValid).toBe(false);
    expect(resultWhitespace.error).toBe('Email address cannot be empty.');
  });

  it('should reject malformed email formats', () => {
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      'email@domain',
    ];

    invalidEmails.forEach((email) => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please enter a valid email address.');
    });
  });

  it('should reject emails that exceed the RFC maximum length (254 chars)', () => {
    const longEmail = `${'a'.repeat(250)}@example.com`;
    const result = validateEmail(longEmail);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Email address is too long.');
  });
});
