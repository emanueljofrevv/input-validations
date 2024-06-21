const { Blob } = require("buffer");

/* -------------------------------------------------------------------------- */
/*                           LOCAL PART VALIDATIONS                           */
/* -------------------------------------------------------------------------- */

// Helper functions
function isNotEmpty(localPart) {
  return localPart.length > 0;
}

function hasValidLength(localPart) {
  return new Blob([localPart]).size >= 1 && new Blob([localPart]).size <= 64;
}

function hasNoConsecutiveDots(localPart) {
  return !localPart.includes("..");
}

function doesNotStartOrEndWithDot(localPart) {
  return !localPart.startsWith(".") && !localPart.endsWith(".");
}

function hasValidCharacters(localPart) {
  return /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+$/.test(localPart);
}

function doesNotStartWith(localPart) {
  return !/^[-_+]/.test(localPart);
}

function doesNotEndWithPlus(localPart) {
  return !/\+$/.test(localPart);
}

function hasNoDisallowedCharacters(localPart) {
  return !/[|<>]/.test(localPart);
}

// Main validation function using functional composition
function validateLocalPart(localPart) {
  const validations = [
    isNotEmpty,
    hasValidLength,
    hasValidCharacters,
    hasNoConsecutiveDots,
    doesNotStartOrEndWithDot,
    doesNotStartWith,
    doesNotEndWithPlus,
    hasNoDisallowedCharacters,
  ];

  return validations.every((validation) => validation(localPart));
}

/* -------------------------------------------------------------------------- */
/*                           DOMAIN PART VALIDATIONS                          */
/* -------------------------------------------------------------------------- */

function isValidOverallLength(domain) {
  return new Blob([domain]).size <= 253;
}

function hasValidLabels(domain) {
  const labels = domain.split(".");
  return labels.every(
    (label) =>
      new Blob([label]).size <= 63 &&
      /^[a-zA-Z0-9-]*$/.test(label) &&
      !label.startsWith("-") &&
      !label.endsWith("-")
  );
}

function hasMinimumLabels(domain) {
  const labels = domain.split(".");
  return labels.length > 1 && labels[0].length > 0 && labels[1].length > 0;
}

function hasNoConsecutiveHyphens(domain) {
  return !domain.includes("--");
}

function hasNoConsecutiveDots(domain) {
  return !domain.includes("..");
}

function doesNotStartOrEndWithDot(domain) {
  return !domain.startsWith(".") && !domain.endsWith(".");
}

function hasValidTLD(domain) {
  const tld = domain.substring(domain.lastIndexOf(".") + 1);
  // Ensure TLD is at least 1 character, does not end with a digit, and isn't fully numeric
  return (
    /^[a-zA-Z0-9-]*[a-zA-Z-]$/.test(tld) && // TLD can contain digits and hyphens, but must end with a letter or a hyphen that is not leading
    new Blob([tld]).size <= 63
  );
}

function hasNoLeadingOrTrailingSpaces(domain) {
  return domain === domain.trim();
}

function isIPAddress(domain) {
  return (
    /^(\d{1,3}\.){3}\d{1,3}$/.test(domain) && // Simplified IP address check
    domain.split(".").every((num) => parseInt(num, 10) <= 255)
  );
}

function isValidIPAddress(ip) {
  // Regular expression to check if the string is a valid IPv4 address
  const ipPattern =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

  return ipPattern.test(ip);
}

function validateDomainPart(domain) {
  if (new Blob([domain]).size < 3) {
    return false; // Minimum domain length check
  }

  if (isIPAddress(domain)) {
    return isValidIPAddress(domain);
  }

  const validations = [
    isValidOverallLength,
    hasValidLabels,
    hasMinimumLabels,
    hasNoConsecutiveHyphens,
    hasNoConsecutiveDots,
    doesNotStartOrEndWithDot,
    hasValidTLD,
    hasNoLeadingOrTrailingSpaces,
  ];

  return validations.every((validation) => validation(domain));
}

/* -------------------------------------------------------------------------- */
/*                             GENERAL VALIDATIONS                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    MAIN                                    */
/* -------------------------------------------------------------------------- */
