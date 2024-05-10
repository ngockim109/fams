import { render, screen } from "@testing-library/react";
import StudentDetailGeneralInfo from "./StudentDetailGeneralInfo";
import MockStudent from "../../../test-data/Students/MockStudent";

describe("StudentDetailGeneralInfo component", () => {
  const studentDetail = MockStudent[0];
  test("Renders strong tags correctly", () => {
    render(<StudentDetailGeneralInfo studentDetail={studentDetail} />);

    expect(screen.getByText("Phone")).toContainHTML("strong");
    expect(screen.getByText("Email")).toContainHTML("strong");
    expect(screen.getByText("Gender")).toContainHTML("strong");
    expect(screen.getByText("Date of Birth")).toContainHTML("strong");
    expect(screen.getByText("Area")).toContainHTML("strong");
    expect(screen.getByText("Address")).toContainHTML("strong");
    expect(screen.getByText("Status")).toContainHTML("strong");
  });
});
