import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../utils/GenerateErrorMessage";

describe("generateErrorMessage function", () => {
  it("generates the correct error message", () => {
    const action = "fetch";
    const obj = "data";
    const errorMessage = generateErrorMessage(action, obj);

    expect(errorMessage).toBe("Failed to fetch data. Please try again later.");
  });
});

describe("generateSuccessMessage function", () => {
  it("generates the correct success message", () => {
    const action = "delete";
    const obj = "record";
    const successMessage = generateSuccessMessage(action, obj);

    expect(successMessage).toBe("record delete successfully!");
  });
});
