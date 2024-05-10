import { render } from "@testing-library/react";
import UserForm from "./UserForm";

describe("UserForm Component", () => {
  it("renders without crashing", () => {
    const onFinish = () => {};
    const setIsReset = () => {};
    render(
      <UserForm
        onFinish={onFinish}
        formName="testForm"
        isReset={false}
        setIsReset={setIsReset}
      />
    );
  });
});
