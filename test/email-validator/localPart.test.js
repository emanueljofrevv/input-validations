const { validateLocalPart } = require("../../src/email-validator/localPart");

describe("Local Part Validation", () => {
  // 2.1
  test("should fail if local part is empty", () => {
    expect(validateLocalPart("")).toBe(false);
  });

  // 2.2
  test("should pass if local part is of minimum length 1", () => {
    expect(validateLocalPart("n")).toBe(true);
  });

  // 2.3
  test("should pass if local part is of maximum length 64", () => {
    const longEmail = "a".repeat(64);
    expect(validateLocalPart(longEmail)).toBe(true);
  });

  // 2.4
  test("should fail if local part exceeds maximum length of 64", () => {
    const tooLongEmail = "a".repeat(65);
    expect(validateLocalPart(tooLongEmail)).toBe(false);
  });

  // 3.1.1
  test("should pass if local part is all uppercase", () => {
    expect(validateLocalPart("UPPERCASE")).toBe(true);
  });

  // 3.1.2
  test("should pass if local part is all lowercase", () => {
    expect(validateLocalPart("lowercase")).toBe(true);
  });

  // 3.1.3
  test("should pass if local part is Pascal case", () => {
    expect(validateLocalPart("PascalCase")).toBe(true);
  });

  // 3.1.4
  test("Local part, extended ASCII: Non-latin characters", () => {
    expect(validateLocalPart("canção")).toBe(false);
  });

  // 3.1.5
  test("should fail if local part contains extended ASCII", () => {
    expect(validateLocalPart("张")).toBe(false);
  });

  // 3.1.6
  test("should fail if local part contains emojis", () => {
    expect(validateLocalPart("I❤️CHOCOLATE🍫")).toBe(false);
  });

  // 3.1.7
  test("should pass if local part starts with a digit", () => {
    expect(validateLocalPart("1name")).toBe(true);
  });

  // 3.1.8
  test("should fail if local part contains non-printable characters", () => {
    expect(validateLocalPart("name\u200b")).toBe(false);
  });

  // 3.2.1
  test("should pass if local part ends with digits", () => {
    expect(validateLocalPart("name123")).toBe(true);
  });

  // 3.2.2
  test("should pass if local part starts with digits", () => {
    expect(validateLocalPart("123")).toBe(true);
  });

  // 3.2.3
  test("should pass if local part has digits not at start or end", () => {
    expect(validateLocalPart("na123me")).toBe(true);
  });

  // 3.3.1
  test("should fail if local part starts with a dash", () => {
    expect(validateLocalPart("-name")).toBe(false);
  });

  // 3.3.2
  test("should pass if local part ends with a dash", () => {
    expect(validateLocalPart("name-")).toBe(true);
  });

  // 3.3.3
  test("should pass if local part contains a dash", () => {
    expect(validateLocalPart("na-me")).toBe(true);
  });

  // 3.3.4
  test("should fail if local part starts with an underscore", () => {
    expect(validateLocalPart("_name")).toBe(false);
  });

  // 3.3.5
  test("should pass if local part ends with an underscore", () => {
    expect(validateLocalPart("name_")).toBe(true);
  });

  // 3.3.6
  test("should pass if local part contains an underscore", () => {
    expect(validateLocalPart("name_test")).toBe(true);
  });

  // 3.3.7
  test("should fail if local part starts with a plus", () => {
    expect(validateLocalPart("+name")).toBe(false);
  });

  // 3.3.8
  test("should fail if local part ends with a plus", () => {
    expect(validateLocalPart("name+")).toBe(false);
  });

  // 3.3.9
  test("should pass if local part contains a plus for alias", () => {
    expect(validateLocalPart("name+alias")).toBe(true);
  });

  // 3.3.10
  test("should fail if local part contains disallowed printable characters", () => {
    expect(validateLocalPart("name|test")).toBe(false);
  });

  // 3.3.11
  test("should fail if local part contains disallowed characters", () => {
    expect(validateLocalPart("name>test")).toBe(false);
  });

  // 3.3.12
  test("should pass if local part contains consecutive allowed characters", () => {
    expect(validateLocalPart("name--test")).toBe(true);
  });

  // 3.4.1
  test("should pass if local part has valid dot placement", () => {
    expect(validateLocalPart("na.me")).toBe(true);
  });

  // 3.4.2
  test("should fail if local part contains consecutive dots", () => {
    expect(validateLocalPart("na..me")).toBe(false);
  });

  // 3.4.3
  test("should fail if local part starts with a dot", () => {
    expect(validateLocalPart(".name")).toBe(false);
  });

  // 3.4.4
  test("should fail if local part ends with a dot", () => {
    expect(validateLocalPart("name.")).toBe(false);
  });

  // 3.5.1
  test("should fail if local part contains invalid quoted characters", () => {
    expect(validateLocalPart('"name"')).toBe(false);
  });

  // 3.5.2
  test("should fail if local part contains invalid quoted characters", () => {
    expect(validateLocalPart('""name""')).toBe(false);
  });

  // 4.1
  test("should fail if local part contains leading space", () => {
    expect(validateLocalPart(" name")).toBe(false);
  });

  // 4.2
  test("should fail if local part contains trailing space", () => {
    expect(validateLocalPart("name ")).toBe(false);
  });

  // 4.3
  test("Local part, space not as first or last character", () => {
    expect(validateLocalPart("na me")).toBe(false);
  });
});
