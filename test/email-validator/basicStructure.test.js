const { hasBasicStructure } = require("../../src/email-validator/main"); // Adjust the path as necessary

/* -------------------------------------------------------------------------- */
/*                               BASIC STRUCTURE                              */
/* -------------------------------------------------------------------------- */

describe("Basic Structure Validation", () => {
  test("should return true for valid email", () => {
    const email = "example@example.com";
    expect(hasBasicStructure(email)).toBe(true);
  });

  test('should fail if more than one "@" symbol', () => {
    const email = "example@@example.com";
    expect(hasBasicStructure(email)).toBe(false);
  });

  test('should fail if missing "@" symbol', () => {
    const email = "example.com";
    expect(hasBasicStructure(email)).toBe(false);
  });

  test("should fail if local part exceeds 64 octets", () => {
    const localPart = "a".repeat(65); // 65 characters, assuming ASCII (65 octets)
    const email = `${localPart}@example.com`;
    expect(hasBasicStructure(email)).toBe(false);
  });

  test("should fail if domain part exceeds 253 octets", () => {
    const domainPart = "d".repeat(254); // 254 characters, assuming ASCII (254 octets)
    const email = `example@${domainPart}.com`;
    expect(hasBasicStructure(email)).toBe(false);
  });

  test("should fail if any domain label exceeds 63 octets", () => {
    const domainLabel = "d".repeat(64); // 64 characters, assuming ASCII (64 octets)
    const email = `example@${domainLabel}.example.com`;
    expect(hasBasicStructure(email)).toBe(false);
  });

  test("should return true for max edge case of local part 64 octets", () => {
    const localPart = "a".repeat(64); // 64 characters, assuming ASCII (64 octets)
    const email = `${localPart}@example.com`;
    expect(hasBasicStructure(email)).toBe(true);
  });

  test("should return true for max edge case of domain part 253 octets", () => {
    const domainPart = "d".repeat(251) + ".com"; // 251 + ".com" = 253 octets
    const email = `example@${domainPart}`;
    expect(hasBasicStructure(email)).toBe(true);
  });

  test("should return true for max edge case of domain label 63 octets", () => {
    const domainLabel = "d".repeat(63); // 63 characters, assuming ASCII (63 octets)
    const email = `example@${domainLabel}.com`;
    expect(hasBasicStructure(email)).toBe(true);
  });
});
