/* eslint-disable @typescript-eslint/no-explicit-any */
/** This function component is response for handle update scores of one student by
 * passed a student id. User can input all scores and each of these in range 0-10.
 * If not, it will throw an error message. When user input scores on Quiz and
 * ASM columns, it will automatically calculate the average score and reflect in
 * UI when user submit.
 */
import React, { useEffect, useState } from "react";
import { Form, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useScoreStore } from "../../../store/ScoreStore";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import "./EditScore.scss";
import "../../../styles/main.scss";
import "../../atoms/StudentDetailScoreInfo/StudentDetailScoreInfo.scss";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import StudentDetailScoreInfo from "../../atoms/StudentDetailScoreInfo/StudentDetailScoreInfo";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";
import { IModuleAssignmentScore } from "../../../interfaces/module-assignment-score.interface";
import useScoreMockStore from "../../../store/ScoreMockStore";

const EditScore: React.FC = () => {
  const { classId } = useParams<{ classId?: string }>();
  const { studentId } = useParams<{ studentId?: string }>();
  const [scoreDetailData, setScoreDetailData] = useState<
    IModuleAssignmentScore[]
  >([]);
  const { fetchScoreOfStudentInClass, scoreDetail, scoreLoading } =
    useScoreStore();

  const { putStudentScore } = useScoreMockStore();

  useEffect(() => {
    fetchScoreOfStudentInClass(classId ?? "", studentId ?? "");
  }, [classId, fetchScoreOfStudentInClass, studentId]);
  useEffect(() => {
    if (scoreDetail) {
      setScoreDetailData(scoreDetail ?? []);
    }
  }, [scoreDetail]);

  const [form] = useForm();
  const navigate = useNavigate();

  const [isUpdateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (isUpdateSuccess) {
      // Fetch the updated data after the update is successful
      fetchScoreOfStudentInClass(classId ?? "", studentId ?? "");
      setUpdateSuccess((prevState) => !prevState);
    }
  }, [isUpdateSuccess, fetchScoreOfStudentInClass, classId, studentId]);

  // These functions handle form submission.
  const onFinish = async (values: any) => {
    try {
      //   await putStudentScore(values, studentID);
      console.log(values);
      const updatedScoreData: IModuleAssignmentScore[] = scoreDetailData?.map(
        (score: IModuleAssignmentScore) => {
          if (score.AssignmentScore) {
            let totalScore = 0;
            let count = 0;
            // Map over each assignment score and update ScoreValue if found in form values
            const updatedAssignmentScore = score.AssignmentScore.map(
              (assignment) => {
                // Check if the AssignmentName includes "Avg"
                if (assignment?.AssignmentName.includes("Avg")) {
                  console.log(assignment.AssignmentName);
                  // Calculate the average of all previous ScoreValues
                  const avg = count === 0 ? 0 : totalScore / count;
                  count = 0;
                  totalScore = 0;
                  form.setFieldsValue({
                    [assignment.AssignmentName]: parseFloat(avg.toFixed(1)),
                  });

                  // Return a new assignment object with the calculated average
                  return {
                    ...assignment,
                    ScoreValue: parseFloat(avg.toFixed(1)),
                  };
                }
                const assignmentValue = values[assignment.AssignmentName];
                // Check if the AssignmentName does not include "Avg"
                if (!assignment?.AssignmentName.includes("Avg")) {
                  // Update totalScore and count
                  totalScore += Number(assignmentValue) || 0;
                  count += 1;
                }
                return {
                  ...assignment,
                  ScoreValue: Number(assignmentValue),
                };
              }
            );
            // Return updated score with updated AssignmentScore
            return {
              ...score,
              AssignmentScore: updatedAssignmentScore,
            };
          }
          return score; // Return original score if no AssignmentScore
        }
      );
      console.log(updatedScoreData);
      setUpdateSuccess(true);
      putStudentScore(
        {
          StudentId: studentId ?? "",
          Scores: updatedScoreData ?? [],
          GPA: 0,
        },
        studentId ?? ""
      );
      setScoreDetailData(updatedScoreData);
    } catch (err) {
      console.error("Update scores failed: ", err);
    }
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    navigate(`${RouterEndpoints.ClassesManagement}/${classId}`);
  };

  const initialValues = {};

  return scoreLoading ? (
    <div className="spin-container">
      <Spin />
    </div>
  ) : (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      name="EditScore"
      initialValues={initialValues}
    >
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <div className="edit-container-list">Edit Score</div>
      <div className="form-container">
        <StudentDetailScoreInfo
          studentScore={scoreDetailData}
          classId={classId ?? ""}
          className=""
          isEdit
        />
      </div>
      <div className="centered">
        <FormFooter handleCancel={handleCancel} formName="EditScore" />
      </div>
    </Form>
  );
};

export default EditScore;
