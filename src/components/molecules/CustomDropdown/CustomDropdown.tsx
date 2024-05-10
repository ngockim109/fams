import React from "react";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import DisableStudent from "../DisableStudent/DisableStudent";
import EditUser from "../../organisms/EditUser/EditUser";
import DisableUser from "../../atoms/DisableUser/DisableUser";
import {
  CommonButton,
  MoreButton,
} from "../../atoms/CustomButton/CustomButton";
import DisableStudentInClass from "../../atoms/DisableStudentInClass/DisableStudentInClass";
import DeleteEmail from "../../atoms/DeleteEmail/DeleteEmail";
import EditStudentInClass from "../../templates/EditStudentInClass/EditStudentInClass";
import { useSingleUserStore } from "../../../store/UserStore";

interface CustomDropdownProps {
  handleDataChange: () => void;
  id?: string;
  viewLink?: string;
  editLink?: string;
  isDelete?: boolean;
  textView?: string;
  textEdit?: string;
  isEditUser?: boolean;
  isDeleteUser?: boolean;
  isEdit?: boolean;
  isDeleteStudentInClass?: boolean;
  isDeleteEmail?: boolean;
  classId?: string;
  isEditStudentInClass?: boolean;
  isEnableUser?: boolean;
}
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  viewLink,
  editLink,
  isDelete,
  textEdit,
  textView,
  handleDataChange,
  isEditUser,
  isDeleteUser,
  isEdit,
  isDeleteStudentInClass,
  isDeleteEmail,
  classId,
  isEditStudentInClass,
  isEnableUser,
}) => {
  const { putSingleUser } = useSingleUserStore();
  const data = [{ path: `/Status`, value: "Active", op: "replace" }];

  const handleEnableUser = () => {
    putSingleUser(data, id ?? "");
    handleDataChange();
  };
  let items: MenuProps["items"] = [
    {
      key: "1",
      label: id ? (
        <Link to={`${viewLink}/${id}`} rel="noopener noreferrer">
          <CommonButton text={textView || "View"} />
        </Link>
      ) : (
        <CommonButton text={textView || "View"} />
      ),
    },
  ];
  if (!isEditUser && isEdit) {
    items = [
      ...items,
      {
        key: "2",
        label: id ? (
          <Link to={`${editLink}/${id}`} rel="noopener noreferrer">
            <CommonButton text={textEdit || "Edit"} />
          </Link>
        ) : (
          <CommonButton text={textEdit || "Edit"} />
        ),
      },
    ];
  }
  if (isDelete) {
    items = [
      ...items,
      {
        key: "3",
        label: (
          <DisableStudent
            id={id !== undefined ? id : ""}
            handleDataChange={handleDataChange}
          />
        ),
      },
    ];
  }
  if (isDeleteEmail) {
    items = [
      ...items,
      {
        key: "3",
        label: (
          <DeleteEmail
            id={id !== undefined ? id : ""}
            handleDataChange={handleDataChange}
          />
        ),
      },
    ];
  }
  if (isEditUser) {
    items = [
      ...items,
      {
        key: "4",
        label: (
          <EditUser
            id={id !== undefined ? id : ""}
            handleDataChange={handleDataChange}
          />
        ),
      },
    ];
  }
  if (isEditStudentInClass) {
    items = [
      ...items,
      {
        key: "5",
        label: (
          <EditStudentInClass
            handleDataChange={handleDataChange}
            studentId={id ?? ""}
            classId={classId ?? ""}
          />
        ),
      },
    ];
  }
  if (isDeleteUser) {
    items = [
      ...items,
      {
        key: "6",
        label: (
          <DisableUser
            id={id !== undefined ? id : ""}
            handleDataChange={handleDataChange}
          />
        ),
      },
    ];
  }
  if (isEnableUser) {
    items = [
      ...items,
      {
        key: "5",
        label: (
          <Button
            id={id !== undefined ? id : ""}
            onClick={handleEnableUser}
            className="btn btn--enable"
          >
            Enable
          </Button>
        ),
      },
    ];
  }
  if (isDeleteStudentInClass) {
    items = [
      ...items,
      {
        key: "7",
        label: (
          <DisableStudentInClass
            id={id !== undefined ? id : ""}
            classId={classId !== undefined ? classId : ""}
            handleDataChange={handleDataChange}
          />
        ),
      },
    ];
  }

  const getPopupContainer = (triggerNode: HTMLElement) =>
    triggerNode.parentNode as HTMLElement;
  return (
    <div>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        arrow
        getPopupContainer={getPopupContainer}
      >
        <MoreButton onClick={(e) => e.preventDefault()} />
      </Dropdown>
    </div>
  );
};

CustomDropdown.defaultProps = {
  id: "",
  viewLink: "",
  editLink: "",
  isDelete: false,
  textEdit: "Edit",
  textView: "View",
  isEditUser: false,
  isDeleteUser: false,
  isEdit: true,
  isDeleteStudentInClass: false,
  isDeleteEmail: false,
  classId: "",
  isEditStudentInClass: false,
  isEnableUser: false,
};
export default CustomDropdown;
