import React from "react";
import DetailGeneralInfo from "../../atoms/DetailGeneralInfo/DetailGeneralInfo";
import generateGender from "../../../utils/GenerateGender";
import { IUser } from "../../../interfaces/user.interface";
import StatusTag from "../../atoms/StatusTag/StatusTag";

interface UserDetailGeneralInfoProps {
  userDetail: IUser;
}

const UserDetailGeneralInfo: React.FC<UserDetailGeneralInfoProps> = ({
  userDetail,
}) => {
  const gender = generateGender(userDetail?.Gender);
  const infos = [
    {
      key: "1",
      children: [
        {
          key: "1",
          children: [
            { key: "1", name: <strong>Email</strong> },
            { key: "2", name: <strong>Phone</strong> },
            { key: "3", name: <strong>Gender</strong> },
            { key: "4", name: <strong>Date of Birth</strong> },
          ],
        },
        {
          key: "2",
          children: [
            { key: "1", name: userDetail.Email },
            { key: "2", name: userDetail.Phone },
            { key: "3", name: gender },
            { key: "4", name: userDetail.DOB },
          ],
        },
      ],
    },
    {
      key: "2",
      children: [
        {
          key: "3",
          children: [
            { key: "1", name: <strong>Role</strong> },
            { key: "2", name: <strong>Status</strong> },
          ],
        },
        {
          key: "4",
          children: [
            {
              key: "1",
              name: userDetail.Role,
            },
            {
              key: "2",
              name: (
                <StatusTag
                  status={userDetail.Status}
                  content={userDetail.Status}
                />
              ),
            },
          ],
        },
      ],
    },
  ];
  return <DetailGeneralInfo infos={infos} />;
};

export default UserDetailGeneralInfo;
