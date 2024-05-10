/** This is function handles validate score input fields.
 * It makes sure that the score field is valid number
 * in range 0-10 and has 1 decimal place
 */
import { Rule, RuleObject } from "antd/es/form";

const scoreValidator = (_: RuleObject, value: number): Promise<void> => {
  // Check if the value is empty and if it's required
  if (!value && value !== 0) {
    return Promise.resolve();
  }

  // Validate score is number
  if (Number.isNaN(value)) {
    return Promise.reject(new Error("Please enter a number."));
  }

  // Validate score greater than or equal to 0

  if (value < 0) {
    return Promise.reject(
      new Error("Score must be greater than or equal to 0.")
    );
  }

  // Validate score less than or equal to 10

  if (value > 10) {
    return Promise.reject(new Error("Score must be less than or equal to 10."));
  }

  // Validate score to 1 decimal place
  const decimalCount = (value.toString().split(".")[1] || []).length;
  if (decimalCount > 1) {
    return Promise.reject(new Error("Score must be up to 1 decimal place."));
  }

  return Promise.resolve();
};

const rules: Rule[] = [{ validator: scoreValidator }];

export default rules;
