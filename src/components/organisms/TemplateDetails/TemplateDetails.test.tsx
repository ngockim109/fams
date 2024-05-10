import { render, screen } from "@testing-library/react";
import TemplateDetails from "./TemplateDetails";

describe("TemplateDetails Component", () => {
  test("renders email name input field", () => {
    render(
      <TemplateDetails
        isEdit={false}
        createdByData=""
        createdOnData=""
        onCategoryChange={() => {}}
      />
    );
    const emailNameInput = screen.getByPlaceholderText("Enter email name");
    expect(emailNameInput).toBeInTheDocument();
  });

  test("renders description textarea field", () => {
    render(
      <TemplateDetails
        isEdit={false}
        createdByData=""
        createdOnData=""
        onCategoryChange={() => {}}
      />
    );
    const descriptionTextarea =
      screen.getByPlaceholderText("Enter description");
    expect(descriptionTextarea).toBeInTheDocument();
  });

  test("renders category select field", () => {
    render(
      <TemplateDetails
        isEdit={false}
        createdByData=""
        createdOnData=""
        onCategoryChange={() => {}}
      />
    );
    const categorySelect = screen.getByLabelText("Category");
    expect(categorySelect).toBeInTheDocument();
  });
});
