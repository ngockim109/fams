import {
  exportStudentToExcel,
  exportStudentClassToExcel,
  exportScoreToExcel,
  exportReserveStudentToExcel,
  exportUserToExcel,
} from "../../../utils/ExportToExcel";
import MockStudent from "../../../test-data/Students/MockStudent";
import MockStudentClass from "../../../test-data/Students/MockStudentClass";
import MockScore from "../../../test-data/Scores/MockScore";
import MockReservedStudent from "../../../test-data/Students/MockReservedStudent";
import MockUser from "../../../test-data/Users/MockUser";

describe("Export functions", () => {
  it("should export student data to Excel file", () => {
    // Mock columns, assuming you have defined them somewhere
    const columns = [
      { key: "StudentId", title: "Student ID" },
      { key: "FullName", title: "Full Name" },
      { key: "DOB", title: "Date of Birth" },
    ];

    const result = exportStudentToExcel(columns, MockStudent);

    expect(result).toBe(true);
  });

  it("should export student class data to Excel", () => {
    const columns = [
      { key: "StudentId", title: "Student ID" },
      { key: "FullName", title: "Full Name" },
      { key: "DOB", title: "Date of Birth" },
    ];

    const result = exportStudentClassToExcel(columns, MockStudentClass);

    expect(result).toBe(true);
  });

  it("should export score data to Excel", () => {
    const columns = [
      { key: "StudentId", title: "Student ID" },
      { key: "FullName", title: "Full Name" },
      { key: "DOB", title: "Date of Birth" },
    ];

    const result = exportScoreToExcel(columns, MockScore);

    expect(result).toBe(true);
  });

  it("should export reserved student data to Excel", () => {
    const columns = [
      { key: "StudentId", title: "Student ID" },
      { key: "FullName", title: "Full Name" },
      { key: "DOB", title: "Date of Birth" },
    ];

    const result = exportReserveStudentToExcel(columns, MockReservedStudent);

    expect(result).toBe(true);
  });

  it("should export user data to Excel", () => {
    const columns = [
      { key: "StudentId", title: "Student ID" },
      { key: "FullName", title: "Full Name" },
      { key: "DOB", title: "Date of Birth" },
    ];

    const result = exportUserToExcel(columns, MockUser);

    expect(result).toBe(true);
  });
});
