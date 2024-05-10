import React from "react";
import { Space, Typography } from "antd";
import AvatarImage from "../../atoms/AvatarImage/AvatarImage";
import "../../../styles/abstracts/_sizes.scss";
import "./StudentAvatar.scss";

const { Title } = Typography;

interface StudentAvatarProps {
  Id: string;
  FullName: string;
  isImage: boolean;
  ImageUrl: string;
}

const StudentAvatar: React.FC<StudentAvatarProps> = ({
  isImage,
  Id,
  FullName,
  ImageUrl,
}) => (
  <Space className="user-avatar" data-testid="user-avatar">
    <div className="largeAvatar">
      <div className="large-avatar-image">
        <AvatarImage
          ImageUrl={ImageUrl}
          FullName={FullName}
          isImage={isImage}
        />
      </div>
      <div className="info-text">
        <Title>{FullName}</Title>
        <Title level={4}>{Id}</Title>
      </div>
    </div>
  </Space>
);

export default StudentAvatar;
