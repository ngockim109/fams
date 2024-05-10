import React from "react";
import { IStudent } from "../../../interfaces/student.interface";
import DetailGeneralInfo from "../../atoms/DetailGeneralInfo/DetailGeneralInfo";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import Gender from "../../atoms/Gender/Gender";
import {
  handleFirstLetterUpperCaseAndBackspace,
  handleStringShown,
} from "../../../utils/HandleDataShown";
import { IStudentClass } from "../../../interfaces/student-class.interface";

interface StudentDetailGeneralInfoProps {
  studentDetail: IStudent | IStudentClass;
}

const StudentDetailGeneralInfo: React.FC<StudentDetailGeneralInfoProps> = ({
  studentDetail,
}) => {
  const infos = [
    {
      key: "1",
      children: [
        {
          key: "1",
          children: [
            { key: "1", name: <strong>Phone</strong> },
            { key: "2", name: <strong>Email</strong> },
            { key: "3", name: <strong>Date of Birth</strong> },
            { key: "4", name: <strong>Gender</strong> },
          ],
        },
        {
          key: "2",
          children: [
            { key: "1", name: handleStringShown(studentDetail?.Phone) },
            { key: "2", name: handleStringShown(studentDetail?.Email) },
            { key: "3", name: handleStringShown(studentDetail?.DOB) },
            {
              key: "4",
              name: (
                <div className="gender-in-general">
                  <Gender gender={studentDetail?.Gender} />
                </div>
              ),
            },
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
            { key: "1", name: <strong>Area </strong> },
            { key: "2", name: <strong>Address </strong> },
            { key: "3", name: <strong>Status</strong> },
          ],
        },
        {
          key: "4",
          children: [
            {
              key: "1",
              name: handleStringShown(studentDetail?.Area),
            },
            {
              key: "2",
              name: handleStringShown(studentDetail?.Address),
            },
            {
              key: "3",
              name: (
                <StatusTag
                  status={handleFirstLetterUpperCaseAndBackspace(
                    studentDetail?.Status
                  )}
                  content={handleFirstLetterUpperCaseAndBackspace(
                    studentDetail?.Status
                  )}
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

export default StudentDetailGeneralInfo;
