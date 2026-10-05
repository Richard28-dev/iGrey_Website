/**
 * Indian Mobile Phone Number Sanitization and Validation Utilities
 * 
 * Rules:
 * - Exactly 10 digits
 * - Must start with 6, 7, 8, or 9
 * - Strips non-digits and common prefixes (+91, 91, 0)
 */

export function sanitizeIndianPhone(raw: string): string {
  if (!raw) return '';

  let val = raw.trim();

  // Strip international +91 prefix if present
  if (val.startsWith('+91')) {
    val = val.slice(3);
  }

  // Strip all non-digit characters (letters, spaces, dashes, symbols)
  let digits = val.replace(/\D/g, '');

  // If 12 digits starting with 91 (e.g. pasted 919876500000), strip 91
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  // If 11 digits starting with 0 (e.g. pasted 09876500000), strip leading 0
  else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  // Fallback for longer pastes with country code
  else if (digits.length > 10) {
    if (digits.startsWith('91')) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }
  }

  // Hard limit of 10 digits
  return digits.slice(0, 10);
}

export function getPhoneValidationError(phone: string): string | null {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return 'Please enter your phone number.';
  }
  if (trimmed.length < 10) {
    return 'Phone number must be 10 digits.';
  }
  if (!/^[6-9]/.test(trimmed)) {
    return 'Enter a valid Indian mobile number.';
  }
  return null;
}

export function isValidIndianPhone(phone: string): boolean {
  return getPhoneValidationError(phone) === null;
}
