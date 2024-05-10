import formatDate from "../../../utils/DateFormatting";

describe("formatDate function", () => {
  test("should convert date from Ant Design DatePicker format to dd/MM/yyyy format", () => {
    const testCases = [
      { input: "2024-04-17", expected: "17/04/2024" },
      { input: "2023-12-31", expected: "31/12/2023" },
    ];

    // Iterate through test cases and run assertions
    testCases.forEach(({ input, expected }) => {
      const result = formatDate(input);
      expect(result).toBe(expected);
    });
  });
});
