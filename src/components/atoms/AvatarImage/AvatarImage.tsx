import React from "react";
import { Space } from "antd";
import Colors from "../../../constants/Colors";
import "../../../styles/main.scss";

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

interface AvatarImageProps {
  ImageUrl: string | null;
  FullName: string;
  isImage: boolean;
}

const AvatarImage: React.FC<AvatarImageProps> = ({
  ImageUrl,
  FullName,
  isImage,
}) => (
  <Space>
    {isImage && ImageUrl !== "" && ImageUrl ? (
      <img
        src={ImageUrl}
        alt={FullName}
        className="avatar-container"
        data-testid="avatar-image"
      />
    ) : (
      <div
        className="centered avatar-container"
        style={{ backgroundColor: generateColor(FullName || "") }}
      >
        {FullName && (
          <span className="avatar-initial">
            {FullName.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    )}
  </Space>
);

export default AvatarImage;
