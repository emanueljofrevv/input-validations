const { Blob } = require("buffer");

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

function getLocalPart(email) {
  return email.split("@")[0];
}

function getDomainPart(email) {
  return email.split("@")[1];
}

function utf8ByteSize(string) {
  return new Blob([string]).size; // Blob object automatically calculates the UTF-8 byte size
}

/* -------------------------------------------------------------------------- */
/*                           LOCAL PART VALIDATIONS                           */
/* -------------------------------------------------------------------------- */

function isNotEmpty(localPart) {
  return localPart.length > 0;
}

function hasValidLength(localPart) {
  const localPartSize = utf8ByteSize(localPart);
  return localPartSize >= 1 && localPartSize <= 64;
}

function hasNoConsecutiveDots(part) {
  return !part.includes("..");
}

function doesNotStartOrEndWithDot(part) {
  return !part.startsWith(".") && !part.endsWith(".");
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
  return utf8ByteSize(domain) <= 253;
}

function hasValidLabels(domain) {
  const labels = domain.split(".");
  return labels.every(
    (label) =>
      utf8ByteSize(label) <= 63 &&
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

function hasValidTLD(domain) {
  const tld = domain.substring(domain.lastIndexOf(".") + 1);
  // Ensure TLD is at least 1 character, does not end with a digit, and isn't fully numeric
  return (
    /^[a-zA-Z0-9-]*[a-zA-Z-]$/.test(tld) && // TLD can contain digits and hyphens, but must end with a letter or a hyphen that is not leading
    utf8ByteSize(tld) <= 63
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
  if (utf8ByteSize(domain) < 3) {
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

function hasBasicStructure(email) {
  const atSymbolCount = (email.match(/@/g) || []).length;
  const parts = email.split("@");
  if (atSymbolCount !== 1 || parts.length !== 2) {
    return false; // Ensures one '@' and splits into two parts
  }

  const localPart = parts[0];
  const domainPart = parts[1];
  const domainLabels = domainPart.split(".");

  return (
    utf8ByteSize(localPart) >= 1 &&
    utf8ByteSize(localPart) <= 64 &&
    utf8ByteSize(domainPart) <= 253 &&
    domainLabels.every((label) => utf8ByteSize(label) <= 63)
  );
}

function validateEmailLength(email) {
  return utf8ByteSize(email) <= 320;
}

/* -------------------------------------------------------------------------- */
/*                                    MAIN                                    */
/* -------------------------------------------------------------------------- */

function main(email) {
  // Start by checking the overall email length
  if (!validateEmailLength(email)) {
    return false; // Email length exceeds 320 octets
  }

  // Check the basic structure
  if (!hasBasicStructure(email)) {
    return false; // Basic structure is not correct
  }

  // Proceed with more specific validations
  const localPart = getLocalPart(email);
  const domainPart = getDomainPart(email);

  if (!validateLocalPart(localPart) || !validateDomainPart(domainPart)) {
    return false; // Detailed validations failed
  }

  return true; // Email is valid
}

module.exports = { main };
