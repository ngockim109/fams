import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "./SearchInput";

describe("SearchInput Component", () => {
  const setSearchSignal = vi.fn();
  const setSearchTerm = vi.fn();
  it("renders SearchInput correctly", async () => {
    render(
      <SearchInput
        setSearchSignal={setSearchSignal}
        setSearchTerm={setSearchTerm}
      />
    );

    // Check if the input is rendered
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();

    // Simulate user typing
    fireEvent.change(searchInput, { target: { value: "example" } });

    // Wait for the suggestions to appear
    await waitFor(() => {
      const suggestions = screen.getAllByTestId("search-input-autocomplete");
      expect(suggestions.length).toBeGreaterThan(0);
    });

    // Simulate selecting a suggestion
    const suggestion = screen.getByTestId("search-input-autocomplete");
    fireEvent.click(suggestion);

    // Verify that onSelect callback is called
    // This assumes you have a console.log statement in your onSelect callback
    // Note: If you have a custom onSelect prop, replace the next line accordingly
    await waitFor(() => {
      // Custom logic to verify the onSelect callback
      // Example: expect(handleSelectMock).toHaveBeenCalledWith("example0");
    });
  });
});
