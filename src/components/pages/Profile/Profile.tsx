import React, { useEffect } from "react";
import { Spin } from "antd";
import UserInfo from "../../organisms/UserInfo/UserInfo";
import { useSingleUserStore } from "../../../store/UserStore";
import { getUserInfo } from "../../../utils/JWTAuth";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const Profile: React.FC = () => {
  const { aUser, getUserByID, loading } = useSingleUserStore();

  useEffect(() => {
    const userId = getUserInfo().uid;
    if (userId) {
      getUserByID(userId);
    }
  }, [getUserByID]);

  if (loading || !aUser) {
    return (
      <div>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <UserInfo userDetail={aUser} />
    </>
  );
};

export default Profile;
