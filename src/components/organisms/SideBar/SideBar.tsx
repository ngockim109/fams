import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Button, Drawer, Menu, MenuProps } from "antd";
import { RiMenu2Line } from "react-icons/ri";
import {
  MdOutlineGroup,
  MdOutlineSchool,
  MdOutlineEmail,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import "./SideBar.scss";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import Sizes from "../../../constants/Sizes";
import { IAccount } from "../../../interfaces/account.interface";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

let userInfo: IAccount | null = null;

try {
  const userInfoString = localStorage.getItem("userInfo");
  if (userInfoString) {
    userInfo = JSON.parse(userInfoString);
  }
} catch (error) {
  console.error("Error parsing userInfo:", error);
}

const typeUser = userInfo?.role ?? "";
const items: MenuItem[] =
  typeUser === "Admin"
    ? [
        getItem(
          "Dashboard",
          RouterEndpoints.Dashboard,
          <MdOutlineSpaceDashboard />
        ),
        getItem("Student management", "students", <MdOutlineGroup />, [
          getItem("Student list", RouterEndpoints.StudentsManagement),
          getItem("Reserve list", RouterEndpoints.ReservedStudents),
        ]),
        getItem(
          "Class management",
          RouterEndpoints.ClassesManagement,
          <MdOutlineSchool size={23} />
        ),
        getItem(
          "Email management",
          RouterEndpoints.EmailsManagement,
          <MdOutlineEmail size={23} />
        ),
        getItem(
          "User management",
          RouterEndpoints.UsersManagement,
          <FaRegUser size={20} />
        ),
      ]
    : [
        getItem(
          "Class management",
          RouterEndpoints.ClassesManagement,
          <MdOutlineSchool size={23} />
        ),
      ];
const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [current, setCurrent] = useState(`${location.pathname}`);
  const handleClick: MenuProps["onClick"] = (e) => {
    navigate(`${e.key}`);
    setCurrent(e.key);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  const onOpenSidebar = () => {
    setOpenSidebar(true);
  };
  const onCloseSidebar = () => {
    setOpenSidebar(false);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (width < 768) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [width]);
  return (
    <div className="sidebar-wrapper">
      {isCollapsed ? (
        <div className={`sidebar-responsive ${openSidebar && "open-sidebar"}`}>
          <div className="wrapper-btn">
            <Button onClick={onOpenSidebar} className="btn-menu">
              <RiMenu2Line size={Sizes.Large} />
            </Button>
          </div>
          <Drawer
            placement="left"
            open={openSidebar}
            onClose={onCloseSidebar}
            getContainer={false}
          >
            <Menu
              onClick={handleClick}
              defaultOpenKeys={[`${location.pathname}`]}
              selectedKeys={[current]}
              mode="inline"
              items={items}
              className={`sidebar-content subtitle1 `}
              subMenuCloseDelay={0.2}
              subMenuOpenDelay={0.2}
            />
          </Drawer>
        </div>
      ) : (
        <div className="sidebar">
          <Menu
            onClick={handleClick}
            defaultOpenKeys={[`${location.pathname}`]}
            selectedKeys={[current]}
            mode="inline"
            items={items}
            className={`sidebar-content subtitle1 `}
            subMenuCloseDelay={0.2}
            subMenuOpenDelay={0.2}
          />
        </div>
      )}
    </div>
  );
};

export default SideBar;
