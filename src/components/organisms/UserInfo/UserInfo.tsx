import React, { useState } from "react";
import { Button, Card, Space } from "antd";
import { IUser } from "../../../interfaces/user.interface";
import AvatarImage from "../../atoms/AvatarImage/AvatarImage";
import "./UserInfo.scss";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import UploadImage from "../../atoms/UploadImage/UploadImage";

interface UserInfoProps {
  userDetail: IUser;
}

interface CardContentProps {
  id: string;
  label: string;
  value: React.ReactNode;
}

interface CardDataProps {
  id: string;
  title: string;
  content: CardContentProps[];
}

const UserInfo: React.FC<UserInfoProps> = ({ userDetail }) => {
  const userAvatar = localStorage.getItem("imgUrl");

  // Define card data
  const cardData: CardDataProps[] = [
    {
      id: "system",
      title: "System",
      content: [
        {
          id: "role",
          label: "Role:",
          value: userDetail.Role,
        },
        {
          id: "status",
          label: "Status:",
          value: (
            <StatusTag status={userDetail.Status} content={userDetail.Status} />
          ),
        },
      ],
    },
    {
      id: "information",
      title: "Information",
      content: [
        {
          id: "gender",
          label: "Gender:",
          value: userDetail.Gender ? "Male" : "Female",
        },
        {
          id: "dob",
          label: "Date of Birth:",
          value: userDetail.DOB,
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      content: [
        {
          id: "email",
          label: "Email:",
          value: userDetail.Email,
        },
        {
          id: "phone",
          label: "Phone:",
          value: userDetail.Phone,
        },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="userinfo-container centered">
        <div className="userinfo-header centered">
          <AvatarImage
            FullName={userDetail?.FullName}
            ImageUrl={userAvatar}
            isImage={
              userDetail?.ImageUrl !== null || userDetail?.ImageUrl !== ""
            }
          />
          <Button type="link" onClick={showModal}>
            Change Avatar
          </Button>
          <h2 className="userinfo-name">{userDetail.FullName}</h2>
          <p className="userinfo-id">ID: {userDetail.Id}</p>
          {isModalOpen && (
            <UploadImage
              isModalOpen={isModalOpen}
              handleCancel={handleCancel}
            />
          )}
        </div>
        <Space wrap className="useinfo-body">
          {cardData.map((card) => (
            <Card key={card.id} className="useinfo-card" title={card.title}>
              {card.content.map((item) => (
                <p className="userinfo-content" key={item.id}>
                  <b className="userinfo-label">{item.label}</b>
                  {item.value}
                </p>
              ))}
            </Card>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default UserInfo;
