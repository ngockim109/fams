import { BsJournalBookmarkFill } from "react-icons/bs";
import { VscBroadcast } from "react-icons/vsc";
import { LuSpellCheck } from "react-icons/lu";
import { IoHandRightOutline } from "react-icons/io5";
import { RiRemoteControlFill } from "react-icons/ri";
import { useCallback, useState } from "react";
import { IClass } from "../../../interfaces/class.interface";
import "./ClassDetailHeader.scss";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import { SendEmailButton } from "../../atoms/CustomButton/CustomButton";
import EmailTemplate from "../EmailTemplate/EmailTemplate";
import { IUser } from "../../../interfaces/user.interface";

type ClassDetailHeaderProps = {
  classDetail: IClass;
  hideSendEmail: boolean;
};
const ClassDetailHeader = ({
  classDetail,
  hideSendEmail,
}: ClassDetailHeaderProps) => {
  console.log(classDetail);

  const [openRemind, setOpenRemind] = useState<boolean>(false);
  const handleOpenRemind = useCallback(() => {
    setOpenRemind(true);
  }, []);
  const handleCloseRemind = useCallback(() => {
    setOpenRemind(false);
  }, []);
  const user: IUser = {
    FullName: "",
    Role: "",
    Email: "",
    Phone: "",
    DOB: "",
    Gender: true,
    Status: "",
    Id: "",
    ImageUrl: "",
    Address: "",
    Username: "",
    Password: "",
  };
  return (
    <div className="classname-status">
      <div className="subtitle3 classname-label">Class</div>
      <div className="cl-st">
        <div className="heading-h5 classname">{classDetail.ClassName}</div>
        <div className="classstatus">
          <StatusTag
            status={classDetail.StatusClass}
            content={classDetail.StatusClass}
          />
        </div>
      </div>
      <div className="subtitle2-bold classid">{classDetail.Id}</div>
      <hr className="solid" />
      <div className="fourth-line">
        <div className="subtitle3-bold date">
          <span>{classDetail.StartDate}</span> -{" "}
          <span className="enddate">{classDetail.EndDate}</span>
        </div>
        <div className="icons" data-testid="class-icons">
          <BsJournalBookmarkFill />
          <RiRemoteControlFill />
          <LuSpellCheck />
          <VscBroadcast />
          <IoHandRightOutline />
          {!hideSendEmail && (
            <SendEmailButton onClick={handleOpenRemind} text="Send email" />
          )}

          <EmailTemplate
            open={openRemind}
            handleOpenRemind={handleOpenRemind}
            handleCloseRemind={handleCloseRemind}
            data={user}
            modalTitle="Send email"
            type="Student"
            setOpenRemind={setOpenRemind}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassDetailHeader;
