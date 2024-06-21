const { Blob } = require("buffer");

// Helper functions
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
    utf8ByteSize(localPart) <= 64 &&
    utf8ByteSize(domainPart) <= 253 &&
    domainLabels.every((label) => utf8ByteSize(label) <= 63)
  );
}

function validateLocalPart(localPart) {
  // Assuming this function is properly implemented
  return true;
}

function validateDomainPart(domainPart) {
  // Assuming this function is properly implemented
  return true;
}

function validateEmailLength(email) {
  return utf8ByteSize(email) <= 320;
}

// Main validation function that orchestrates the validation process
function validateEmail(email) {
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

function getLocalPart(email) {
  return email.split("@")[0];
}

function getDomainPart(email) {
  return email.split("@")[1];
}

module.exports = {
  hasBasicStructure,
  validateLocalPart,
  validateDomainPart,
  validateEmail,
  validateEmailLength, // Exporting for potential external use or testing
};
