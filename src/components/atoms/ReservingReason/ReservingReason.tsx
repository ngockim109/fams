/** This function component is response for selecting form item reason.
 * It will get all sample reasons from server. If user select others,
 * it will show textarea and allow user input text values.
 */
import { Form, Input, Select } from "antd";
import { IReservingReason } from "../../../interfaces/reserving-reason.interface";

interface ReservingReasonProps {
  reservingReason: IReservingReason[] | null;
  isOtherReasonHidden: boolean;
  handleSelectOptionChange: (value: string) => void;
}
const ReservingReason: React.FC<ReservingReasonProps> = ({
  reservingReason,
  isOtherReasonHidden,
  handleSelectOptionChange,
}: ReservingReasonProps) => (
  <>
    <Form.Item
      label="Reserving reason"
      name="ReservingReasonSelect"
      rules={[
        {
          required: true,
          message: "Please provide a reason.",
        },
      ]}
    >
      <Select
        placeholder="Please select a reason"
        onChange={handleSelectOptionChange}
      >
        {reservingReason?.map((reason) => (
          <Select.Option key={reason?.Id} value={reason?.Id}>
            {reason?.Name}
          </Select.Option>
        ))}
        <Select.Option value="Others">Others</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="Other reason"
      name="ReservingReasonTextArea"
      dependencies={["ReservingReasonSelect"]}
      hidden={isOtherReasonHidden}
      rules={[
        {
          required: !isOtherReasonHidden,
          message: "Please provide a reason.",
        },
      ]}
    >
      <Input.TextArea placeholder="Please enter other reason" />
    </Form.Item>
  </>
);

export default ReservingReason;
