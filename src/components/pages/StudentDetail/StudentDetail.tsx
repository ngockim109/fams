import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import FormStudentDetail from "../../molecules/FormStudentDetail/FormStudentDetail";
import "../../../styles/main.scss";
import { useSingleStudentClassStore } from "../../../store/StudentClassStore";
import { useScoreStore } from "../../../store/ScoreStore";
import { useSingleClassStore } from "../../../store/ClassStore";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const StudentDetail: React.FC = () => {
  const { classId } = useParams<{ classId?: string }>();
  const { studentId } = useParams<{ studentId?: string }>();
  console.log(classId, studentId);
  const { studentClass, getSingleStudentInClass, loading } =
    useSingleStudentClassStore();
  const { fetchScoreOfStudentInClass, scoreDetail, scoreLoading } =
    useScoreStore();
  const { aClass, getClassByID } = useSingleClassStore();

  useEffect(() => {
    getSingleStudentInClass(classId ?? "", studentId ?? "");
  }, [classId, fetchScoreOfStudentInClass, getSingleStudentInClass, studentId]);
  useEffect(() => {
    fetchScoreOfStudentInClass(classId ?? "", studentId ?? "");
  }, [classId, fetchScoreOfStudentInClass, getSingleStudentInClass, studentId]);

  useEffect(() => {
    classId && classId !== "" && getClassByID(classId);
  }, [classId, getClassByID]);

  return loading || scoreLoading || !studentClass || !scoreDetail ? (
    <div className="spin-container">
      <Spin />
    </div>
  ) : (
    <div className="student-detail">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <FormStudentDetail
        studentDetail={studentClass}
        studentScore={scoreDetail}
        classId={classId || ""}
        className={aClass?.ClassName ?? ""}
        studentId={studentId || ""}
      />
    </div>
  );
};

export default StudentDetail;
