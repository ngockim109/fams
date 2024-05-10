// Importing the notification functions
import * as ReactToastify from "react-toastify";
import { infoNotify, successNotify, errorNotify } from "./Notify";

// Mocking the react-toastify module

vi.mock("react-toastify");

// Test Case 1: Info Notification
test("Info Notification Test", () => {
  const content = "This is an info notification";
  const toastInfoSpy = vi.spyOn(ReactToastify.toast, "info");

  infoNotify(content);

  expect(toastInfoSpy).toHaveBeenCalledWith(content, expect.any(Object));
});

// Test Case 2: Success Notification
test("Success Notification Test", () => {
  const content = "This is a success notification";
  const toastSuccessSpy = vi.spyOn(ReactToastify.toast, "success");

  successNotify(content);

  expect(toastSuccessSpy).toHaveBeenCalledWith(content, expect.any(Object));
});

// Test Case 3: Error Notification
test("Error Notification Test", () => {
  const content = "This is an error notification";
  const toastErrorSpy = vi.spyOn(ReactToastify.toast, "error");

  errorNotify(content);

  expect(toastErrorSpy).toHaveBeenCalledWith(content, expect.any(Object));
});
