import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormAttendeeDetail from "./FormAttendeeDetail";
import MockStudent from "../../../test-data/Students/MockStudent"; // Import the mock student data

test("FormAttendeeDetail renders without crashing", () => {
  // Select the first student from the mock data
  const mockStudent = MockStudent[0];

  render(
    <MemoryRouter>
      <FormAttendeeDetail studentDetail={mockStudent} />
    </MemoryRouter>
  );
});
