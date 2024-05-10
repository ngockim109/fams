import { useState } from "react";
import UpdateStudentStatusDropdown from "../../molecules/UpdateStudentStatusDropdown/UpdateStudentStatusDropdown";
import UpdateStudentStatusModal from "../../molecules/UpdateStudentStatusModal/UpdateStudentStatusModal";
import { IStudentClass } from "../../../interfaces/student-class.interface";
import { useStudentClassStore } from "../../../store/StudentClassStore";

interface UpdateStudentStatusProps {
  studentSelect: IStudentClass[];
  isSelectedStudent?: boolean;
  handleDataChange: () => void;
}

const UpdateStudentClassStatus = ({
  studentSelect,
  isSelectedStudent,
  handleDataChange,
}: UpdateStudentStatusProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusStudent, setStatusStudent] = useState("Finish");
  const { putStudentClassStatus } = useStudentClassStore();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const studentNeedUpdateStatusInClass = studentSelect?.map((student) => ({
      ClassId: student.ClassId,
      StudentId: student.StudentId,
      CurrentStatus: student.AttendingStatus,
      NewStatus: statusStudent,
      Reason: "",
      Conditions: [],
    }));

    putStudentClassStatus(studentNeedUpdateStatusInClass);
    handleDataChange();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <UpdateStudentStatusDropdown
        showModal={showModal}
        isSelectedStudent={isSelectedStudent}
      />
      <UpdateStudentStatusModal
        studentSelect={studentSelect}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        setStatusStudent={setStatusStudent}
      />
    </div>
  );
};

UpdateStudentClassStatus.defaultProps = {
  isSelectedStudent: false,
};

export default UpdateStudentClassStatus;
