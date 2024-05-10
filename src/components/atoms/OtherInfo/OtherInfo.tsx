import React from "react";
import { Form, Input, DatePicker, InputNumber, Select } from "antd";
import { Rule } from "antd/es/form";
import rules from "../../../utils/ScoreValidation";

const OtherInfo: React.FC = () => {
  const gpaRules: Rule[] = [
    { required: true, message: "Please enter student GPA" },
    ...rules,
  ];
  return (
    <div className="container-info">
      <div className="col-content">
        <Form.Item
          label="University"
          name="University"
          rules={[{ required: true, message: "Please enter the university" }]}
        >
          <Input className="input-content" placeholder="Enter University" />
        </Form.Item>
        <Form.Item
          label="Major"
          name="Major"
          rules={[{ required: true, message: "Please select the major" }]}
        >
          <Select
            placeholder="Select Major"
            className="input-content"
            options={[
              { value: "SE", label: "Software Engineering" },
              { value: "SI", label: "Information Assurance" },
              { value: "SA", label: "Artificial Intelligence" },
              { value: "SS", label: "Information System" },
              { value: "SD", label: "Digital Art & Design" },
            ]}
          />
        </Form.Item>
      </div>
      <div className="col-content">
        <Form.Item label="GPA" name="GPA" rules={gpaRules}>
          <InputNumber
            type="number"
            step={0.1}
            className="input-content"
            placeholder="Enter GPA"
          />
        </Form.Item>
        <Form.Item
          label="Graduation Time"
          name="GraduatedDate"
          rules={[
            { required: true, message: "Please select the graduation time" },
          ]}
        >
          <DatePicker
            className="input-content"
            format="DD/MM/YYYY"
            placeholder="Enter Graduation Time"
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default OtherInfo;
