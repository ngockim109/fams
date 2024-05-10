/** This function component is responsible for allow
 * user change reserved status of students. If switch is
 * true, student status is reserve, else it will set by
 * student status before.
 * Usage:
 * <SwitchStatus
 *   name="statusSwitch"
 *   label="Reserved Status"
 *   valuePropName="checked"
 * />
 * Props:
 * - name: The name attribute for the Form.Item, used as a key to identify the field in the form.
 * - label: The label displayed for the switch input.
 * - valuePropName: The name of the property that holds the value of the switch (e.g., "checked" for Switch).
 */

import { Form, Switch } from "antd";

interface SwitchStatusProps {
  name: string;
  label: string;
  // valuePropName: string;
}

const SwitchStatus = ({ name, label }: SwitchStatusProps) => (
  <Form.Item name={name} label={label}>
    <Switch />
  </Form.Item>
);

export default SwitchStatus;
