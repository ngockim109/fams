/** This function is response for show all conditions from server
 * and allow user select some conditions that match with student conditions
 */
import { Checkbox, Form } from "antd";
import ReservingConditions from "../../../constants/ReservingConditions";

interface ReservingConditionProps {
  disable: boolean | false;
}
const ReservingCondition = ({ disable }: ReservingConditionProps) => {
  const reservingCondition = ReservingConditions;
  return (
    <Form.Item
      label={`${disable ? "" : "Reserving conditions"}`}
      name="Conditions"
      rules={[
        {
          required: true,
          message: "Please select conditions.",
        },
      ]}
    >
      <Checkbox.Group className="checkbox-group" name="checkbox-group">
        {reservingCondition?.map((condition) => (
          <Checkbox
            key={condition.Id}
            value={
              disable
                ? condition.Id
                : { Id: condition.Id, Name: condition.Name }
            }
            style={{ pointerEvents: `${disable ? "none" : "auto"}` }}
          >
            {condition?.Name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
};
export default ReservingCondition;
