// Main validation function that orchestrates the validation process
function validateEmail(email) {
  // Start by checking the basic structure
  if (!hasBasicStructure(email)) {
    return false; // Basic structure is not correct
  }

  // Proceed with more specific validations
  if (
    !validateLocalPart(getLocalPart(email)) ||
    !validateDomainPart(getDomainPart(email))
  ) {
    return false; // Detailed validations failed
  }

  return true; // Email is valid
}

function utf8ByteSize(string) {
  return new Blob([string]).size; // Blob object automatically calculates the UTF-8 byte size
}

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
    utf8ByteSize(localPart) <= 64 && // Validate local part length in octets
    utf8ByteSize(domainPart) <= 253 && // Validate total domain part length in octets
    domainLabels.every((label) => utf8ByteSize(label) <= 63) // Validate each domain label length in octets
  );
}

// Extracts the local part from the email
function getLocalPart(email) {
  return email.split("@")[0];
}

// Extracts the domain part from the email
function getDomainPart(email) {
  return email.split("@")[1];
}

// Placeholder functions for local and domain part validations
function validateLocalPart(localPart) {
  // Placeholder for local part validation logic
  return true; // Assuming valid for now
}

function validateDomainPart(domainPart) {
  // Placeholder for domain part validation logic
  return true; // Assuming valid for now
}
