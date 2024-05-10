import { Form } from "antd";
import React from "react";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import ReservingCondition from "../ReservingCondition/ReservingCondition";
import "./ReservingInformation.scss";

interface ReservingInformationProps {
  data: IReservedStudent | null;
}

const ReservingInformation: React.FC<ReservingInformationProps> = ({
  data,
}) => {
  const chooseConditionFormat = data?.Conditions?.map(
    (condition) => condition.Id
  );

  return (
    <div className="reserving-content">
      <div className="reserving-content-first-row">
        <div className="reserving-content-first-row-left">
          <div className="item-title">Period</div>
          <div>
            {data?.StartDate?.toString().substring(0, 10)}
            <strong>{" -> "}</strong>
            {data?.EndDate?.toString().substring(0, 10)}
          </div>
        </div>
        <div className="reserving-content-first-row-right">
          <div className="item-title">Reason</div>
          <div>{data?.Reason}</div>
        </div>
      </div>
      <div className="reserving-info">
        <div className="item-title">Conditions</div>
        <div className="reserving-info-content">
          <Form
            initialValues={{
              Conditions: chooseConditionFormat,
            }}
          >
            <ReservingCondition disable />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ReservingInformation;
