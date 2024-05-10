import {
  validateString,
  validateEmail,
  validatePhoneNumber,
  validateDateFormat,
  validatePassword,
  validateGPA,
  validateDOB,
} from "../../../utils/Validations";

// Test validateString function
test("validateString function", () => {
  // Test for valid input
  expect(validateString("Hello", 10)).toBe(true);
  // Test for invalid input
  expect(validateString("", 10)).toBe(false);
  expect(validateString("Too long string", 5)).toBe(false);
});

// Test validateEmail function
test("validateEmail function", () => {
  // Test for valid email
  expect(validateEmail("test@example.com")).toBe(true);
  // Test for invalid email
  expect(validateEmail("invalid_email")).toBe(false);
});

// Test validatePhoneNumber function
test("validatePhoneNumber function", () => {
  // Test for valid phone number
  expect(validatePhoneNumber("0123456789")).toBe(true);
  // Test for invalid phone number
  expect(validatePhoneNumber("123456")).toBe(false);
});

// Test validateDateFormat function
test("validateDateFormat function", () => {
  // Test for valid date format
  expect(validateDateFormat("01/01/2023")).toBe(true);
  // Test for invalid date format
  expect(validateDateFormat("2023-01-01")).toBe(false);
});

// Test validatePassword function
test("validatePassword function", () => {
  // Test for valid password
  expect(validatePassword("Password@123")).toBe(true);
  // Test for invalid password
  expect(validatePassword("password123")).toBe(false);
});

// Test validateGPA function
test("validateGPA function", () => {
  // Test for valid GPA
  expect(validateGPA(7.5)).toBe(true);
  // Test for invalid GPA
  expect(validateGPA(11)).toBe(false);
});

// Test validateDOB function
test("validateDOB function", () => {
  // Test for valid date of birth
  expect(validateDOB(null, "2000-01-01")).toBe(true);
  // Test for invalid date of birth (less than 18 years old)
  expect(validateDOB(null, "2010-01-01")).toBe(false);
});
