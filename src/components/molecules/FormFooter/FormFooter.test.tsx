/** This describe block is use for testing footer component with 3 test cases:
 * it should render successfully 2 buttons cancel and submit, when user clicks cancel
 * button, it should call handleCancel function, when user clicks submit button, it
 * should maintained attribute named "form" with a value equal to the variable formName.
 */

import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FormFooter from "./FormFooter";

describe("Form Footer Component", () => {
  // Initializing variables for the test
  const handleCancel = vi.fn();
  const formName = "AddReserving";

  // Test Suite for the FormFooter component
  test("should render FormFooter with buttons", async () => {
    // Arrange
    render(
      <FormFooter
        handleCancel={handleCancel}
        formName={formName}
        text="Create"
      />
    );
    await screen.findByRole("button", { name: /Cancel/i });
    await screen.findByRole("button", { name: /Create/i });
    // Act
    // Assert
  });

  // Test case: Ensure handleCancel is called when Cancel button is clicked
  test("should call handleCancel when Cancel button is clicked", () => {
    // Arrange
    render(
      <FormFooter
        handleCancel={handleCancel}
        formName={formName}
        text="Create"
      />
    );
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    // Act: Simulate a click on the Cancel button
    fireEvent.click(cancelButton);

    // Assert: Verify that handleCancel was called
    expect(handleCancel).toHaveBeenCalled();
  });

  // Test case: Ensure the form attribute is set to formName when Submit button is clicked
  test("should set the form attribute to formName when Submit button is clicked", () => {
    // Arrange
    render(<FormFooter handleCancel={handleCancel} formName={formName} />);
    const submitButton = screen.getByRole("button", { name: /Save/i });

    // Act: Simulate a click on the Submit button
    fireEvent.click(submitButton);

    // Assert: Verify that the form attribute is set correctly
    expect(submitButton).toHaveAttribute("form", formName);
  });
});
