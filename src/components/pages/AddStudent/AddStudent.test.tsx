import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddStudent from "./AddStudent";

// Mock dependencies as needed
vi.mock("../../../store/StudentStore", () => ({
  useSingleStudentStore: () => ({
    postSingleStudent: vi.fn(),
    newStudent: null,
    getStudentByID: vi.fn(),
    aStudent: null,
  }),
}));

describe("AddStudent Component", () => {
  test("should render without crashing", () => {
    render(
      <BrowserRouter>
        <AddStudent />
      </BrowserRouter>
    );
  });
});
