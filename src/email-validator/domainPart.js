const { Blob } = require("buffer");

// Helper functions for domain part validation
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

// Additional function to validate basic structure
function hasBasicStructure(email) {
  const [localPart, domainPart] = email.split("@");
  if (!localPart || !domainPart) {
    return false; // Ensures both local and domain parts are present
  }
  return validateDomainPart(domainPart);
}

module.exports = { validateDomainPart, hasBasicStructure };
