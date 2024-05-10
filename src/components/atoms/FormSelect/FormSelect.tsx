import { Form, Select } from "antd";
import React from "react";

const { Option } = Select;

interface FormSelectProps {
  name: string;
  rules: { required: boolean; message: string }[];
  text: string;
  list: { id: string; value: string; option: string }[];
  label?: string;
  isDisable?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  rules,
  text,
  isDisable,
  list,
}) => (
  <Form.Item name={name} rules={rules} label={label}>
    <Select placeholder={text} disabled={isDisable}>
      {list.map((item) => (
        <Option key={item.id} value={item.value}>
          {item.option}
        </Option>
      ))}
    </Select>
  </Form.Item>
);

FormSelect.defaultProps = {
  label: "",
  isDisable: false,
};

export default FormSelect;
