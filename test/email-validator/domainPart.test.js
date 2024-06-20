const { validateDomainPart } = require("../../src/email-validator/domainPart");

describe("Domain Part Validation", () => {
  // Domain part length validation
  test("Domain labels may be no more than 63 octets long", () => {
    const domain = `${"a".repeat(63)}.com`;
    expect(validateDomainPart(domain)).toBe(true);
  });

  // 5.1.1
  test("Domain part, min SDL length of 1 octet", () => {
    expect(validateDomainPart("b.com")).toBe(true);
  });

  // 5.1.2
  test("Domain part, max SDL length of 63 octets", () => {
    const domain = `${"a".repeat(63)}.com`;
    expect(validateDomainPart(domain)).toBe(true);
  });

  // 5.1.3
  test("Domain part, SDL length of more than 63 octets", () => {
    const domain = `${"a".repeat(64)}.com`;
    expect(validateDomainPart(domain)).toBe(false);
  });

  // 5.1.4
  test("Domain part, no SDL", () => {
    expect(validateDomainPart(".com")).toBe(false);
  });

  // 5.1.5
  test("Domain part, no domain", () => {
    expect(validateDomainPart("")).toBe(false);
  });

  // 5.2.1
  test("Domain part, TDL min length of 1 octet", () => {
    expect(validateDomainPart("example.a")).toBe(true);
  });

  // 5.2.2
  test("Domain part, TDL max length of 63 octets", () => {
    const tld = "a".repeat(63);
    expect(validateDomainPart(`example.${tld}`)).toBe(true);
  });

  // 5.2.3
  test("Domain part, TDL of more than 63 octets", () => {
    const tld = "a".repeat(64);
    expect(validateDomainPart(`example.${tld}`)).toBe(false);
  });

  // 5.2.4
  test("Domain part, no TDL", () => {
    expect(validateDomainPart("example")).toBe(false);
  });

  // 5.3.1
  test("Domain part, min length of 3 octets", () => {
    expect(validateDomainPart("a.a")).toBe(true);
  });

  // 5.3.2
  test("Domain part, max length of 253 octets", () => {
    const domain = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(
      63
    )}.${"d".repeat(61)}`;
    expect(validateDomainPart(domain)).toBe(true);
  });

  // 5.3.3
  test("Domain part, more than 253 octets", () => {
    const domain = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(
      63
    )}.${"d".repeat(65)}`;
    expect(validateDomainPart(domain)).toBe(false);
  });

  // Valid characters tests
  // 6.1.1
  test("Domain part, all uppercase", () => {
    expect(validateDomainPart("EXAMPLE.COM")).toBe(true);
  });

  // 6.1.2
  test("Domain part, all lowercase", () => {
    expect(validateDomainPart("example.com")).toBe(true);
  });

  // 6.1.3
  test("Domain part, title case", () => {
    expect(validateDomainPart("Example.Com")).toBe(true);
  });

  // Special character validation - This needs specific implementation in your validateDomainPart function
  // 6.1.4
  test("Domain part, SDL extended ASCII, leading non-latin characters", () => {
    expect(validateDomainPart("çexample.com")).toBe(false);
  });

  // 6.1.5
  test("Domain part, SDL extended ASCII, trailing non-latin characters", () => {
    expect(validateDomainPart("exampleç.com")).toBe(false);
  });

  // 6.1.6
  test("Domain part, SDL extended ASCII, non-latin characters not as first or last character", () => {
    expect(validateDomainPart("canção.com")).toBe(false);
  });

  // 6.1.7
  test("Domain part, TDL extended ASCII, leading non-latin characters", () => {
    expect(validateDomainPart("example.çom")).toBe(false);
  });

  // 6.1.8
  test("Domain part, TDL extended ASCII, trailing non-latin characters", () => {
    expect(validateDomainPart("example.coç")).toBe(false);
  });

  // 6.1.9
  test("Domain part, TDL extended ASCII, non-latin characters not as first or last character", () => {
    expect(validateDomainPart("example.cçm")).toBe(false);
  });

  // 6.1.10
  test("Domain part, SDL Unicode, leading non-latin characters", () => {
    expect(validateDomainPart("中example.com")).toBe(false);
  });

  // 6.1.11
  test("Domain part, SDL Unicode, trailing non-latin characters", () => {
    expect(validateDomainPart("example中.com")).toBe(false);
  });

  // 6.1.12
  test("Domain part, SDL Unicode, non-latin characters not as first or last character", () => {
    expect(validateDomainPart("exam中ple.com")).toBe(false);
  });

  // 6.1.13
  test("Domain part, TDL Unicode, leading non-latin characters", () => {
    expect(validateDomainPart("domain.中om")).toBe(false);
  });

  // 6.1.14
  test("Domain part, TDL Unicode, trailing non-latin characters", () => {
    expect(validateDomainPart("domain.co中")).toBe(false);
  });

  // 6.1.15
  test("Domain part, TDL Unicode, non-latin characters not as first or last character", () => {
    expect(validateDomainPart("domain.c中m")).toBe(false);
  });

  // 6.1.16
  test("Domain part, SDL Unicode, leading emoji", () => {
    expect(validateDomainPart("❤️example.com")).toBe(false);
  });

  // 6.1.17
  test("Domain part, SDL Unicode, trailing emoji", () => {
    expect(validateDomainPart("example❤️.com")).toBe(false);
  });

  // 6.1.18
  test("Domain part, SDL Unicode, emoji not as first or last character", () => {
    expect(validateDomainPart("exam❤️ple.com")).toBe(false);
  });

  // 6.1.19
  test("Domain part, TDL Unicode, leading emoji characters", () => {
    expect(validateDomainPart("domain.❤️om")).toBe(false);
  });

  // 6.1.20
  test("Domain part, TDL Unicode, trailing emoji characters", () => {
    expect(validateDomainPart("domain.co❤️m")).toBe(false);
  });

  // 6.1.21
  test("Domain part, TDL Unicode, emoji not as first or last character", () => {
    expect(validateDomainPart("domain.c❤️m")).toBe(false);
  });

  // 6.1.22
  test("Domain part, SDL leading non-printable character", () => {
    expect(validateDomainPart("name­­.com")).toBe(false);
  });

  // 6.1.23
  test("Domain part, SDL trailing non-printable character", () => {
    expect(validateDomainPart("name­­.com")).toBe(false);
  });

  // 6.1.24
  test("Domain part, SDL non-printable character not as first or last character", () => {
    expect(validateDomainPart("name­­.com")).toBe(false);
  });

  // 6.1.25
  test("Domain part, TDL leading non-printable character", () => {
    expect(validateDomainPart("name.­­om")).toBe(false);
  });

  // 6.1.26
  test("Domain part, TDL trailing non-printable character", () => {
    expect(validateDomainPart("name.c­­m")).toBe(false);
  });

  // 6.1.27
  test("Domain part, TDL non-printable character not as first or last character", () => {
    expect(validateDomainPart("name.co­­")).toBe(false);
  });

  // 6.2.1
  test("Domain part, SLD with digit not as first or last character", () => {
    expect(validateDomainPart("examp1e.com")).toBe(true);
  });

  // 6.2.2
  test("Domain part, SLD with leading digit", () => {
    expect(validateDomainPart("1example.com")).toBe(true);
  });

  // 6.2.3
  test("Domain part, SLD with trailing digit", () => {
    expect(validateDomainPart("example1.com")).toBe(true);
  });

  // 6.2.4
  test("Domain part, all-numeric SLD", () => {
    expect(validateDomainPart("123.com")).toBe(true);
  });

  // 6.2.5
  test("Domain part, TLD with digit not as first or last character", () => {
    expect(validateDomainPart("example.c1om")).toBe(true);
  });

  // 6.2.6
  test("Domain part, TLD with leading digit", () => {
    expect(validateDomainPart("example.1com")).toBe(true);
  });

  // 6.2.7
  test("Domain part, TLD with trailing digit", () => {
    expect(validateDomainPart("example.com1")).toBe(false);
  });

  // 6.2.8
  test("Domain part, all-numeric TLD", () => {
    expect(validateDomainPart("example.123")).toBe(false);
  });

  // Hyphen rules
  // 6.3.1
  test("Domain part, hyphen not as first or last character in SDL", () => {
    expect(validateDomainPart("exam-ple.com")).toBe(true);
  });

  // 6.3.2
  test("Domain part, leading hyphen in SDL", () => {
    expect(validateDomainPart("-example.com")).toBe(false);
  });

  // 6.3.3
  test("Domain part, trailing hyphen in SDL", () => {
    expect(validateDomainPart("example-.com")).toBe(false);
  });

  // 6.3.4
  test("Domain part, consecutive hyphens in SDL", () => {
    expect(validateDomainPart("exam--ple.com")).toBe(false);
  });

  // 6.3.5
  test("Domain part, TLD hyphen not as first or last character", () => {
    expect(validateDomainPart("example.co-m")).toBe(true);
  });

  // 6.3.6
  test("Domain part, TLD leading hyphen", () => {
    expect(validateDomainPart("example.-com")).toBe(false);
  });

  // 6.3.7
  test("Domain part, TLD trailing hyphen", () => {
    expect(validateDomainPart("example.com-")).toBe(false);
  });

  // 6.3.8
  test("Domain part, TLD 2 consecutive hyphens", () => {
    expect(validateDomainPart("example.c--m")).toBe(false);
  });

  // 6.4.1
  test("Domain part, no dot", () => {
    expect(validateDomainPart("examplecom")).toBe(false);
  });

  // 6.4.3
  test("Domain part, 2 non-consecutive dots", () => {
    expect(validateDomainPart("example.com.uy")).toBe(true);
  });

  // 6.4.4
  test("Domain part, 2 consecutive dots", () => {
    expect(validateDomainPart("example..com")).toBe(false);
  });

  // 6.4.5
  test("Domain part, leading dot", () => {
    expect(validateDomainPart(".example.com")).toBe(false);
  });

  // 6.4.6
  test("Domain part, trailing dot", () => {
    expect(validateDomainPart(" example.com.")).toBe(false);
  });

  // 6.5.1
  test("Domain part, valid IP address", () => {
    expect(validateDomainPart("123.123.123.123")).toBe(true);
  });

  // 6.5.2
  test("Domain part, invalid IP addres", () => {
    expect(validateDomainPart("123.123.123.12345678")).toBe(false);
  });

  // 6.6.1
  test("Domain part, SLD leading underscore", () => {
    expect(validateDomainPart("_example.com")).toBe(false);
  });

  // 6.6.2
  test("Domain part, SLD trailing underscore", () => {
    expect(validateDomainPart("example_.com")).toBe(false);
  });

  // 6.6.3
  test("Domain part, SLD not as first or last character", () => {
    expect(validateDomainPart("exam_ple.com")).toBe(false);
  });

  // 6.6.4
  test("Domain part, TLD leading underscore", () => {
    expect(validateDomainPart("example._com")).toBe(false);
  });

  // 6.6.5
  test("Domain part, TLD trailing underscore", () => {
    expect(validateDomainPart("example.com_")).toBe(false);
  });

  // 6.6.6
  test("Domain part, TLD underscore not as firt or last character", () => {
    expect(validateDomainPart("example.co_m")).toBe(false);
  });

  // 6.7.1
  test("Domain part, leading blank space in SDL", () => {
    expect(validateDomainPart(" example.com")).toBe(false);
  });

  // 6.7.2
  test("Domain part, trailing blank space in SDL", () => {
    expect(validateDomainPart("example .com")).toBe(false);
  });

  // 6.7.3
  test("Domain part, space not as first or last character in SDL", () => {
    expect(validateDomainPart("exam ple.com")).toBe(false);
  });

  // 6.7.4
  test("Domain part, leading blank space in TDL", () => {
    expect(validateDomainPart("example. com")).toBe(false);
  });

  // 6.7.5
  test("Domain part, trailing blank space in TDL", () => {
    expect(validateDomainPart("name@example.com ")).toBe(false);
  });

  // 6.7.6
  test("Domain part, space not as first or last character in TDL", () => {
    expect(validateDomainPart("example.c om")).toBe(false);
  });
});
