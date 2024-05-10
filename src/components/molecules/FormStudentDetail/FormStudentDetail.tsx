import React, { useState } from "react";
import { Empty, Layout, Tabs } from "antd";
import type { TabsProps } from "antd";
import "./FormStudentDetail.scss";
import StudentDetailAcademicInfo from "../../atoms/StudentDetailAcademicInfo/StudentDetailAcademicInfo";
import StudentDetailScoreInfo from "../../atoms/StudentDetailScoreInfo/StudentDetailScoreInfo";
import StudentAvatar from "../StudentAvatar/StudentAvatar";
import StudentDetailGeneralInfo from "../StudentDetailGeneralInfo/StudentDetailGeneralInfo";
import { IStudentClass } from "../../../interfaces/student-class.interface";
import { IModuleAssignmentScore } from "../../../interfaces/module-assignment-score.interface";
import EmptyDescription from "../../../constants/EmptyDescription";

interface FormStudentDetailProps {
  studentDetail: IStudentClass;
  studentScore: IModuleAssignmentScore[];
  className: string;
  classId: string;
  studentId: string;
}

const { Content } = Layout;

const FormStudentDetail: React.FC<FormStudentDetailProps> = ({
  studentDetail,
  studentScore,
  className,
  classId,
  studentId,
}) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("generalInfo");

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const tabsItems: TabsProps["items"] = [
    {
      key: "generalInfo",
      label: "General Information",
      children: <StudentDetailGeneralInfo studentDetail={studentDetail} />,
    },
    {
      key: "academicInfo",
      label: "Academic Info",
      children: (
        <StudentDetailAcademicInfo
          studentDetail={studentDetail}
          certificationDate={studentDetail?.CertificationDate}
          certificationStatus={studentDetail?.CertificationStatus}
          gpaLevel={studentDetail?.GPALevel}
          result={studentDetail?.Result}
        />
      ),
    },
  ];

  return (
    <Layout className="form-detail-container">
      {/* First frame for basic information */}
      <Content className="basic-info-frame">
        <StudentAvatar
          isImage={
            studentDetail.AvatarUrl !== null || studentDetail.AvatarUrl !== ""
          }
          FullName={studentDetail.FullName}
          Id={studentId ?? ""}
          ImageUrl={studentDetail.AvatarUrl}
        />
      </Content>

      {/* Second frame for tabs */}
      <Content className="tabs-frame">
        <Tabs
          defaultActiveKey={activeTabKey}
          items={tabsItems}
          onChange={handleTabChange}
        />
      </Content>

      {/* Third frame for scores */}
      <Content className="score-frame">
        {studentScore && studentScore.length === 0 ? (
          <Empty description={EmptyDescription.Score} />
        ) : (
          <StudentDetailScoreInfo
            className={className}
            classId={classId}
            studentScore={studentScore}
          />
        )}
      </Content>
    </Layout>
  );
};

export default FormStudentDetail;
