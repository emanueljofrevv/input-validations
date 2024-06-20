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
  return /^[a-zA-Z]{1,}$/.test(tld) && new Blob([tld]).size <= 63; // Adjusted to accept a minimum of 1 character
}

function hasNoLeadingOrTrailingSpaces(domain) {
  return domain === domain.trim();
}

function isIPAddress(domain) {
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipPattern.test(domain);
}

function isValidIPAddress(domain) {
  return isIPAddress(domain); // Returns true if domain is a valid IP address
}

// Main validation function using functional composition
function validateDomainPart(domain) {
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

// Export the function for use in other modules
module.exports = { validateDomainPart };
