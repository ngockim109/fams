import { render, screen } from "@testing-library/react";
import DetailGeneralInfo from "./DetailGeneralInfo";

describe("DetailGeneralInfo Component", () => {
  const mockInfos = [
    {
      key: "info1",
      children: [
        {
          key: "child1",
          children: [
            {
              key: "item1",
              name: "John Doe",
            },
            {
              key: "item2",
              name: "Male",
            },
          ],
        },
      ],
    },
    {
      key: "info2",
      children: [
        {
          key: "child2",
          children: [
            {
              key: "item3",
              name: "21",
            },
          ],
        },
      ],
    },
  ];

  test("renders general information correctly", () => {
    render(<DetailGeneralInfo infos={mockInfos} />);

    // Check if the general information content is rendered
    const generalInfoContent = screen.getByTestId("general-info-content");
    expect(generalInfoContent).toBeInTheDocument();

    // Check if each section (info1, info2) is rendered
    const info1Section = screen.getByTestId("info-container-info1");
    const info2Section = screen.getByTestId("info-container-info2");

    expect(info1Section).toBeInTheDocument();
    expect(info2Section).toBeInTheDocument();

    // Check if each column within sections is rendered
    const column1 = screen.getByTestId("column-child1");
    const column2 = screen.getByTestId("column-child2");

    expect(column1).toBeInTheDocument();
    expect(column2).toBeInTheDocument();

    // Check if each info item within columns is rendered with the correct content
    const item1 = screen.getByText("John Doe");
    const item2 = screen.getByText("Male");
    const item3 = screen.getByText("21");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });
});
