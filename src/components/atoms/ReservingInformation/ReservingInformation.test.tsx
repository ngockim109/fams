import { render, screen, waitFor } from "@testing-library/react";
import ReservingInformation from "./ReservingInformation";
import MockReservedStudent from "../../../test-data/Students/MockReservedStudent";

const reservedStudent = MockReservedStudent[0];

describe("ReservingInformation component", () => {
  test("renders reserving information correctly", async () => {
    render(<ReservingInformation data={reservedStudent} />);

    // Check if period information is rendered
    await waitFor(() => {
      // Check if period information is rendered
      const startDateElement = screen.getByText(
        (content, element) =>
          // Use a custom text matcher function to match the date format
          content.includes(reservedStudent.StartDate) &&
          element?.tagName.toLowerCase() === "div"
      );
      expect(startDateElement).toBeInTheDocument();
    });
    await waitFor(() => {
      // Check if period information is rendered
      const endDateElement = screen.getByText(
        (content, element) =>
          // Use a custom text matcher function to match the date format
          content.includes(reservedStudent.EndDate) &&
          element?.tagName.toLowerCase() === "div"
      );
      expect(endDateElement).toBeInTheDocument();
    });

    // Check if the reason is rendered
    const reasonElement = screen.getByText(
      (content, element) =>
        // Use a custom text matcher function to match the reason format
        content.includes(reservedStudent.Reason) &&
        element?.tagName.toLowerCase() === "div"
    );
    expect(reasonElement).toBeInTheDocument();
    // Check if reserving conditions are rendered
    const condition1Element = screen.getByText(
      reservedStudent.Conditions[0].Name
    );
    expect(condition1Element).toBeInTheDocument();

    const condition2Element = screen.getByText(
      reservedStudent.Conditions[1].Name
    );
    expect(condition2Element).toBeInTheDocument();
  });
});
