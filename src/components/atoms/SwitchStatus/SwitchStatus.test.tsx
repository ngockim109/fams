import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "antd";
import SwitchStatus from "./SwitchStatus";

describe("Switch Status Component", () => {
  // Test case: Rendering SwitchStatus component
  test("should render SwitchStatus component", () => {
    // Arrange
    render(
      <Form>
        <SwitchStatus name="ActivateReserving" label="Activate reserving" />
      </Form>
    );

    // Act
    const switchElement = screen.getByRole("switch", {
      name: /Activate reserving/i,
    });

    // Assert
    expect(switchElement).toBeInTheDocument();
  });

  // Test case: Switching student status to reserve
  test("should switch student status to reserve when the switch is true", () => {
    // Arrange
    render(
      <Form>
        <SwitchStatus name="ActivateReserving" label="Activate reserving" />
      </Form>
    );

    // Act
    const switchElement = screen.getByRole("switch", {
      name: /Activate reserving/i,
    });

    // Trigger switch change
    fireEvent.click(switchElement);

    // Assert
    expect(switchElement).toBeChecked();
  });

  // Test case: Keeping student status as before when the switch is false
  test("should keep student status as before when the switch is false", () => {
    // Arrange
    render(
      <Form>
        <SwitchStatus name="ActivateReserving" label="Activate reserving" />
      </Form>
    );

    // Act
    const switchElement = screen.getByRole("switch", {
      name: /Activate reserving/i,
    });

    // Trigger switch change
    fireEvent.click(switchElement);

    // Reset the switch
    fireEvent.click(switchElement);

    // Assert
    expect(switchElement).not.toBeChecked();
  });
});
