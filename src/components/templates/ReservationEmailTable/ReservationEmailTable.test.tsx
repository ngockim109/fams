import { render, screen } from "@testing-library/react";
import ReservationEmailTable from "./ReservationEmailTable";
import MockEmail from "../../../test-data/Emails/MockEmail";

// Mock activity logs data
const mockActivityLogs = MockEmail;

describe("ReservationEmailTable Component", () => {
  test("renders table with activity logs", () => {
    render(
      <ReservationEmailTable activityLogs={mockActivityLogs} loading={false} />
    );

    // Check if the table renders
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});
