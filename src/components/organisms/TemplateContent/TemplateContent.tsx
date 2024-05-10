/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Form, Input } from "antd";
import TableHeader from "../TableHeader/TableHeader";
import ToolBar from "../../molecules/ToolBar/ToolBar";

interface TemplateContentProps {
  bodyValue: string;
  onChangeBodyValue: (value: string) => void;
  isEdit?: boolean;
  type: string;
}

const TemplateContent: React.FC<TemplateContentProps> = ({
  bodyValue,
  onChangeBodyValue,
  type,
  isEdit,
}) => {
  const formItemLayout = {
    labelCol: {
      lg: { span: 3 },
      md: { span: 4 },
      sm: { span: 6 },
      xs: { span: 6 },
    },
    wrapperCol: {
      lg: { span: 21 },
      md: { span: 20 },
      xs: { span: 18 },
      sm: { span: 18 },
    },
  };

  return (
    <div>
      <TableHeader
        isHeaderBottom={false}
        title="Content"
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <Form.Item
        {...formItemLayout}
        className="mt-2"
        label="Subject"
        name="Subject"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter subject" type="text" />
      </Form.Item>

      <Form.Item {...formItemLayout} label="Content" name="Content">
        {type === "Score" && isEdit ? (
          <div dangerouslySetInnerHTML={{ __html: bodyValue ?? "" }} />
        ) : (
          <ToolBar
            bodyValue={bodyValue}
            onChangeBodyValue={onChangeBodyValue}
          />
        )}
      </Form.Item>
    </div>
  );
};
TemplateContent.defaultProps = {
  isEdit: false,
};
export default TemplateContent;
