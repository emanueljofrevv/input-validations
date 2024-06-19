const { validateLocalPart } = require("../../src/email-validator/localPart");

describe("Local Part Validation", () => {
  test("should return true for valid email", () => {
    const email = "example@example.com";
    expect(validateLocalPart(email)).toBe(true);
  });
});
