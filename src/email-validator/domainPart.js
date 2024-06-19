/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

function isValidLength(domain) {
  const octets = new Blob([domain]).size;
  return octets <= 253;
}

function containsValidCharacters(domain) {
  // Regex to check valid characters excluding special cases like leading/trailing characters
  const validCharsRegex = /^[a-zA-Z0-9.-]+$/;
  return validCharsRegex.test(domain);
}

function hasValidLabelStructure(domain) {
  const labels = domain.split(".");
  if (labels.some((label) => label.length > 63 || label.length < 1))
    return false;
  if (
    labels.some((label) => !/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(label))
  )
    return false; // No leading/trailing hyphens
  if (domain.includes("..") || domain.endsWith(".") || domain.startsWith("."))
    return false; // No leading/trailing or consecutive dots

  return true;
}

function isIPAddress(domain) {
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipPattern.test(domain);
}

function isValidIPAddress(domain) {
  // Further validation for IP addresses can be implemented here if needed
  return true; // Placeholder
}

/* -------------------------------------------------------------------------- */
/*                                    MAIN                                    */
/* -------------------------------------------------------------------------- */

function validateDomainPart(domain) {
  if (!isValidLength(domain)) return false;
  if (!containsValidCharacters(domain)) return false;
  if (!hasValidLabelStructure(domain)) return false;
  if (isIPAddress(domain) && !isValidIPAddress(domain)) return false;

  return true; // Domain is valid
}

module.exports = {
  validateDomainPart,
}; // Export all functions for testing
