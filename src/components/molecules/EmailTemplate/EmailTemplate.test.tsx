import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmailTemplate from "./EmailTemplate";
import { IUser } from "../../../interfaces/user.interface";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import MockUser from "../../../test-data/Users/MockUser";
import MockReservedStudent from "../../../test-data/Students/MockReservedStudent";

interface LocalStorageData {
  [key: string]: string | undefined;
}

const localStorageMock = {
  data: {} as LocalStorageData,
  getItem(key: string | number) {
    return this.data[key] || null;
  },
  setItem(key: string | number, value: string) {
    this.data[key] = value;
  },
  clear() {
    this.data = {};
  },
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

test("EmailTemplate renders without crashing", () => {
  const mockUser: IUser = MockUser[0];
  const mockReservedStudent: IReservedStudent = MockReservedStudent[0];
  const mockHandleOpenRemind = vi.fn();
  const mockHandleCloseRemind = vi.fn();
  const setOpenRemind = vi.fn();

  localStorageMock.data.userInfo = JSON.stringify({});

  render(
    <MemoryRouter>
      <EmailTemplate
        data={mockUser}
        open
        handleOpenRemind={mockHandleOpenRemind}
        handleCloseRemind={mockHandleCloseRemind}
        modalTitle="Test Modal"
        setOpenRemind={setOpenRemind}
      />
    </MemoryRouter>
  );

  render(
    <MemoryRouter>
      <EmailTemplate
        data={mockReservedStudent}
        open
        handleOpenRemind={mockHandleOpenRemind}
        handleCloseRemind={mockHandleCloseRemind}
        modalTitle="Test Modal"
        setOpenRemind={setOpenRemind}
      />
    </MemoryRouter>
  );
});
