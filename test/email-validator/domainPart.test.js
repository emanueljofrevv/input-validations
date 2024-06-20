const { validateDomainPart } = require("../../src/email-validator/domainPart");

describe("Domain Part Length Validations", () => {
  test("should return true for valid email", () => {
    const email = "example@example.com";
    expect(validateDomainPart(email)).toBe(true);
  });

  // 5.1.1
  test("should return true for min SDL lenght of 1 octet", () => {
    const email = "name@a.com";
    expect(validateDomainPart(email)).toBe(true);
  });

  // 5.1.2
  test("should return true for max SDL length of 63 octets", () => {
    const email =
      "example@this-is-a-very-long-domain-part-label-with-many-many-characters.com";
    expect(validateDomainPart(email)).toBe(true);
  });

  // 5.1.3
  test("should return false for SDL length of more than 63 octets", () => {
    const email =
      "example@this-is-a-very-long-domain-part-label-with-many-many-many-characters.com";
    expect(validateDomainPart(email)).toBe(false);
  });

  // 5.1.4
  test("should return false for no SDL", () => {
    const email = "name@.com";
    expect(validateDomainPart(email)).toBe(false);
  });

  // 5.1.5
  test("should return false for no domain part", () => {
    const email = "name@";
    expect(validateDomainPart(email)).toBe(false);
  });

  // 5.2.1
  test("should return false for TDL min length of 1 octet ", () => {
    const email = "name@example.a";
    expect(validateDomainPart(email)).toBe(true);
  });

  // 5.2.2
  test("should return false for TDL max length of 63 octets", () => {
    const email =
      "name@example.this-is-a-very-long-domain-part-label-with-many-many-characters";
    expect(validateDomainPart(email)).toBe(true);
  });

  // 5.2.3
  test("should return false for TDL of more than 63 octets", () => {
    const email =
      "name@example.this-is-a-very-long-domain-part-label-with-many-many-many-characters";
    expect(validateDomainPart(email)).toBe(false);
  });

  // 5.2.4
  test("should return false for no TDL", () => {
    const email = "name@example";
    expect(validateDomainPart(email)).toBe(false);
  });

  // 5.3.1
  test("should return true for min lenght of 3 octets", () => {
    const email = "name@a.a";
    expect(validateDomainPart(email)).toBe(true);
  });

  // 5.3.2
  test("should return true for max length of 253 octets", () => {
    const email =
      "name@xYK9Pk4uVnUUU5LBH74FZNZ9bNWJ6cLYuLUNLLzE20kyYJfmJ021PCt7DVMw7imGmpnDMk2BvLV6VZWAhPJckBhCijctde19ZPRPe90vYCSFUAvTDvtThu6ukS6m0ZF9kARJ35QT9JmBXXMXSeRXvWZggBV8S2v0GTN39cQJVS7ZG9vWXhTGUj57GF2E2JLq5qLReYkHqyZAVy0MHa37g35ZAgdizDptkzW1UGfJTEBg7AyZVfZENfEhrb2.com";
    expect(validateDomainPart(email)).toBe(true);
  });

  // 5.3.3
  test("should return false more than 253 octets", () => {
    const email =
      "name@xYK9Pk4uVnUUU5LBH74FZNZ9bNWJ6cLYuLUNLLzE20kyYJfmJ021PCt7DVMw7imGmpnDMk2BvLV6VZWAhPJckBhCijctde19ZPRPe90vYCSFUAvTDvtThu6ukS6m0ZF9kARJ35QT9JmBXXMXSeRXvWZggBV8S2v0GTN39cQJVS7ZG9vWXhTGUj57GF2E2JLq5qLReYkHqyZAVy0MHa37g35ZAgdizDptkzW1UGfJTEBg7AyZVfZENfEhrb27.com";
    expect(validateDomainPart(email)).toBe(true);
  });
});
