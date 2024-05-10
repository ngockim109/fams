import { render, fireEvent } from "@testing-library/react";
import ReservingReason from "./ReservingReason";

const reservingReasonMock = [
  { Id: "1", Name: "Reason 1" },
  { Id: "2", Name: "Reason 2" },
];

describe("ReservingReason component", () => {
  it('should render select dropdown and input textarea when "Others" is selected', () => {
    const handleSelectOptionChange = () => {};
    const { getByLabelText, getByPlaceholderText } = render(
      <ReservingReason
        reservingReason={reservingReasonMock}
        isOtherReasonHidden
        handleSelectOptionChange={handleSelectOptionChange}
      />
    );

    // Check if select dropdown is rendered
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const selectDropdown = getByLabelText("Reserving reason");
    expect(selectDropdown).toBeInTheDocument();

    // Simulate selecting "Others" option
    fireEvent.change(selectDropdown, { target: { value: "Others" } });

    // Check if input textarea is rendered
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputTextarea = getByPlaceholderText("Please enter other reason");
    expect(inputTextarea).toBeInTheDocument();
  });
});
