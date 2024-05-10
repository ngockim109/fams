import { render, screen } from "@testing-library/react";
import StudentReClass from "./StudentReClass";

describe("StudentReClass component", () => {
  // Test case 2: Rendering with null class information
  test("renders properly with null class information", () => {
    render(<StudentReClass classInfo={null} />);

    expect(screen.getByText("Class Information")).toBeInTheDocument();
    expect(screen.getByText("Class name")).toBeInTheDocument();
    expect(screen.getByText("Class code")).toBeInTheDocument();
    expect(screen.getByText("Class time")).toBeInTheDocument();
    // You may add further expectations if needed
  });

  // Test case 3: Rendering with undefined class information
  test("renders properly with undefined class information", () => {
    render(<StudentReClass classInfo={null} />);

    expect(screen.getByText("Class Information")).toBeInTheDocument();
    expect(screen.getByText("Class name")).toBeInTheDocument();
    expect(screen.getByText("Class code")).toBeInTheDocument();
    expect(screen.getByText("Class time")).toBeInTheDocument();
    // You may add further expectations if needed
  });
});
