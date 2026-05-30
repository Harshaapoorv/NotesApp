// shared/validators/validators.js

// =========================
// EMAIL
// =========================

export const normalizeEmail = email => {
  return email.trim().toLowerCase();
};

export const isValidEmail = email => {
  const normalizedEmail = normalizeEmail(email);

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
};

// =========================
// FULL NAME
// =========================

export const isValidFullName = fullName => {
  return fullName.trim().length >= 2;
};

// =========================
// PASSWORD RULES
// =========================

export const passwordRules = {
  minLength: password => password.length >= 8,

  uppercase: password => /[A-Z]/.test(password),

  lowercase: password => /[a-z]/.test(password),

  number: password => /\d/.test(password),

  specialCharacter: password => /[^A-Za-z0-9]/.test(password),
};

// =========================
// PASSWORD CHECKS
// =========================

export const getPasswordChecks = password => {
  return {
    minLength: passwordRules.minLength(password),

    uppercase: passwordRules.uppercase(password),

    lowercase: passwordRules.lowercase(password),

    number: passwordRules.number(password),

    specialCharacter: passwordRules.specialCharacter(password),
  };
};

// =========================
// PASSWORD VALIDITY
// =========================

export const isValidPassword = password => {
  const checks = getPasswordChecks(password);

  return Object.values(checks).every(Boolean);
};

// =========================
// CONFIRM PASSWORD
// =========================

export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};
