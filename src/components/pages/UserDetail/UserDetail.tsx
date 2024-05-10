import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Flex, Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import StudentAvatar from "../../molecules/StudentAvatar/StudentAvatar";
import { useSingleUserStore } from "../../../store/UserStore";
import "../../../styles/main.scss";
import UserDetailGeneralInfo from "../../molecules/UserDetailGeneralInfo/UserDetailGeneralInfo";
import { getUserImage } from "../../../services/firebase/storage";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const UserDetail: React.FC = () => {
  const { aUser, getUserByID, loading } = useSingleUserStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const url = await getUserImage(id || "");
      setImageUrl(url);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    getUserByID(id || "");
  }, [id, getUserByID]);

  return loading || !aUser ? (
    <Flex align="center">
      <Spin size="large" />
    </Flex>
  ) : (
    <div>
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <Layout className="form-detail-container">
        {/* First frame for basic information */}
        <Content className="basic-info-frame">
          <StudentAvatar
            FullName={aUser?.FullName}
            Id={aUser?.Id}
            ImageUrl={imageUrl}
            isImage={aUser?.ImageUrl !== null || aUser?.ImageUrl !== ""}
          />
        </Content>

        {/* Second frame for tabs */}
        <Content className="tabs-frame">
          <UserDetailGeneralInfo userDetail={aUser} />
        </Content>
      </Layout>
    </div>
  );
};

export default UserDetail;
