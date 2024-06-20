const { validateLocalPart } = require("../../src/email-validator/localPart");

describe('Local Part Validation', () => {
    test('should fail if local part is empty', () => {
        expect(validateLocalPart('')).toBe(false);
    });

    test('should pass if local part is of minimum length 1', () => {
        expect(validateLocalPart('n')).toBe(true);
    });

    test('should pass if local part is of maximum length 64', () => {
        const longEmail = 'a'.repeat(64);
        expect(validateLocalPart(longEmail)).toBe(true);
    });

    test('should fail if local part exceeds maximum length of 64', () => {
        const tooLongEmail = 'a'.repeat(65);
        expect(validateLocalPart(tooLongEmail)).toBe(false);
    });

    test('should pass if local part is all uppercase', () => {
        expect(validateLocalPart('UPPERCASE')).toBe(true);
    });

    test('should pass if local part is all lowercase', () => {
        expect(validateLocalPart('lowercase')).toBe(true);
    });

    test('should pass if local part is Pascal case', () => {
        expect(validateLocalPart('PascalCase')).toBe(true);
    });

    test('should fail if local part contains extended ASCII', () => {
        expect(validateLocalPart('张')).toBe(false);
    });

    test('should fail if local part contains Unicode characters', () => {
        expect(validateLocalPart('I❤️CHOCOLATE🍫')).toBe(false);
    });

    test('should pass if local part starts with a digit', () => {
        expect(validateLocalPart('1name')).toBe(true);
    });

    test('should fail if local part contains non-printable characters', () => {
        expect(validateLocalPart('name\u200b')).toBe(false);
    });

    test('should pass if local part ends with digits', () => {
        expect(validateLocalPart('name123')).toBe(true);
    });

    test('should pass if local part starts with digits', () => {
        expect(validateLocalPart('123')).toBe(true);
    });

    test('should pass if local part has digits not at start or end', () => {
        expect(validateLocalPart('na123me')).toBe(true);
    });

    test('should fail if local part starts with a dash', () => {
        expect(validateLocalPart('-name')).toBe(false);
    });

    test('should pass if local part ends with a dash', () => {
        expect(validateLocalPart('name-')).toBe(true);
    });

    test('should pass if local part contains a dash', () => {
        expect(validateLocalPart('na-me')).toBe(true);
    });

    test('should fail if local part starts with an underscore', () => {
        expect(validateLocalPart('_name')).toBe(false);
    });

    test('should pass if local part ends with an underscore', () => {
        expect(validateLocalPart('name_')).toBe(true);
    });

    test('should pass if local part contains an underscore', () => {
        expect(validateLocalPart('name_test')).toBe(true);
    });

    test('should fail if local part starts with a plus', () => {
        expect(validateLocalPart('+name')).toBe(false);
    });

    test('should fail if local part ends with a plus', () => {
        expect(validateLocalPart('name+')).toBe(false);
    });

    test('should pass if local part contains a plus for alias', () => {
        expect(validateLocalPart('name+alias')).toBe(true);
    });

    test('should fail if local part contains disallowed printable characters', () => {
        expect(validateLocalPart('name|test')).toBe(false);
    });

    test('should fail if local part contains disallowed characters', () => {
        expect(validateLocalPart('name>test')).toBe(false);
    });

    test('should pass if local part contains consecutive allowed characters', () => {
        expect(validateLocalPart('name--test')).toBe(true);
    });

    test('should pass if local part has valid dot placement', () => {
        expect(validateLocalPart('na.me')).toBe(true);
    });

    test('should fail if local part contains consecutive dots', () => {
        expect(validateLocalPart('na..me')).toBe(false);
    });

    test('should fail if local part starts with a dot', () => {
        expect(validateLocalPart('.name')).toBe(false);
    });

    test('should fail if local part ends with a dot', () => {
        expect(validateLocalPart('name.')).toBe(false);
    });

    test('should fail if local part contains invalid quoted characters', () => {
        expect(validateLocalPart('"name"')).toBe(false);
    });

    test('should fail if local part contains invalid quoted characters', () => {
        expect(validateLocalPart('""name""')).toBe(false);
    });

    test('should fail if local part contains leading space', () => {
        expect(validateLocalPart('" name"')).toBe(false);
    });

    test('should fail if local part contains space', () => {
        expect(validateLocalPart('na me')).toBe(false);
    });
});