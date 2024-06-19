const { validateDomainPart } = require("../../src/email-validator/domainPart");

describe("Domain Part Validation", () => {
  test("should return true for valid email", () => {
    const email = "example@example.com";
    expect(validateDomainPart(email)).toBe(true);
  });
});
