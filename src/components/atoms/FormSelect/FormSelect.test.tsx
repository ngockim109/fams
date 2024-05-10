import { render, screen } from "@testing-library/react";
import { Form } from "antd";
import FormSelect from "./FormSelect";

describe("FormSelect component", () => {
  const mockList = [
    { id: "1", value: "trainer", option: "Trainer" },
    { id: "2", value: "student", option: "Student" },
  ];

  test("renders select with provided label", () => {
    render(
      <Form>
        <FormSelect
          name="userType"
          label="User Type"
          rules={[{ required: true, message: "Please select a user type" }]}
          text="Select user type"
          list={mockList}
        />
      </Form>
    );

    expect(screen.getByLabelText("User Type")).toBeInTheDocument();
  });

  test("renders select with required rules", () => {
    render(
      <Form>
        <FormSelect
          name="userType"
          label="User Type"
          rules={[{ required: true, message: "Please select a user type" }]}
          text="Select user type"
          list={mockList}
        />
      </Form>
    );

    const selectElement = screen.getByLabelText("User Type");
    expect(selectElement).toBeRequired();
  });
  test("renders select without required rules", () => {
    render(
      <Form>
        <FormSelect
          name="userType"
          label="User Type"
          rules={[]}
          text="Select user type"
          list={mockList}
        />
      </Form>
    );

    const selectElement = screen.getByLabelText("User Type");
    expect(selectElement).not.toBeRequired();
  });
});
