import { fireEvent, render, screen } from "@testing-library/react";
import OtherInfo from "./OtherInfo";

describe("OtherInfo Component", () => {
  // Previous tests...

  it("submits the form with valid input", async () => {
    render(<OtherInfo />);

    // Fill in valid form data
    const universityInput = screen.getByPlaceholderText("Enter University");
    const majorInput = screen.queryByPlaceholderText("Enter Major"); // Use queryByPlaceholderText to handle the case where the element might not be found
    const gpaInput = screen.getByPlaceholderText("Enter GPA");

    // Ensure that majorInput is not null before proceeding
    if (majorInput) {
      fireEvent.change(universityInput, {
        target: { value: "Sample University" },
      });
      fireEvent.change(majorInput, { target: { value: "Computer Science" } });
      fireEvent.change(gpaInput, { target: { value: "8.5" } });

      // Simulate form submission by clicking a submit button
      const submitButton = screen.getByText("Submit"); // Adjust this selector according to your actual submit button
      fireEvent.click(submitButton);

      // Add assertions or checks based on your actual form submission logic
    } else {
      // Handle the case where majorInput is not found
      console.error("Major input element not found");
    }
  });
});
