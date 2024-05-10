import React, { useCallback, useState } from "react";
import { Button, Popover } from "antd";
import { Link } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IUser } from "../../../interfaces/user.interface";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import EmailTemplate from "../../molecules/EmailTemplate/EmailTemplate";
import "./UserDropdown.scss";
import Sizes from "../../../constants/Sizes";
import { SendMailButton } from "../../atoms/CustomButton/CustomButton";
import { getUserInfo } from "../../../utils/JWTAuth";

interface UserDropdownProps {
  userId: string;
  fullName: string;
  phone: string;
  email: string;
}
const UserDropdown: React.FC<UserDropdownProps> = ({
  userId,
  fullName,
  phone,
  email,
}) => {
  const [openRemind, setOpenRemind] = useState<boolean>(false);
  const handleOpenRemind = useCallback(() => {
    setOpenRemind(true);
  }, []);
  const handleCloseRemind = useCallback(() => {
    setOpenRemind(false);
  }, []);
  const user: IUser = {
    Id: userId,
    FullName: fullName,
    Email: email,
    Gender: false,
    DOB: "",
    Address: "",
    Role: "",
    Status: "",
    Phone: phone,
    ImageUrl: "",
    Username: "",
    Password: "",
  };
  const content = (
    <>
      <div className="popover-item">
        <Button className="popover-item__btn" type="text">
          <a rel="noopener noreferrer" href={`tel:${phone}`}>
            <FaPhoneVolume />
            {phone}
          </a>
        </Button>
      </div>
      <div className="popover-item">
        <Button className="popover-item__btn" type="text">
          <a rel="noopener noreferrer" href={`mailto:${email}`}>
            <MdOutlineMailOutline />
            {email}
          </a>
        </Button>
      </div>
      {getUserInfo().role === "Admin" && (
        <div>
          <div className="user-email-container">
            <SendMailButton onClick={handleOpenRemind} text="Send Email" />
            <EmailTemplate
              open={openRemind}
              handleOpenRemind={handleOpenRemind}
              handleCloseRemind={handleCloseRemind}
              data={user}
              modalTitle="Select email template"
              type="Trainer"
              isIndividual
              setOpenRemind={setOpenRemind}
            />
          </div>
        </div>
      )}
    </>
  );
  return (
    <div className="user-link-container">
      {getUserInfo().role === "Admin" ? (
        <Link
          to={`${RouterEndpoints.UserDetailGeneral}${userId}`}
          className="user-link-container__item"
        >
          {fullName}
        </Link>
      ) : (
        <div>{fullName}</div>
      )}
      <Popover content={content} placement="rightTop">
        <div className="btn btn--add-circle btn--information">
          <IoMdInformationCircleOutline size={Sizes.LgMedium} />
        </div>
      </Popover>
    </div>
  );
};

export default UserDropdown;
