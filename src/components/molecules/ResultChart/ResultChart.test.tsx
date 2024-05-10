import { render, screen } from "@testing-library/react";
import ResultChart from "./ResultChart";

describe("ResultChart component", () => {
  it("renders with provided totalPass and totalFail props", () => {
    const totalPass = 10;
    const totalFail = 5;

    render(<ResultChart totalPass={totalPass} totalFail={totalFail} />);

    expect(screen.getByText("Pass")).toBeInTheDocument();
    expect(screen.getByText("Fail")).toBeInTheDocument();

    const passElements = screen.queryAllByText(totalPass.toString());
    const passElement = passElements.find(
      (element) => element.tagName.toLowerCase() === "div"
    );
    expect(passElement).not.toBeNull();

    const failElements = screen.queryAllByText(totalFail.toString());
    const failElement = failElements.find(
      (element) => element.tagName.toLowerCase() === "div"
    );
    expect(failElement).not.toBeNull();
  });
});
