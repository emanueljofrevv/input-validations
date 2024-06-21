const { Blob } = require("buffer");

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

// Export the function for use in other modules
module.exports = { validateLocalPart };
