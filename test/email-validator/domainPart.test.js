const { validateDomainPart } = require("../../src/email-validator/domainPart");

describe("Domain Part Validation", () => {
  // Domain part length validation
  test("Domain labels may be no more than 63 octets long", () => {
    const domain = `${"a".repeat(63)}.com`;
    expect(validateDomainPart(domain)).toBe(true);
  });

  test("Domain part, min label length of 1 octet", () => {
    expect(validateDomainPart("b.com")).toBe(true);
  });

  test("Domain part, max SDL length of 63 octets", () => {
    const domain = `${"a".repeat(63)}.com`;
    expect(validateDomainPart(domain)).toBe(true);
  });

  test("Domain part, SDL length of more than 63 octets", () => {
    const domain = `${"a".repeat(64)}.com`;
    expect(validateDomainPart(domain)).toBe(false);
  });

  test("Domain part, no SDL", () => {
    expect(validateDomainPart(".com")).toBe(false);
  });

  test("Domain part, no domain", () => {
    expect(validateDomainPart("")).toBe(false);
  });

  test("Domain part, TDL min length of 1 octet", () => {
    expect(validateDomainPart("example.a")).toBe(true);
  });

  test("Domain part, TDL max length of 63 octets", () => {
    const tld = "a".repeat(63);
    expect(validateDomainPart(`example.${tld}`)).toBe(true);
  });

  test("Domain part, TDL of more than 63 octets", () => {
    const tld = "a".repeat(64);
    expect(validateDomainPart(`example.${tld}`)).toBe(false);
  });

  test("Domain part, no TDL", () => {
    expect(validateDomainPart("example")).toBe(false);
  });

  test("Domain part, min length of 3 octets", () => {
    expect(validateDomainPart("a.a")).toBe(true);
  });

  test("Domain part, max length of 253 octets", () => {
    const domain = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(
      63
    )}.${"d".repeat(61)}`;
    expect(validateDomainPart(domain)).toBe(true);
  });

  test("Domain part, more than 253 octets", () => {
    const domain = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(
      63
    )}.${"d".repeat(65)}`;
    expect(validateDomainPart(domain)).toBe(false);
  });

  // Valid characters tests
  test("Domain part, all uppercase", () => {
    expect(validateDomainPart("EXAMPLE.COM")).toBe(true);
  });

  test("Domain part, all lowercase", () => {
    expect(validateDomainPart("example.com")).toBe(true);
  });

  test("Domain part, title case", () => {
    expect(validateDomainPart("Example.Com")).toBe(true);
  });

  // Special character validation - This needs specific implementation in your validateDomainPart function
  test("Domain part, non-latin characters in SDL", () => {
    expect(validateDomainPart("examçple.com")).toBe(false);
  });

  // Hyphen rules
  test("Domain part, hyphen not as first or last character in SDL", () => {
    expect(validateDomainPart("exam-ple.com")).toBe(true);
  });

  test("Domain part, leading hyphen in SDL", () => {
    expect(validateDomainPart("-example.com")).toBe(false);
  });

  test("Domain part, trailing hyphen in SDL", () => {
    expect(validateDomainPart("example-.com")).toBe(false);
  });

  test("Domain part, consecutive hyphens in SDL", () => {
    expect(validateDomainPart("exam--ple.com")).toBe(false);
  });

  // Add remaining specific tests for characters, IP addresses, underscores, spaces, etc.
});
