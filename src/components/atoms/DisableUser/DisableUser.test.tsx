import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DisableUser from "./DisableUser";
import { useSingleUserStore } from "../../../store/UserStore";

// Mock the actual implementation of useSingleUserStore
useSingleUserStore.setState({
  aUser: null,
  loading: false,
  getUserByID: () => {},
  postSingleUser: async () => {},
  putSingleUser: async () => {},
  deleteSingleUser: async () => {}, // Mocked as an async function
});

describe("DisableUser Component", () => {
  it("renders DisableUser correctly", async () => {
    // Mock dependencies
    const mockId = "testUserId";
    const mockHandleDataChange = () => {};

    // Mock deleteSingleUser function
    const originalDeleteSingleUser =
      useSingleUserStore.getState().deleteSingleUser;
    useSingleUserStore.setState({
      ...useSingleUserStore.getState(),
      deleteSingleUser: async (id: string) => {
        await originalDeleteSingleUser(id);
        mockHandleDataChange(); // Call the mock function
      },
    });

    // Render the component
    render(<DisableUser id={mockId} handleDataChange={mockHandleDataChange} />);

    // Act
    const deleteButton = screen.getByText("Disable");
    fireEvent.click(deleteButton);

    // Assert
    await waitFor(() => {
      // Check that mockHandleDataChange is called
      expect(mockHandleDataChange).toBeTruthy();
    });
  });
});
