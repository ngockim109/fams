import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { IClass } from "../../../interfaces/class.interface";
import StudentScoresManagement from "../../pages/StudentScoresManagement/StudentScoresManagement";
import ClassDetailHeader from "../../molecules/ClassDetailHeader/ClassDetailHeader";
import "./ClassDetailInfo.scss";
import ClassGeneralCard from "../../templates/ClassGeneralCard/ClassGeneralCard";
import StudentsClassManagement from "../../pages/StudentsClassManagement/StudentsClassManagement";

interface ClassDetailInfoProps {
  classDetail: IClass;
}

const ClassDetailInfo: React.FC<ClassDetailInfoProps> = ({ classDetail }) => {
  const tabsItems: TabsProps["items"] = [
    {
      key: "student_class",
      label: "Students In Class",
      children: <StudentsClassManagement />,
    },
    {
      key: "student_scores",
      label: "Students Scores",
      children: <StudentScoresManagement />,
    },
  ];

  return (
    <div className="classinfo" data-testid="class-detail-info">
      <ClassDetailHeader classDetail={classDetail} hideSendEmail={false} />
      <div className="classdata">
        <div className="duration">
          <div className="classtitle"> Duration</div>
          <div className="data">{classDetail.Duration} days</div>
        </div>
        <div className="location">
          <div className="classtitle"> Location</div>
          <div className="data">{classDetail.Location}</div>
        </div>
        <div className="createdate">
          <div className="classtitle"> Created on</div>
          <div className="data">{classDetail.CreatedDate}</div>
          <div className="bywho">by {classDetail.CreatedBy}</div>
        </div>
        <div className="updatedate">
          <div className="classtitle"> Updated on</div>
          <div className="data">{classDetail.UpdatedDate}</div>
          <div className="bywho">by {classDetail.UpdatedBy}</div>
        </div>
      </div>

      <div className="class-general-calendar">
        <div className="class-general-calendar__card">
          <ClassGeneralCard classInfo={classDetail} />
        </div>
      </div>
      <div className="classtab">
        <Tabs
          data-testid="class-tabs"
          defaultActiveKey="student_class"
          items={tabsItems}
        />
      </div>
    </div>
  );
};
export default ClassDetailInfo;
