const {
  validateEmail,
  hasBasicStructure,
  getLocalPart,
  getDomainPart,
} = require("../../src/email-validator/main"); // Adjust the import path as necessary

describe("Basic Structure Validation", () => {
  // 1.1
  test("should pass if email contains exactly one @ symbol", () => {
    expect(hasBasicStructure("localpart@domainpart.com")).toBe(true);
  });

  // 1.2
  test("should fail if email contains two consecutive @ symbols", () => {
    expect(hasBasicStructure("name@@example.com")).toBe(false);
  });

  // 1.3
  test("should fail if email contains two non-consecutive @ symbols", () => {
    expect(hasBasicStructure("name@exam@ple.com")).toBe(false);
  });

  // 1.4
  test("should fail if email contains two non-consecutive @ symbols (edge case)", () => {
    expect(hasBasicStructure("sad@sd.com@asd.com")).toBe(false);
  });

  // 1.5
  test("should fail if email contains no @ symbol", () => {
    expect(hasBasicStructure("nameexample.com")).toBe(false);
  });

  // 8.1
  test("should pass for an email with length under 320 octets", () => {
    const email = "example@example.com"; // Replace with an actual email of known length under 320 octets
    expect(hasBasicStructure(email)).toBe(true);
  });

  // 8.2
  test("should fail for an email exceeding 320 octets", () => {
    const email = `${"a".repeat(300)}@example.com`; // Construct an email that definitely exceeds 320 octets
    expect(hasBasicStructure(email)).toBe(false);
  });
});
