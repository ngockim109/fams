import { Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { HiOutlinePencil } from "react-icons/hi";
import { ActionButton } from "../../atoms/CustomButton/CustomButton";

interface UpdateStudentStatusDropdownProps {
  showModal?: () => void;
  isSelectedStudent?: boolean;
}

const UpdateStudentStatusDropdown = ({
  showModal,
  isSelectedStudent,
}: UpdateStudentStatusDropdownProps) => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };
  const items: MenuProps["items"] = [
    {
      label: isSelectedStudent ? (
        <Tooltip title="You must choose students before update student status">
          Update status student
        </Tooltip>
      ) : (
        "Update status student"
      ),
      key: "1",
      icon: <HiOutlinePencil />,
      onClick: showModal,
      disabled: isSelectedStudent,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Dropdown menu={menuProps} trigger={["click"]}>
      <ActionButton text="Action" onClick={(e) => e.preventDefault()} />
    </Dropdown>
  );
};

UpdateStudentStatusDropdown.defaultProps = {
  showModal: () => {},
  isSelectedStudent: false,
};
export default UpdateStudentStatusDropdown;
