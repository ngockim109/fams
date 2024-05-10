import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useSingleClassStore } from "../../../store/ClassStore";
import "../../../styles/main.scss";
import ClassDetailInfo from "../../atoms/ClassDetailInfo/ClassDetailInfo";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const ClassDetail: React.FC = () => {
  const { id } = useParams();
  const { aClass, getClassByID, loading } = useSingleClassStore();

  useEffect(() => {
    getClassByID(id ?? "");
  }, [id, getClassByID]);
  if (!id) {
    return null;
  }

  if (loading || !aClass) {
    return (
      <div className="spin-container">
        <Spin />
      </div>
    );
  }
  return (
    <div className="class-detail">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <ClassDetailInfo classDetail={aClass} />
    </div>
  );
};

export default ClassDetail;
