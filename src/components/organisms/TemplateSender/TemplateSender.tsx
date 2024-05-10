/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Form, Input } from "antd";
import TableHeader from "../TableHeader/TableHeader";
import { boldText } from "../../../utils/EnhanceText";

interface TemplateSenderProps {}

const TemplateSender: React.FC<TemplateSenderProps> = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 21 },
    },
  };

  return (
    <div>
      <TableHeader
        isHeaderBottom={false}
        title="Sender"
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />

      {/* Field for Sender */}
      <Form.Item
        {...formItemLayout}
        className="mt-2"
        label={boldText("From")}
        name="Sender"
      >
        <Input placeholder={localStorage.getItem("email") ?? ""} disabled />
      </Form.Item>
    </div>
  );
};

export default TemplateSender;
