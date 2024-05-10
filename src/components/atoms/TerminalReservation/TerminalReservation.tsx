import React, { ReactNode, useCallback, useState } from "react";
import { Button, Popover } from "antd";

import { FaRegHandPaper } from "react-icons/fa";
import { MdOutlineMail, MdOutlinePauseCircle } from "react-icons/md";
import "./TerminalReservation.scss";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import Sizes from "../../../constants/Sizes";
import ModalFindClass from "../../molecules/ModalFindClass/ModalFindClass";
import EmailTemplate from "../../molecules/EmailTemplate/EmailTemplate";
import { useStudentClassStore } from "../../../store/StudentClassStore";

interface ContentProps {
  closeFn: () => void;
  data: IReservedStudent;
  handleDataChange: () => void;
}
const Content: React.FC<ContentProps> = ({
  closeFn,
  data,
  handleDataChange,
}) => {
  // const [status, setStatus] = useState<string>(data.Status);
  const [loadingDrop, setLoadingDrop] = useState<boolean>(false);
  const [openRemind, setOpenRemind] = useState<boolean>(false);
  const [openReservingModal, setOpenReservingModal] = useState<boolean>(false);
  const { putStudentClassStatus } = useStudentClassStore();
  const handleOpenRemind = useCallback(() => {
    setOpenRemind(true);
  }, []);
  const handleCloseRemind = useCallback(() => {
    setOpenRemind(false);
  }, []);
  const handleReClass = () => {
    setOpenReservingModal(true);
  };
  const updateStatusInClass = useCallback(() => {
    // setStatus("In class");
  }, []);
  const handleDrop = () => {
    putStudentClassStatus([
      {
        ClassId: data.ClassId,
        StudentId: data.StudentId,
        CurrentStatus: data.Status,
        NewStatus: "DropOut",
        Reason: "",
        Conditions: [],
      },
    ]);
    // setStatus("Drop out");
    handleDataChange();
    setLoadingDrop(true);
    setTimeout(() => {
      setLoadingDrop(false);
      closeFn();
    }, 500);
  };
  const handleRemind = () => {
    handleOpenRemind();
    closeFn();
  };
  const handleCloseModalFindClass = useCallback(() => {
    setOpenReservingModal(false);
  }, []);

  return (
    <div className="wrapper">
      {!(data.Status === "InClass") && (
        <Button className="item-pop" onClick={handleReClass}>
          <div className="icon">
            <FaRegHandPaper size={Sizes.LgMedium} />
          </div>
          <div className="subtitle1">Re-class</div>
        </Button>
      )}
      <Button className="item-pop" onClick={handleRemind}>
        <div className="icon">
          <MdOutlineMail size={Sizes.LgMedium} />
        </div>
        <div className="subtitle1">Remind</div>
      </Button>
      {!(data.Status === "DropOut") && (
        <Button className="item-pop" onClick={handleDrop} loading={loadingDrop}>
          <div className="icon">
            <MdOutlinePauseCircle size={Sizes.LgMedium} />
          </div>
          <div className="subtitle1">Drop out</div>
        </Button>
      )}

      <EmailTemplate
        open={openRemind}
        handleOpenRemind={handleOpenRemind}
        handleCloseRemind={handleCloseRemind}
        data={data}
        modalTitle="Send remind email"
        type="Student"
        isIndividual
        setOpenRemind={setOpenRemind}
        isCC
      />

      {openReservingModal && (
        <ModalFindClass
          data={data}
          open={openReservingModal}
          close={handleCloseModalFindClass}
          handleDataChange={handleDataChange}
          updateStatusInClass={updateStatusInClass}
        />
      )}
    </div>
  );
};

interface Props {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  data: IReservedStudent;
  handleDataChange: () => void;
}
const ModalReservation: React.FC<Props> = ({
  isShow,
  setIsShow,
  children,
  data,
  handleDataChange,
}) => {
  const handleClose = () => {
    setIsShow(false);
  };
  return (
    <Popover
      content={
        <Content
          closeFn={handleClose}
          data={data}
          handleDataChange={handleDataChange}
        />
      }
      open={isShow}
      trigger="click"
      arrow={false}
      placement="bottomRight"
      onOpenChange={() => setIsShow((pre) => !pre)}
      className="terminal-reservation-popover-container"
    >
      {children}
    </Popover>
  );
};

export default ModalReservation;
