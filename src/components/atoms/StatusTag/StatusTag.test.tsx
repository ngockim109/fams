import { render, screen } from "@testing-library/react";
import StatusTag from "./StatusTag";

// Test cases
test("renders StatusTag component with 'Active' status", () => {
  // Render the component with 'Active' status
  render(<StatusTag status content="Active" />);

  // Check if status tag with 'Active' content is rendered
  const statusTagElement = screen.getByText("Active");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Finish' status", () => {
  // Render the component with 'Finish' status
  render(<StatusTag status content="Finish" />);

  // Check if status tag with 'Finish' content is rendered
  const statusTagElement = screen.getByText("Finish");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Disable' status", () => {
  // Render the component with 'Disable' status
  render(<StatusTag status content="Disable" />);

  // Check if status tag with 'Disable' content is rendered
  const statusTagElement = screen.getByText("Disable");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'In class' status", () => {
  // Render the component with 'In class' status
  render(<StatusTag status content="In class" />);

  // Check if status tag with 'In class' content is rendered
  const statusTagElement = screen.getByText("In class");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Reserve' status", () => {
  // Render the component with 'Reserve' status
  render(<StatusTag status content="Reserve" />);

  // Check if status tag with 'Reserve' content is rendered
  const statusTagElement = screen.getByText("Reserve");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Drop out' status", () => {
  // Render the component with 'Drop out' status
  render(<StatusTag status content="Drop out" />);

  // Check if status tag with 'Drop out' content is rendered
  const statusTagElement = screen.getByText("Drop out");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Opening' status", () => {
  // Render the component with 'Opening' status
  render(<StatusTag status content="Opening" />);

  // Check if status tag with 'Opening' content is rendered
  const statusTagElement = screen.getByText("Opening");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Inactive' status", () => {
  // Render the component with 'Inactive' status
  render(<StatusTag status="Inactive" content="Inactive" />);

  // Check if status tag with 'Inactive' content is rendered
  const statusTagElement = screen.getByText("Inactive");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Planning' status", () => {
  // Render the component with 'Planning' status
  render(<StatusTag status="Planning" content="Planning" />);

  // Check if status tag with 'Planning' content is rendered
  const statusTagElement = screen.getByText("Planning");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Scheduled' status", () => {
  // Render the component with 'Scheduled' status
  render(<StatusTag status="Scheduled" content="Scheduled" />);

  // Check if status tag with 'Scheduled' content is rendered
  const statusTagElement = screen.getByText("Scheduled");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Completed' status", () => {
  // Render the component with 'Completed' status
  render(<StatusTag status="Completed" content="Completed" />);

  // Check if status tag with 'Completed' content is rendered
  const statusTagElement = screen.getByText("Completed");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Closed' status", () => {
  // Render the component with 'Closed' status
  render(<StatusTag status="Closed" content="Closed" />);

  // Check if status tag with 'Closed' content is rendered
  const statusTagElement = screen.getByText("Closed");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Admin' status", () => {
  // Render the component with 'Admin' status
  render(<StatusTag status="Admin" content="Admin" />);

  // Check if status tag with 'Admin' content is rendered
  const statusTagElement = screen.getByText("Admin");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'Trainer' status", () => {
  // Render the component with 'Trainer' status
  render(<StatusTag status="Trainer" content="Trainer" />);

  // Check if status tag with 'Completed' content is rendered
  const statusTagElement = screen.getByText("Trainer");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with default content '-'", () => {
  // Render the component without specifying content
  render(<StatusTag status={null} />);

  // Check if status tag with default content '-' is rendered
  const statusTagElement = screen.getByText("-");
  expect(statusTagElement).toBeInTheDocument();
});

test("renders StatusTag component with 'false' status", () => {
  // Render the component with 'false' status
  render(<StatusTag status={false} content="False" />);

  // Check if status tag with 'False' content is rendered
  const statusTagElement = screen.getByText("False");
  expect(statusTagElement).toBeInTheDocument();
});
