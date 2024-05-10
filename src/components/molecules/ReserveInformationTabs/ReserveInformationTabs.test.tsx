import { render, screen } from "@testing-library/react";
import ReserveInformationTabs from "./ReserveInformationTabs";
import MockReservedStudent from "../../../test-data/Students/MockReservedStudent";

test("ReserveInformationTabs renders correctly", () => {
  const reservedStudent = MockReservedStudent[0];

  render(<ReserveInformationTabs reserveStudent={reservedStudent} />);

  expect(screen.getByText("Reserving information")).toBeInTheDocument();
});

test("ReserveInformationTabs renders correctly with different props", () => {
  const reservedStudent = MockReservedStudent[0];

  render(<ReserveInformationTabs reserveStudent={reservedStudent} />);

  expect(screen.getByText("Reserving information")).toBeInTheDocument();
});
