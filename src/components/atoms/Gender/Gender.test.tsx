import { render, screen } from "@testing-library/react";
import Gender from "./Gender";

describe("Gender component", () => {
  test("renders male icon when gender is true", () => {
    render(<Gender gender />);
    const maleIcon = screen.getByTestId("male-icon");
    expect(maleIcon).toBeInTheDocument();
  });

  test("renders female icon when gender is false", () => {
    render(<Gender gender={false} />);
    const IoWomanSharp = screen.getByTestId("female-icon");
    expect(IoWomanSharp).toBeInTheDocument();
  });

  test("renders default male icon when gender is undefined", () => {
    render(<Gender gender />);
    const maleIcon = screen.getByTestId("male-icon");
    expect(maleIcon).toBeInTheDocument();
  });
});
