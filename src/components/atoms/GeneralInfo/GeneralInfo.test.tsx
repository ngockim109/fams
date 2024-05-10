import { render, screen, fireEvent } from "@testing-library/react";
import GeneralInfo from "./GeneralInfo";

// Mocking fetchProvinces function
vi.mock("../../../store/ProvinceStore", () => ({
  useProvinceStore: () => ({
    fetchProvinces: vi.fn(),
    loading: false,
    province: [
      { id: 1, name: "Province A" },
      { id: 2, name: "Province B" },
    ],
  }),
}));

describe("GeneralInfo component", () => {
  test("renders correctly in edit mode", () => {
    render(<GeneralInfo isEdit />);
    expect(screen.getByLabelText(/ID/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
  });

  test("displays error message when age is less than 18", () => {
    render(<GeneralInfo />);
    const datePicker = screen.getByLabelText(/Date of Birth/);
    fireEvent.change(datePicker, { target: { value: "03/10/2010" } });
    expect(
      screen.queryByText("Age must be greater than or equal 18")
    ).not.toBeInTheDocument();
  });

  test("validates phone number format", () => {
    render(<GeneralInfo />);
    const phoneInput = screen.getByLabelText(/Phone/);
    fireEvent.change(phoneInput, { target: { value: "123456789" } });
    expect(
      screen.queryByText("Invalid phone number format")
    ).not.toBeInTheDocument();
  });
  test("renders correctly in view mode", () => {
    render(<GeneralInfo />);
    expect(screen.queryByLabelText(/ID/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
  });
});
