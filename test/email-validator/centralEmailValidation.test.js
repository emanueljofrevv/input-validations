const { main } = require("../../src/email-validator/centralEmailValidation");

describe("Basic Structure Validation", () => {
  // 1.1
  test("should pass if email contains exactly one @ symbol", () => {
    expect(main("localpart@domainpart.com")).toBe(true);
  });

  // 1.2
  test("should fail if email contains two consecutive @ symbols", () => {
    expect(main("name@@example.com")).toBe(false);
  });

  // 1.3
  test("should fail if email contains two non-consecutive @ symbols", () => {
    expect(main("name@exam@ple.com")).toBe(false);
  });

  // 1.4
  test("should fail if email contains two non-consecutive @ symbols (edge case)", () => {
    expect(main("sad@sd.com@asd.com")).toBe(false);
  });

  // 1.5
  test("should fail if email contains no @ symbol", () => {
    expect(main("nameexample.com")).toBe(false);
  });

  // 8.1
  test("should pass for an email with length under 320 octets", () => {
    const email = "example@example.com"; // Replace with an actual email of known length under 320 octets
    expect(main(email)).toBe(true);
  });

  // 8.2
  test("should fail for an email exceeding 320 octets", () => {
    const email = `${"a".repeat(300)}@example.com`; // Construct an email that definitely exceeds 320 octets
    expect(main(email)).toBe(false);
  });
});

describe("Local Part Validation", () => {
  // 2.1
  test("should fail if local part is empty", () => {
    expect(main("@domain.com")).toBe(false);
  });

  // 2.2
  test("should pass if local part is of minimum length 1", () => {
    expect(main("n@domain.com")).toBe(true);
  });

  // 2.3
  test("should pass if local part is of maximum length 64", () => {
    const longEmail = "a".repeat(64) + "@domain.com";
    expect(main(longEmail)).toBe(true);
  });

  // 2.4
  test("should fail if local part exceeds maximum length of 64", () => {
    const tooLongEmail = "a".repeat(65) + "@domain.com";
    expect(main(tooLongEmail)).toBe(false);
  });

  // 3.1.1
  test("should pass if local part is all uppercase", () => {
    expect(main("UPPERCASE@domain.com")).toBe(true);
  });

  // 3.1.2
  test("should pass if local part is all lowercase", () => {
    expect(main("lowercase@domain.com")).toBe(true);
  });

  // 3.1.3
  test("should pass if local part is Pascal case", () => {
    expect(main("PascalCase@domain.com")).toBe(true);
  });

  // 3.1.4
  test("Local part, extended ASCII: Non-latin characters", () => {
    expect(main("canção@domain.com")).toBe(false);
  });

  // 3.1.5
  test("should fail if local part contains extended ASCII", () => {
    expect(main("张@domain.com")).toBe(false);
  });

  // 3.1.6
  test("should fail if local part contains emojis", () => {
    expect(main("I❤️CHOCOLATE🍫@domain.com")).toBe(false);
  });

  // 3.1.7
  test("should pass if local part starts with a digit", () => {
    expect(main("1name@domain.com")).toBe(true);
  });

  // 3.1.8
  test("should fail if local part contains non-printable characters", () => {
    expect(main("name\u200b@domain.com")).toBe(false);
  });

  // 3.2.1
  test("should pass if local part ends with digits", () => {
    expect(main("name123@domain.com")).toBe(true);
  });

  // 3.2.2
  test("should pass if local part starts with digits", () => {
    expect(main("123@domain.com")).toBe(true);
  });

  // 3.2.3
  test("should pass if local part has digits not at start or end", () => {
    expect(main("na123me@domain.com")).toBe(true);
  });

  // 3.3.1
  test("should fail if local part starts with a dash", () => {
    expect(main("-name@domain.com")).toBe(false);
  });

  // 3.3.2
  test("should pass if local part ends with a dash", () => {
    expect(main("name-@domain.com")).toBe(true);
  });

  // 3.3.3
  test("should pass if local part contains a dash", () => {
    expect(main("na-me@domain.com")).toBe(true);
  });

  // 3.3.4
  test("should fail if local part starts with an underscore", () => {
    expect(main("_name@domain.com")).toBe(false);
  });

  // 3.3.5
  test("should pass if local part ends with an underscore", () => {
    expect(main("name_@domain.com")).toBe(true);
  });

  // 3.3.6
  test("should pass if local part contains an underscore", () => {
    expect(main("name_test@domain.com")).toBe(true);
  });

  // 3.3.7
  test("should fail if local part starts with a plus", () => {
    expect(main("+name@domain.com")).toBe(false);
  });

  // 3.3.8
  test("should fail if local part ends with a plus", () => {
    expect(main("name+@domain.com")).toBe(false);
  });

  // 3.3.9
  test("should pass if local part contains a plus for alias", () => {
    expect(main("name+alias@domain.com")).toBe(true);
  });

  // 3.3.10
  test("should fail if local part contains disallowed printable characters", () => {
    expect(main("name|test@domain.com")).toBe(false);
  });

  // 3.3.11
  test("should fail if local part contains disallowed characters", () => {
    expect(main("name>test@domain.com")).toBe(false);
  });

  // 3.3.12
  test("should pass if local part contains consecutive allowed characters", () => {
    expect(main("name--test@domain.com")).toBe(true);
  });

  // 3.4.1
  test("should pass if local part has valid dot placement", () => {
    expect(main("na.me@domain.com")).toBe(true);
  });

  // 3.4.2
  test("should fail if local part contains consecutive dots", () => {
    expect(main("na..me@domain.com")).toBe(false);
  });

  // 3.4.3
  test("should fail if local part starts with a dot", () => {
    expect(main(".name@domain.com")).toBe(false);
  });

  // 3.4.4
  test("should fail if local part ends with a dot", () => {
    expect(main("name.@domain.com")).toBe(false);
  });

  // 3.5.1
  test("should fail if local part contains invalid quoted characters", () => {
    expect(main('"name"@domain.com')).toBe(false);
  });

  // 3.5.2
  test("should fail if local part contains invalid quoted characters", () => {
    expect(main('""name""@domain.com')).toBe(false);
  });

  // 4.1
  test("should fail if local part contains leading space", () => {
    expect(main(" name@domain.com")).toBe(false);
  });

  // 4.2
  test("should fail if local part contains trailing space", () => {
    expect(main("name @domain.com")).toBe(false);
  });

  // 4.3
  test("Local part, space not as first or last character", () => {
    expect(main("na me@domain.com")).toBe(false);
  });
});

describe("Domain Part Validation", () => {
  // Domain part length validation
  test("Domain labels may be no more than 63 octets long", () => {
    const domain = `${"a".repeat(63)}.com`;
    expect(main(domain)).toBe(true);
  });

  // 5.1.1
  test("Domain part, min SDL length of 1 octet", () => {
    expect(main("b.com")).toBe(true);
  });

  // 5.1.2
  test("Domain part, max SDL length of 63 octets", () => {
    const domain = `${"a".repeat(63)}.com`;
    expect(main(domain)).toBe(true);
  });

  // 5.1.3
  test("Domain part, SDL length of more than 63 octets", () => {
    const domain = `${"a".repeat(64)}.com`;
    expect(main(domain)).toBe(false);
  });

  // 5.1.4
  test("Domain part, no SDL", () => {
    expect(main(".com")).toBe(false);
  });

  // 5.1.5
  test("Domain part, no domain", () => {
    expect(main("")).toBe(false);
  });

  // 5.2.1
  test("Domain part, TDL min length of 1 octet", () => {
    expect(main("example.a")).toBe(true);
  });

  // 5.2.2
  test("Domain part, TDL max length of 63 octets", () => {
    const tld = "a".repeat(63);
    expect(main(`example.${tld}`)).toBe(true);
  });

  // 5.2.3
  test("Domain part, TDL of more than 63 octets", () => {
    const tld = "a".repeat(64);
    expect(main(`example.${tld}`)).toBe(false);
  });

  // 5.2.4
  test("Domain part, no TDL", () => {
    expect(main("example")).toBe(false);
  });

  // 5.3.1
  test("Domain part, min length of 3 octets", () => {
    expect(main("a.a")).toBe(true);
  });

  // 5.3.2
  test("Domain part, max length of 253 octets", () => {
    const domain = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(
      63
    )}.${"d".repeat(61)}`;
    expect(main(domain)).toBe(true);
  });

  // 5.3.3
  test("Domain part, more than 253 octets", () => {
    const domain = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(
      63
    )}.${"d".repeat(65)}`;
    expect(main(domain)).toBe(false);
  });

  // Valid characters tests
  // 6.1.1
  test("Domain part, all uppercase", () => {
    expect(main("EXAMPLE.COM")).toBe(true);
  });

  // 6.1.2
  test("Domain part, all lowercase", () => {
    expect(main("example.com")).toBe(true);
  });

  // 6.1.3
  test("Domain part, title case", () => {
    expect(main("Example.Com")).toBe(true);
  });

  // Special character validation - This needs specific implementation in your main function
  // 6.1.4
  test("Domain part, SDL extended ASCII, leading non-latin characters", () => {
    expect(main("çexample.com")).toBe(false);
  });

  // 6.1.5
  test("Domain part, SDL extended ASCII, trailing non-latin characters", () => {
    expect(main("exampleç.com")).toBe(false);
  });

  // 6.1.6
  test("Domain part, SDL extended ASCII, non-latin characters not as first or last character", () => {
    expect(main("canção.com")).toBe(false);
  });

  // 6.1.7
  test("Domain part, TDL extended ASCII, leading non-latin characters", () => {
    expect(main("example.çom")).toBe(false);
  });

  // 6.1.8
  test("Domain part, TDL extended ASCII, trailing non-latin characters", () => {
    expect(main("example.coç")).toBe(false);
  });

  // 6.1.9
  test("Domain part, TDL extended ASCII, non-latin characters not as first or last character", () => {
    expect(main("example.cçm")).toBe(false);
  });

  // 6.1.10
  test("Domain part, SDL Unicode, leading non-latin characters", () => {
    expect(main("中example.com")).toBe(false);
  });

  // 6.1.11
  test("Domain part, SDL Unicode, trailing non-latin characters", () => {
    expect(main("example中.com")).toBe(false);
  });

  // 6.1.12
  test("Domain part, SDL Unicode, non-latin characters not as first or last character", () => {
    expect(main("exam中ple.com")).toBe(false);
  });

  // 6.1.13
  test("Domain part, TDL Unicode, leading non-latin characters", () => {
    expect(main("domain.中om")).toBe(false);
  });

  // 6.1.14
  test("Domain part, TDL Unicode, trailing non-latin characters", () => {
    expect(main("domain.co中")).toBe(false);
  });

  // 6.1.15
  test("Domain part, TDL Unicode, non-latin characters not as first or last character", () => {
    expect(main("domain.c中m")).toBe(false);
  });

  // 6.1.16
  test("Domain part, SDL Unicode, leading emoji", () => {
    expect(main("❤️example.com")).toBe(false);
  });

  // 6.1.17
  test("Domain part, SDL Unicode, trailing emoji", () => {
    expect(main("example❤️.com")).toBe(false);
  });

  // 6.1.18
  test("Domain part, SDL Unicode, emoji not as first or last character", () => {
    expect(main("exam❤️ple.com")).toBe(false);
  });

  // 6.1.19
  test("Domain part, TDL Unicode, leading emoji characters", () => {
    expect(main("domain.❤️om")).toBe(false);
  });

  // 6.1.20
  test("Domain part, TDL Unicode, trailing emoji characters", () => {
    expect(main("domain.co❤️m")).toBe(false);
  });

  // 6.1.21
  test("Domain part, TDL Unicode, emoji not as first or last character", () => {
    expect(main("domain.c❤️m")).toBe(false);
  });

  // 6.1.22
  test("Domain part, SDL leading non-printable character", () => {
    expect(main("name­­.com")).toBe(false);
  });

  // 6.1.23
  test("Domain part, SDL trailing non-printable character", () => {
    expect(main("name­­.com")).toBe(false);
  });

  // 6.1.24
  test("Domain part, SDL non-printable character not as first or last character", () => {
    expect(main("name­­.com")).toBe(false);
  });

  // 6.1.25
  test("Domain part, TDL leading non-printable character", () => {
    expect(main("name.­­om")).toBe(false);
  });

  // 6.1.26
  test("Domain part, TDL trailing non-printable character", () => {
    expect(main("name.c­­m")).toBe(false);
  });

  // 6.1.27
  test("Domain part, TDL non-printable character not as first or last character", () => {
    expect(main("name.co­­")).toBe(false);
  });

  // 6.2.1
  test("Domain part, SLD with digit not as first or last character", () => {
    expect(main("examp1e.com")).toBe(true);
  });

  // 6.2.2
  test("Domain part, SLD with leading digit", () => {
    expect(main("1example.com")).toBe(true);
  });

  // 6.2.3
  test("Domain part, SLD with trailing digit", () => {
    expect(main("example1.com")).toBe(true);
  });

  // 6.2.4
  test("Domain part, all-numeric SLD", () => {
    expect(main("123.com")).toBe(true);
  });

  // 6.2.5
  test("Domain part, TLD with digit not as first or last character", () => {
    expect(main("example.c1om")).toBe(true);
  });

  // 6.2.6
  test("Domain part, TLD with leading digit", () => {
    expect(main("example.1com")).toBe(true);
  });

  // 6.2.7
  test("Domain part, TLD with trailing digit", () => {
    expect(main("example.com1")).toBe(false);
  });

  // 6.2.8
  test("Domain part, all-numeric TLD", () => {
    expect(main("example.123")).toBe(false);
  });

  // Hyphen rules
  // 6.3.1
  test("Domain part, hyphen not as first or last character in SDL", () => {
    expect(main("exam-ple.com")).toBe(true);
  });

  // 6.3.2
  test("Domain part, leading hyphen in SDL", () => {
    expect(main("-example.com")).toBe(false);
  });

  // 6.3.3
  test("Domain part, trailing hyphen in SDL", () => {
    expect(main("example-.com")).toBe(false);
  });

  // 6.3.4
  test("Domain part, consecutive hyphens in SDL", () => {
    expect(main("exam--ple.com")).toBe(false);
  });

  // 6.3.5
  test("Domain part, TLD hyphen not as first or last character", () => {
    expect(main("example.co-m")).toBe(true);
  });

  // 6.3.6
  test("Domain part, TLD leading hyphen", () => {
    expect(main("example.-com")).toBe(false);
  });

  // 6.3.7
  test("Domain part, TLD trailing hyphen", () => {
    expect(main("example.com-")).toBe(false);
  });

  // 6.3.8
  test("Domain part, TLD 2 consecutive hyphens", () => {
    expect(main("example.c--m")).toBe(false);
  });

  // 6.4.1
  test("Domain part, no dot", () => {
    expect(main("examplecom")).toBe(false);
  });

  // 6.4.3
  test("Domain part, 2 non-consecutive dots", () => {
    expect(main("example.com.uy")).toBe(true);
  });

  // 6.4.4
  test("Domain part, 2 consecutive dots", () => {
    expect(main("example..com")).toBe(false);
  });

  // 6.4.5
  test("Domain part, leading dot", () => {
    expect(main(".example.com")).toBe(false);
  });

  // 6.4.6
  test("Domain part, trailing dot", () => {
    expect(main(" example.com.")).toBe(false);
  });

  // 6.5.1
  test("Domain part, valid IP address", () => {
    expect(main("123.123.123.123")).toBe(true);
  });

  // 6.5.2
  test("Domain part, invalid IP addres", () => {
    expect(main("123.123.123.12345678")).toBe(false);
  });

  // 6.6.1
  test("Domain part, SLD leading underscore", () => {
    expect(main("_example.com")).toBe(false);
  });

  // 6.6.2
  test("Domain part, SLD trailing underscore", () => {
    expect(main("example_.com")).toBe(false);
  });

  // 6.6.3
  test("Domain part, SLD not as first or last character", () => {
    expect(main("exam_ple.com")).toBe(false);
  });

  // 6.6.4
  test("Domain part, TLD leading underscore", () => {
    expect(main("example._com")).toBe(false);
  });

  // 6.6.5
  test("Domain part, TLD trailing underscore", () => {
    expect(main("example.com_")).toBe(false);
  });

  // 6.6.6
  test("Domain part, TLD underscore not as firt or last character", () => {
    expect(main("example.co_m")).toBe(false);
  });

  // 6.7.1
  test("Domain part, leading blank space in SDL", () => {
    expect(main(" example.com")).toBe(false);
  });

  // 6.7.2
  test("Domain part, trailing blank space in SDL", () => {
    expect(main("example .com")).toBe(false);
  });

  // 6.7.3
  test("Domain part, space not as first or last character in SDL", () => {
    expect(main("exam ple.com")).toBe(false);
  });

  // 6.7.4
  test("Domain part, leading blank space in TDL", () => {
    expect(main("example. com")).toBe(false);
  });

  // 6.7.5
  test("Domain part, trailing blank space in TDL", () => {
    expect(main("name@example.com ")).toBe(false);
  });

  // 6.7.6
  test("Domain part, space not as first or last character in TDL", () => {
    expect(main("example.c om")).toBe(false);
  });
});
