import React, { useEffect } from "react";
import type { TabsProps } from "antd";
import { Empty, Layout, Tabs } from "antd";
import "./FormAttendeeDetail.scss";
import { Link } from "react-router-dom";
import { IStudent } from "../../../interfaces/student.interface";
import StudentAvatar from "../StudentAvatar/StudentAvatar";
import StudentDetailGeneralInfo from "../StudentDetailGeneralInfo/StudentDetailGeneralInfo";
import StudentDetailAcademicInfo from "../../atoms/StudentDetailAcademicInfo/StudentDetailAcademicInfo";
import ClassDetailInfoModal from "../../atoms/ClassDetailInfoModal/ClassDetailInfoModal";
import ScoreInClassesOfStudent from "../ScoreAllClassesOfStudent/ScoreInClassesOfStudent";
import ReservationEmailTable from "../../templates/ReservationEmailTable/ReservationEmailTable";
import { useActivityLogStore } from "../../../store/ActivityLogStore";
import EmptyDescription from "../../../constants/EmptyDescription";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import { useReservedStudentStore } from "../../../store/ReservedStudentStore";
import ReserveInformationTabs from "../ReserveInformationTabs/ReserveInformationTabs";

interface FormAttendeeDetailProps {
  studentDetail: IStudent;
}

const { Content } = Layout;

const FormAttendeeDetail: React.FC<FormAttendeeDetailProps> = ({
  studentDetail,
}) => {
  const { activityLogs, fetchActivityLogByStudentID, loading } =
    useActivityLogStore();
  const { getAllReserveClass, reservedStudent } = useReservedStudentStore();
  useEffect(() => {
    fetchActivityLogByStudentID(studentDetail.StudentId);
    getAllReserveClass(studentDetail.StudentId);
  }, [
    studentDetail.StudentId,
    fetchActivityLogByStudentID,
    getAllReserveClass,
  ]);
  console.log(reservedStudent);
  const tabsInfoItems: TabsProps["items"] = [
    {
      key: "general-info",
      label: "General information",
      children: <StudentDetailGeneralInfo studentDetail={studentDetail} />,
    },
    {
      key: "academic-info",
      label: "Academic information",
      children: (
        <StudentDetailAcademicInfo
          studentDetail={studentDetail}
          graduatedDate={studentDetail?.GraduatedDate}
        />
      ),
    },
  ];
  const tabsItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Scores",
      children:
        studentDetail?.Classes?.length === 0 ? (
          <Empty description={EmptyDescription.ClassScoreInformation} />
        ) : (
          <ScoreInClassesOfStudent attendeeID={studentDetail.StudentId} />
        ),
    },
    {
      key: "2",
      label: "Activity logs",
      children: (
        <ReservationEmailTable
          activityLogs={activityLogs ?? []}
          loading={loading}
        />
      ),
    },
  ];
  const tabsReserving: TabsProps["items"] =
    reservedStudent?.map((reserveInfo, index) => ({
      key: index.toString(),
      label: reserveInfo.ClassId,
      children: <ReserveInformationTabs reserveStudent={reserveInfo} />,
    })) ?? [];
  return (
    <div>
      <Layout className="form-detail-container">
        {/* First frame for basic information */}
        <Content className="basic-info-frame wrapper-frame-custom">
          <StudentAvatar
            isImage={
              studentDetail.AvatarUrl !== null || studentDetail.AvatarUrl !== ""
            }
            FullName={studentDetail.FullName}
            Id={studentDetail.StudentId}
            ImageUrl={studentDetail.AvatarUrl}
          />
        </Content>

        {/* Second frame for tabs */}
        <Content className=" wrapper-frame-custom">
          <Tabs defaultActiveKey="generalInfo" items={tabsInfoItems} />
        </Content>

        {/* Third frame for classes */}
        <Content className="classes-frame wrapper-frame-custom">
          <div className="subtitle2-bold class-title">Class information</div>
          {studentDetail?.Classes.length === 0 ? (
            <Empty description={EmptyDescription.ClassStudent} />
          ) : (
            <div className="studentclass">
              {studentDetail?.Classes.map((classItem) => (
                <Link
                  to={`${RouterEndpoints.ClassesManagement}/${classItem.ClassId}`}
                  key={classItem.ClassId}
                >
                  <ClassDetailInfoModal
                    key={classItem.ClassId}
                    studentClass={classItem}
                  />
                </Link>
              ))}
            </div>
          )}
        </Content>

        <Content className="wrapper-frame-custom">
          <Tabs defaultActiveKey="Reserving" items={tabsItems} />
        </Content>
      </Layout>

      <Content className="wrapper-frame-custom">
        <div className="subtitle2-bold ">Reserving Information</div>
        {reservedStudent && reservedStudent?.length === 0 ? (
          <Empty description={EmptyDescription?.ReservedStudentsInformation} />
        ) : (
          <Tabs items={tabsReserving} />
        )}
      </Content>
    </div>
  );
};

export default FormAttendeeDetail;
