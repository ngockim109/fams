/* eslint-disable @typescript-eslint/no-explicit-any */
/** This function component is Form in Modal with response for add reserving information for
 * student, it accept props is id of student, if id is passed, it will auto generate StudentID,
 * ClassName, ClassCode, Current Modules; else if id is an empty string, it will show a search
 * input that allows user find student information by student ID. If student ID exists, it will
 * auto generate the ClassName, ClassCode, Current Modules. Then user required to input the
 * reserved information including period of reservation, reason and conditions for reservation,
 * status active reservation and student information (StudentID, ClassName, ClassCode,
 * Current Modules). And post this to reserved-students api.
 */
import { Empty, Form } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ReservingCondition from "../../atoms/ReservingCondition/ReservingCondition";
import ReservingReason from "../../atoms/ReservingReason/ReservingReason";
import ReservingPeriod from "../../atoms/ReservingPeriod/ReservingPeriod";
import ReservingStudentSearch from "../../atoms/ReservingStudentSearch/ReservingStudentSearch";
import { useSingleStudentStore } from "../../../store/StudentStore";
import ReservingReasons from "../../../constants/ReservingReasons";
import { IReservingCondition } from "../../../interfaces/reserving-condition.interface";
import { IStudent } from "../../../interfaces/student.interface";
import { useStudentClassStore } from "../../../store/StudentClassStore";
import { IStudentClassStatus } from "../../../interfaces/student-class-status.interface";
import { IClassStudent } from "../../../interfaces/class-student.interface";
import ClassSelection from "../../atoms/ClassSelection/ClassSelection";
import EmptyDescription from "../../../constants/EmptyDescription";

type ReservingFormType = {
  StudentId: string;
  ClassId: string;
  ReservingReasonSelect: string;
  ReservingReasonTextArea: string;
  ReservingPeriod: [null, null];
  Conditions: IReservingCondition[];
  ActivateReserving: boolean;
};

interface AddReservingStudentProps {
  handleOk: () => void;
  student?: IStudent | null;
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  isAddNew?: boolean;
}

const AddReservingStudentForm: React.FC<AddReservingStudentProps> = ({
  id,
  handleOk,
  student,
  isAddNew,
  isReset,
  setIsReset,
}) => {
  // USE STATE
  const [isTextAreaHidden, setIsTextAreaHidden] = useState(true);

  // USE STORES
  const { aStudent, getStudentByID } = useSingleStudentStore();
  const { putStudentClassStatus } = useStudentClassStore();

  const [searchStudentId, setSearchStudentId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [chosenClassId, setChosenClassId] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [studentDetail, setStudentDetail] = useState<IStudent | null>(
    student || null
  );

  const [classes, setClasses] = useState<IClassStudent[]>([]);
  const [classErrorMessage, setClassErrorMessage] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    isAddNew &&
      id !== undefined &&
      id !== "" &&
      id === null &&
      !student &&
      getStudentByID(id);
  }, [getStudentByID, id, isAddNew]);

  useEffect(() => {
    id && setSearchStudentId(id);
  }, [id]);
  useEffect(() => {
    aStudent && setStudentDetail(aStudent);
  }, [aStudent]);

  useEffect(() => {
    searchStudentId === "" && setStudentDetail(null);
    searchStudentId && searchStudentId === "" && setClasses([]);
  }, [searchStudentId]);

  // useEffect to update studentDetail when student prop changes
  useEffect(() => {
    if (student) {
      setStudentDetail(student);
    }
  }, [student]);

  /** Function handles selecting reserved reason,
   *  if user do not select available option but choose others
   *  the text area will show and allow user to input reason
   */
  const handleSelectOptionChange = (value: string) => {
    const showTextArea = value === "Others";
    showTextArea ? setIsTextAreaHidden(false) : setIsTextAreaHidden(true);

    form.setFieldsValue({
      ReservingReasonTextArea: showTextArea ? "" : undefined,
    });
    form.validateFields(["ReservingReasonTextArea"]);
  };

  // Reset form values
  const resetFormValue = () => {
    form.resetFields();
    // setClasses([]);
    setSearchStudentId("");
    setChosenClassId("");
    setCurrentStatus("");
    setIsReset(false);
  };

  // Function handles form submit, get value and send this to api,
  // then reset form fields and close modal
  const onFinish = (values: ReservingFormType) => {
    const selectedReasonKey = values?.ReservingReasonSelect;
    const selectedReason =
      selectedReasonKey === "Others"
        ? values?.ReservingReasonTextArea
        : ReservingReasons?.find(
            (reason: { Id: string }) => reason?.Id === selectedReasonKey
          )?.Name;
    const conditions: IReservingCondition[] = values?.Conditions || [];

    if (!chosenClassId || !currentStatus) {
      setClassErrorMessage("Please choose a class.");
      return; // Prevent form submission
    }
    // Clear any existing error message
    setClassErrorMessage("");

    const reservationData: IStudentClassStatus[] = [
      {
        ClassId: chosenClassId,
        StudentId: values.StudentId,
        CurrentStatus: currentStatus ?? "InClass",
        NewStatus: "Reserve",
        Reason: selectedReason ?? "",
        Conditions: conditions,
      },
    ];
    putStudentClassStatus(reservationData);
    handleOk();
    resetFormValue();
  };

  /** This useEffect will run whenever user input new student id
   * and select search button, this will automatically
   * set class, class id, current modules values after fetching data
   */

  // useEffect(() => {
  //   console.log("aReservedStudent:", aReservedStudent);
  //   form.setFieldsValue({
  //     StudentId: (aReservedStudent as IReservedStudent)?.StudentId || "",
  //     ClassId: (aReservedStudent as IReservedStudent)?.ClassId || "",
  //   });
  // }, [aReservedStudent, form, id]);

  useEffect(() => {
    studentDetail && setClasses(studentDetail?.Classes);
  }, [studentDetail]);

  const handleChooseClass = (chosenId: string, chosenStatus: string) => {
    setChosenClassId(chosenId);
    setCurrentStatus(chosenStatus);
    setSelectedClassId(chosenId);
    console.log(chosenId, chosenStatus);
  };

  useEffect(() => {
    isReset && resetFormValue();
  }, [isReset]);

  console.log(studentDetail);
  console.log(searchStudentId);
  console.log(classes);
  console.log(isReset);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      name="AddReserving"
      initialValues={{
        StudentId: id ?? searchStudentId ?? "",
        CurrentStatus: currentStatus ?? "",
        NewStatus: "Reserve",
        Reason: "",
        Conditions: [],
        ReservingReasonSelect: "",
        ReservingReasonTextArea: "",
        ReservingPeriod: [
          dayjs(new Date()), // Start date
          dayjs(new Date()).add(6, "month").subtract(1, "day"), // End date, 6 months - 1 day from now
        ],
      }}
      variant="filled"
      preserve={false}
      scrollToFirstError
      className="add-reserving-form"
    >
      <ReservingStudentSearch
        id={id}
        getStudentByID={getStudentByID}
        setSearchStudentId={setSearchStudentId}
      />
      {studentDetail && classes?.length === 0 ? (
        <Empty description={EmptyDescription?.ClassReservingInformation} />
      ) : (
        studentDetail &&
        classes?.map((classDetail, index) => (
          <ClassSelection
            key={classDetail?.ClassId ?? index}
            classDetail={classDetail}
            handleChooseClass={handleChooseClass}
            isSelected={classDetail.ClassId === selectedClassId}
          />
        ))
      )}
      {classErrorMessage !== "" && (
        <div className="error-message">{classErrorMessage}</div>
      )}
      <ReservingPeriod />
      <ReservingReason
        reservingReason={ReservingReasons}
        isOtherReasonHidden={isTextAreaHidden}
        handleSelectOptionChange={handleSelectOptionChange}
      />
      <ReservingCondition disable={false} />
    </Form>
  );
};

AddReservingStudentForm.defaultProps = {
  id: "",
  isAddNew: true,
  student: null,
};
export default AddReservingStudentForm;
