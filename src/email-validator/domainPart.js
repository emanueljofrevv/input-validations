function validateDomainPart(email) {
  const domain = getDomainPart(email);

  if (!isValidLength(domain)) return false;
  //if (!containsValidCharacters(domain)) return false;
  //if (!hasValidLabelStructure(domain)) return false;
  // if (!hasValidTLD(domain)) return false;

  return true; // Domain is valid
}

// Extracts the domain part from the email
function getDomainPart(email) {
  return email.split("@")[1];
}

function isValidLength(domain) {
  const octets = new Blob([domain]).size;
  return octets <= 253 && octets > 0;
}

function containsValidCharacters(domain) {
  const validCharsRegex = /^[a-zA-Z0-9.-]+$/;
  return validCharsRegex.test(domain);
}

function hasValidLabelStructure(domain) {
  const labels = domain.split(".");
  if (labels.length < 2) return false; // Ensure there's a subdomain and TLD
  if (
    labels.some(
      (label) => new Blob([label]).size > 63 || new Blob([label]).size < 1
    )
  ) {
    return false;
  }
  return labels.every(
    (label) =>
      /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(label) || label === ""
  );
}

function hasValidTLD(domain) {
  const labels = domain.split(".");
  const tld = labels[labels.length - 1];
  return new Blob([tld]).size <= 63 && /^[a-zA-Z]{2,}$/.test(tld); // Check TLD constraints
}

function isIPAddress(domain) {
  // This remains unchanged; include if IPs need to be validated separately
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipPattern.test(domain);
}

function isValidIPAddress(domain) {
  return true; // Placeholder, adjust as needed for IP address validation
}

module.exports = {
  validateDomainPart,
  isValidLength,
  containsValidCharacters,
  hasValidLabelStructure,
  hasValidTLD,
  isIPAddress,
  isValidIPAddress,
};
