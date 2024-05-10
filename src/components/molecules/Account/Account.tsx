import { Avatar, Button, Popover } from "antd";
import React from "react";
import "./Account.scss";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import Sizes from "../../../constants/Sizes";
import { useAuthStore } from "../../../store/AuthStore";
import { errorNotify } from "../../atoms/Notify/Notify";
import { getUserInfo } from "../../../utils/JWTAuth";
import Colors from "../../../constants/Colors";

const Account: React.FC = () => {
  const userAvatar = localStorage.getItem("imgUrl");
  const userName = getUserInfo().fullname;
  const [open, setOpen] = React.useState(false);
  const { postLogout } = useAuthStore();

  const handleChange = () => setOpen(!open);
  const handleClickContent = () => setOpen(false);
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      postLogout(token);
    } else {
      errorNotify("Failed to Logout. Please try again later");
    }
    handleClickContent();
  };

  const content = (
    <div className="content-user">
      <Link to="/profile" className="link">
        <Button className="body1 btn" onClick={handleClickContent}>
          <FaUserCircle size={Sizes.LgMedium} />
          Profile
        </Button>
      </Link>
      <Button className="body1 btn " onClick={handleLogout}>
        <IoMdLogOut size={Sizes.LgMedium} />
        Log out
      </Button>
    </div>
  );
  const generateColor = (name: string): string => {
    const colors = [
      Colors.Yellow,
      Colors.Green,
      Colors.Blue,
      Colors.Orange,
      Colors.DarkGreen,
      Colors.Pink,
    ];
    const charCodeSum = name
      .split("")
      .reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
    const index = charCodeSum % colors.length;
    return colors[index];
  };
  return (
    <Popover
      arrow={false}
      trigger="click"
      open={open}
      onOpenChange={handleChange}
      content={content}
      placement="bottom"
    >
      <div className="avatar centered">
        {userAvatar ? (
          <Avatar src={userAvatar} size={50} />
        ) : (
          localStorage.getItem("token") && (
            <div
              className="centered avatar-header-container"
              style={{ backgroundColor: generateColor(userName || "") }}
            >
              {userName && (
                <span className="avatar-header-initial">
                  {userName.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
          )
        )}
        <div className="user-name centered" id="userNameAvatar">
          <p>{userName}</p>
          <MdKeyboardArrowDown size={20} />
        </div>
      </div>
    </Popover>
  );
};

export default Account;
