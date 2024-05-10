import React, { Dispatch, SetStateAction } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddUser from "./AddUser";

describe("AddUser", () => {
  // Mock useState hook
  const useStateMock = <T,>(
    initialValue: T
  ): [T, Dispatch<SetStateAction<T>>] => {
    let value: T = initialValue;
    const setValue: Dispatch<SetStateAction<T>> = (
      newValue: SetStateAction<T>
    ) => {
      if (typeof newValue === "function") {
        value = (newValue as (prevState: T) => T)(value);
      } else {
        value = newValue;
      }
    };
    return [value, setValue];
  };

  beforeAll(() => {
    Object.defineProperty(React, "useState", { value: useStateMock });
  });

  it("should open modal when Add User button is clicked", async () => {
    render(<AddUser handleDataChange={() => {}} />);
    fireEvent.click(screen.getByText("Add User"));
    await waitFor(() => {
      expect(screen.getByText("Add a new user")).toBeInTheDocument();
    });
  });
});
