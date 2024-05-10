// Set of test cases for testing various button components
// AddButton, DeleteButton, ActionButton, ImportButton, ExportButton, FilterButton, SubmitButton, CancelButton
import { render, fireEvent, screen } from "@testing-library/react";
import {
  AddButton,
  DeleteButton,
  ActionButton,
  ImportButton,
  ExportButton,
  FilterButton,
  SubmitButton,
  CancelButton,
} from "./CustomButton";

describe("CustomButton Components", () => {
  test("AddButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<AddButton onClick={mockOnClick} text="Add" />);

    const addButton = screen.getByText("Add");
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("DeleteButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<DeleteButton onClick={mockOnClick} text="Delete" />);

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("ActionButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<ActionButton onClick={mockOnClick} text="Action" />);

    const actionButton = screen.getByText("Action");
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("ImportButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<ImportButton onClick={mockOnClick} text="Import" />);

    const importButton = screen.getByText("Import");
    expect(importButton).toBeInTheDocument();

    fireEvent.click(importButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("ExportButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<ExportButton onClick={mockOnClick} text="Export" />);

    const exportButton = screen.getByText("Export");
    expect(exportButton).toBeInTheDocument();

    fireEvent.click(exportButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("FilterButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<FilterButton onClick={mockOnClick} text="Filter" />);

    const filterButton = screen.getByText("Filter");
    expect(filterButton).toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("SubmitButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<SubmitButton onClick={mockOnClick} text="Submit" />);

    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("CancelButton should render correctly and trigger onClick", () => {
    const mockOnClick = vi.fn();
    render(<CancelButton onClick={mockOnClick} text="Cancel" />);

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
