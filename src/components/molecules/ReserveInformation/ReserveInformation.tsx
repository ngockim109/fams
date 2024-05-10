import { useCallback, useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import "./ReserveInformation.scss";
import { VscError } from "react-icons/vsc";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import ClassDetailHeader from "../ClassDetailHeader/ClassDetailHeader";
import { useClassStore, useSingleClassStore } from "../../../store/ClassStore";
import { useScoreStore } from "../../../store/ScoreStore";
import { IClass } from "../../../interfaces/class.interface";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";
import FormFooter from "../FormFooter/FormFooter";
import { useReservedStudentSingleStore } from "../../../store/ReservedStudentStore";
import ReservingInformation from "../../atoms/ReservingInformation/ReservingInformation";
import StudentDetailScoreInfo from "../../atoms/StudentDetailScoreInfo/StudentDetailScoreInfo";
import StudentReClass from "../StudentReClass/StudentReClass";
import ClassDetailInfoModal from "../../atoms/ClassDetailInfoModal/ClassDetailInfoModal";

type ReserveInformationProps = {
  data: IReservedStudent;
  close: () => void;
  handleDataChange: () => void;
  updateStatusInClass: () => void;
};
const ReserveInformation = ({
  data,
  close,
  handleDataChange,
  updateStatusInClass,
}: ReserveInformationProps) => {
  const [chooseClass, setChooseClass] = useState<IClass>();
  const [open, setOpen] = useState<boolean>(false);

  const { putReserveStudentInClass } = useReservedStudentSingleStore();
  // const { putSingleStudent } = useSingleStudentStore();
  const { getClassByID, aClass } = useSingleClassStore();
  const { getAllClassToReClass, classes } = useClassStore();
  // const { aScore, getStudentScoreByID } = useSingleScoreStore();
  const { fetchScoreOfStudentInClass, scoreDetail, scoreLoading } =
    useScoreStore();
  const handleCloseReClass = useCallback(() => {
    setOpen(false);
  }, []);
  const handleReClass = () => {
    // putReservedStudent(data?.StudentId, {
    //   ...data,
    //   Status: "In class",
    // });
    putReserveStudentInClass(data?.StudentId, data.ClassId, {
      ClassId: chooseClass?.Id ?? "",
      Status: "InClass",
    });
    handleCloseReClass();
    handleDataChange();
    updateStatusInClass();
    close();
  };
  useEffect(() => {
    getClassByID(data?.ClassId);
    fetchScoreOfStudentInClass(data.ClassId ?? "", data.StudentId ?? "");
    getAllClassToReClass(data.ClassName, data.StudentId);
  }, [
    data?.ClassId,
    getClassByID,
    data?.StudentId,
    data.ClassName,
    getAllClassToReClass,
    fetchScoreOfStudentInClass,
  ]);

  console.log(data.Conditions);

  const loadingClass = !aClass;
  return (
    <div className="root-reserve-modal">
      {loadingClass ? (
        <Spin data-testid="loading-spinner" />
      ) : (
        <ClassDetailHeader classDetail={aClass} hideSendEmail />
      )}
      <hr className="divider-hr" />
      <div className="reserving modal-content-custom">
        {scoreLoading ? (
          <Spin />
        ) : (
          <div className="reserving-score">
            <div className="reserving-title">Student Score</div>
            <div className="reserving-score-table">
              <StudentDetailScoreInfo
                className={data.ClassName}
                classId={data.ClassId}
                studentScore={scoreDetail}
              />
            </div>
          </div>
        )}
        <hr className="divider-hr" />
        <div className="reserving-title">Reserving information</div>
        <ReservingInformation data={data} />
        <div>
          <hr className="divider-hr" />
          <div className="reserving-content-classes">
            <div className="reserving-title">Re-class possibilities</div>
            <div className="reserving-content-classes-info">
              {classes && classes?.length > 0
                ? classes.map((classItem) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                      key={classItem.Id}
                      onClick={() => {
                        setChooseClass(classItem);
                        // close();
                        setOpen(true);
                      }}
                    >
                      <ClassDetailInfoModal classDetail={classItem} />
                    </div>
                  ))
                : "No class on Opening"}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onCancel={handleCloseReClass}
        onOk={handleReClass}
        title={<div className="modal-header-custom centered">Re-class</div>}
        closeIcon={<VscError size={Sizes?.LgMedium} color={Colors?.White} />}
        footer={
          <div className="centered">
            <FormFooter
              handleCancel={handleCloseReClass}
              handleOk={handleReClass}
              text="Re-class"
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <StudentReClass classInfo={chooseClass ?? null} />
        </div>
      </Modal>
    </div>
  );
};

export default ReserveInformation;
