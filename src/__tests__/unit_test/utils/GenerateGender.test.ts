import generateGender from "../../../utils/GenerateGender";

describe("generateGender function", () => {
  test('returns "Male" when gender is true', () => {
    const gender = true;
    const result = generateGender(gender);
    expect(result).toBe("Male");
  });

  test('returns "Female" when gender is false', () => {
    const gender = false;
    const result = generateGender(gender);
    expect(result).toBe("Female");
  });
});
