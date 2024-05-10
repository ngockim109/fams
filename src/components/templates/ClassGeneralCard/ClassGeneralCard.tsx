import React from "react";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { CiCalendar } from "react-icons/ci";
import { TfiAlarmClock } from "react-icons/tfi";
import { BiBuildingHouse } from "react-icons/bi";
import { RiUserVoiceLine } from "react-icons/ri";
import { GiAlliedStar } from "react-icons/gi";
import { IClass } from "../../../interfaces/class.interface";
import "./ClassGeneralCard.scss";
import UserDropdown from "../../organisms/UserDropdown/UserDropdown";
import { handleStringShown } from "../../../utils/HandleDataShown";

interface ClassGeneralCardProps {
  classInfo: IClass;
}

const ClassGeneralCard: React.FC<ClassGeneralCardProps> = ({ classInfo }) => {
  console.log(classInfo);
  const infos = [
    {
      id: "1",
      icon: <TfiAlarmClock />,
      title: "Class Time",
      description: "08:30 - 09:00",
    },
    {
      id: "2",
      icon: <BiBuildingHouse />,
      title: "Location",
      description: handleStringShown(classInfo?.SpecificLocation),
    },
    {
      id: "3",
      icon: <RiUserVoiceLine />,
      title: "Trainers",
      description: classInfo && (
        <UserDropdown
          userId={classInfo?.Trainer?.UserID}
          fullName={classInfo?.Trainer?.FullName}
          email={classInfo?.Trainer?.Email}
          phone={classInfo?.Trainer?.Phone}
        />
      ),
    },
    {
      id: "4",
      icon: <GiAlliedStar />,
      title: "Fsu",
      description: classInfo.Fsu,
    },
  ];
  const references = [
    {
      id: "1",
      role: "Created",
      description: `${classInfo.CreatedDate} by ${classInfo.CreatedBy}`,
    },
    {
      id: "2",
      role: "Review",
      description: `${classInfo.ReviewDate} by ${classInfo.Reviewer}`,
    },
    {
      id: "3",
      role: "Approve",
      description: `${classInfo.ApproveDate} by ${classInfo.Approver}`,
    },
  ];

  const items: CollapseProps["items"] = [
    {
      key: "General",
      label: (
        <div className="class-general-card__title">
          <CiCalendar />
          <strong className="class-general-card__title--text">General</strong>
        </div>
      ),
      children: (
        <div>
          {infos?.map((info) => (
            <div key={info.id} className="class-general-card__info">
              <div className="class-general-card__info--header">
                {info.icon}
                <div className="class-general-card__info--title">
                  {info.title}
                </div>
              </div>
              <span>
                <strong>{info.description}</strong>
              </span>
            </div>
          ))}
          <hr className="class-general-card__divider" />
          {references?.map((ref) => (
            <div key={ref.id} className="class-general-card__info">
              <div className="class-general-card__info--header">{ref.role}</div>
              <span>{ref.description}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return <Collapse items={items} defaultActiveKey={["General"]} />;
};

export default ClassGeneralCard;
