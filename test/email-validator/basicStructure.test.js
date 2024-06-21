const {
  hasBasicStructure,
  validateEmail,
  validateEmailLength,
} = require("../../src/email-validator/main"); // Adjust the import path as necessary

describe("Basic Structure Validation", () => {
  // 1.1
  test("should pass if email contains exactly one @ symbol", () => {
    expect(validateEmail("localpart@domainpart.com")).toBe(true);
  });

  // 1.2
  test("should fail if email contains two consecutive @ symbols", () => {
    expect(validateEmail("name@@example.com")).toBe(false);
  });

  // 1.3
  test("should fail if email contains two non-consecutive @ symbols", () => {
    expect(validateEmail("name@exam@ple.com")).toBe(false);
  });

  // 1.4
  test("should fail if email contains two non-consecutive @ symbols (edge case)", () => {
    expect(validateEmail("sad@sd.com@asd.com")).toBe(false);
  });

  // 1.5
  test("should fail if email contains no @ symbol", () => {
    expect(validateEmail("nameexample.com")).toBe(false);
  });

  // 8.1
  test("should pass for an email with length under 320 octets", () => {
    const email = "example@example.com"; // Replace with an actual email of known length under 320 octets
    expect(validateEmail(email)).toBe(true);
  });

  // 8.2
  test("should fail for an email exceeding 320 octets", () => {
    const email = `${"a".repeat(300)}@example.com`; // Construct an email that definitely exceeds 320 octets
    expect(validateEmail(email)).toBe(false);
  });
});
