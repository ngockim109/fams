import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import FormAttendeeDetail from "../../molecules/FormAttendeeDetail/FormAttendeeDetail";
import { useSingleStudentStore } from "../../../store/StudentStore";
import "../../../styles/main.scss";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const AttendeeDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const { aStudent, getStudentByID } = useSingleStudentStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        await Promise.all([getStudentByID(id)]);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getStudentByID]);

  if (!id) {
    return null;
  }

  if (loading || !aStudent) {
    return (
      <div className="spin-container" data-testid="loading-spinner">
        <Spin />
      </div>
    );
  }

  return (
    <div className="student-detail">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <FormAttendeeDetail studentDetail={aStudent} />
    </div>
  );
};

export default AttendeeDetail;
