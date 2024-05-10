import { render, screen } from "@testing-library/react";
import TableHeader from "./TableHeader";

describe("TableHeader Component", () => {
  test("renders with default props", () => {
    render(
      <TableHeader
        title="Template details"
        isExport={false}
        isImport={false}
        isSearch={false}
        isHeaderBottom={false}
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
    );
    expect(screen.getByText("Template details")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    render(
      <TableHeader
        title="Custom Title"
        isExport={false}
        isImport={false}
        isSearch={false}
        isHeaderBottom={false}
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.queryByText("Export")).not.toBeInTheDocument();
    expect(screen.queryByText("Import")).not.toBeInTheDocument();
  });
});
