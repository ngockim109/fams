import { render, screen } from "@testing-library/react";
import FormRadio from "./FormRadio";

describe("FormRadio component", () => {
  const list = [
    { id: "1", value: "Male", name: "Male" },
    { id: "2", value: "Female", name: "Female" },
  ];

  const label = "Select Role";
  const rules = [{ required: true, message: "Please select a role" }];
  const name = "role";

  it("renders with default role as Trainer", () => {
    render(<FormRadio list={list} label={label} rules={rules} name={name} />);

    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText("Female")).toBeInTheDocument();
  });

  it("displays the correct label", () => {
    render(<FormRadio list={list} label={label} rules={rules} name={name} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
