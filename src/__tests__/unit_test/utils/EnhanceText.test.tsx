import { boldText } from "../../../utils/EnhanceText";

describe("boldText", () => {
  it("should wrap the provided text in <b> tags", () => {
    const text = "Hello, World!";
    const result = boldText(text);
    const expectedResult = <b>Hello, World!</b>;
    expect(result).toEqual(expectedResult);
  });
});
