import {
  getCompareCurrentTime,
  getCompareConvertDate,
} from "../../../utils/CompareTime";

describe("getCompareCurrentTime function", () => {
  test("returns a string in the format YYYY/MM/DD HH:MM", () => {
    const result = getCompareCurrentTime();
    const regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/;
    expect(result).toMatch(regex);
  });
});

describe("getCompareConvertDate function", () => {
  test("returns a string in the format YYYY/MM/DD HH:MM", () => {
    const result = getCompareConvertDate(Date.now() / 1000);
    const regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/;
    expect(result).toMatch(regex);
  });
});
