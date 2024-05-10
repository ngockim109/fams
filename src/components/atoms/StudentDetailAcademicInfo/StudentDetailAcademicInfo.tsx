import React from "react";
import "./StudentDetailAcademicInfo.scss";
import { IStudent } from "../../../interfaces/student.interface";
import {
  handleFirstLetterUpperCaseAndBackspace,
  handleNumberShown,
  handleStringShown,
} from "../../../utils/HandleDataShown";
import { IStudentClass } from "../../../interfaces/student-class.interface";
import StatusTag from "../StatusTag/StatusTag";

interface StudentDetailAcademicInfoProps {
  studentDetail: IStudent | IStudentClass;
  graduatedDate?: string;
  certificationDate?: string;
  certificationStatus?: string;
  gpaLevel?: string;
  result?: string;
}
interface InfosValuesColumnsProps {
  key: string;
  name: string | number | React.ReactElement | React.ReactNode;
}
interface InfosProps {
  key: string;
  children: {
    key: string;
    children: InfosValuesColumnsProps[];
  }[];
}

const StudentDetailAcademicInfo: React.FC<StudentDetailAcademicInfoProps> = ({
  studentDetail,
  graduatedDate,
  certificationDate,
  certificationStatus,
  gpaLevel,
  result,
}) => {
  // Group columns 1
  // Create arrays to render condition columns title
  const titleColumns = [
    { key: "1", name: <strong>University</strong> },
    { key: "2", name: <strong>Major</strong> },
    { key: "3", name: <strong>GPA</strong> },
    { key: "4", name: <strong>FA Account</strong> },
  ];
  // Create arrays to render condition columns value
  const valueColumns: InfosValuesColumnsProps[] = [
    { key: "1", name: handleStringShown(studentDetail.University) },
    { key: "2", name: handleStringShown(studentDetail.Major) },
    { key: "3", name: handleNumberShown(studentDetail.GPA) },
    { key: "4", name: handleStringShown(studentDetail.FAAccount) },
  ];

  // Group columns 2
  const titleAdditionalColumns = [];
  const valueAdditionalColumns = [];

  graduatedDate !== "" &&
    titleAdditionalColumns.push({
      key: "4",
      name: <strong>Graduation Time</strong>,
    });
  certificationDate !== "" &&
    titleAdditionalColumns.push({
      key: "5",
      name: <strong>Certification Date</strong>,
    });
  certificationStatus !== "" &&
    titleAdditionalColumns.push({
      key: "6",
      name: <strong>Certification Status</strong>,
    });
  gpaLevel !== "" &&
    titleAdditionalColumns.push({ key: "7", name: <strong>GPA Level</strong> });
  result !== "" &&
    titleAdditionalColumns.push({ key: "8", name: <strong>Result</strong> });

  graduatedDate !== "" &&
    valueAdditionalColumns.push({
      key: "5",
      name: handleStringShown(graduatedDate ?? ""),
    });
  certificationDate !== "" &&
    valueAdditionalColumns.push({
      key: "6",
      name:
        certificationDate === "No Information" ? (
          <StatusTag status="default" />
        ) : (
          handleStringShown(certificationDate ?? "")
        ),
    });
  certificationStatus !== "" &&
    valueAdditionalColumns.push({
      key: "7",
      name: (
        <StatusTag
          status={handleFirstLetterUpperCaseAndBackspace(
            certificationStatus ?? ""
          )}
          content={handleFirstLetterUpperCaseAndBackspace(
            certificationStatus ?? ""
          )}
        />
      ),
    });

  gpaLevel !== "" &&
    valueAdditionalColumns.push({
      key: "8",
      name: (
        <StatusTag
          status={handleFirstLetterUpperCaseAndBackspace(gpaLevel ?? "")}
          content={handleFirstLetterUpperCaseAndBackspace(gpaLevel ?? "")}
        />
      ),
    });
  result !== "" &&
    valueAdditionalColumns.push({
      key: "9",
      name: (
        <StatusTag
          status={handleFirstLetterUpperCaseAndBackspace(result ?? "")}
          content={handleFirstLetterUpperCaseAndBackspace(result ?? "")}
        />
      ),
    });
  const infos: InfosProps[] = [
    {
      key: "1",
      children: [
        {
          key: "1",
          children: titleColumns,
        },
        {
          key: "2",
          children: valueColumns,
        },
      ],
    },
    {
      key: "2",
      children: [
        {
          key: "3",
          children: titleAdditionalColumns,
        },
        {
          key: "4",
          children: valueAdditionalColumns,
        },
      ],
    },
  ];

  return (
    <div
      data-testid="academic-info-content"
      className="academic-info-container"
    >
      {/* Academic Information content */}
      <div className="info-container">
        {infos.map((info) => (
          <div key={info.key} className={`info-container-${info.key}`}>
            {info.children.map((child) => (
              <div key={child.key} className={`column-${child.key}`}>
                {child.children.map((item) => (
                  <div key={item.key} className="info-item">
                    {item.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

StudentDetailAcademicInfo.defaultProps = {
  graduatedDate: "",
  certificationDate: "",
  certificationStatus: "",
  gpaLevel: "",
  result: "",
};

export default StudentDetailAcademicInfo;
