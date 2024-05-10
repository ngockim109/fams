import { getCourseStatus, getUserStatus } from "../../../utils/GenerateStatus";

describe("getCourseStatus", () => {
  test('should return "Passed" when status is true', () => {
    expect(getCourseStatus(true)).toBe("Passed");
  });

  test('should return "Passed" when status is 1', () => {
    expect(getCourseStatus(1)).toBe("Passed");
  });

  test('should return "Failed" when status is false', () => {
    expect(getCourseStatus(false)).toBe("Failed");
  });

  test('should return "Failed" when status is 0', () => {
    expect(getCourseStatus(0)).toBe("Failed");
  });

  test('should return "-" when status is undefined', () => {
    expect(getCourseStatus(undefined)).toBe("-");
  });
});

describe("getUserStatus", () => {
  test('should return "Active" when status is true', () => {
    expect(getUserStatus(true)).toBe("Active");
  });

  test('should return "Inactive" when status is false', () => {
    expect(getUserStatus(false)).toBe("Inactive");
  });

  test('should return "-" when status is undefined', () => {
    expect(getUserStatus(undefined)).toBe("-");
  });
});
