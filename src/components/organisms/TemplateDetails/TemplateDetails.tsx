/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Col, Form, Input, Select, Switch } from "antd";
import TableHeader from "../TableHeader/TableHeader";
import "./TemplateDetails.scss";

interface TemplateDetailsProps {
  isEdit: boolean;
  createdByData: string;
  createdOnData: string;
  onCategoryChange: (value: string) => void;
}

const TemplateDetails: React.FC<TemplateDetailsProps> = ({
  isEdit,
  createdByData,
  createdOnData,
  onCategoryChange,
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
      sm: { span: 18 },
      xs: { span: 18 },
    },
  };

  const formItemLayoutGrid = {
    labelCol: {
      lg: { span: 6 },
      md: { span: 8 },
      sm: { span: 6 },
      xs: { span: 6 },
    },
    wrapperCol: {
      lg: { span: 14 },
      md: { span: 12 },
      sm: { span: 18 },
      xs: { span: 18 },
    },
  };

  const cateOption = [
    {
      value: "Reservation",
      label: "Reservation",
    },
    {
      value: "Inform",
      label: "Inform",
    },
    {
      value: "Remind",
      label: "Remind",
    },
    {
      value: "Score",
      label: "Score",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  const applyOption = [
    {
      value: "Student",
      label: "Student",
    },
    {
      value: "Trainer",
      label: "Trainer",
    },
  ];

  return (
    <div>
      <TableHeader
        isHeaderBottom={false}
        title="Template details"
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <div className="mt-2">{}</div>
      {/* Show CreatedBy and CreatedOn */}
      {isEdit && (
        <div className="template-detail-col">
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item {...formItemLayoutGrid} label="Created by" colon>
              {createdByData}
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item {...formItemLayoutGrid} label="Created on" colon>
              {createdOnData}
            </Form.Item>
          </Col>
        </div>
      )}

      {/* Field for Email name */}
      <Form.Item
        {...formItemLayout}
        label="Email name"
        name="Name"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter email name" />
      </Form.Item>

      {/* Field for Description */}
      <Form.Item
        {...formItemLayout}
        label="Description"
        name="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>

      <div className="template-detail-col">
        {/* Field for Category */}
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            {...formItemLayoutGrid}
            label="Category"
            name="Type"
            rules={[{ required: true }]}
          >
            <Select
              options={cateOption}
              placeholder="Select category"
              onChange={(value) => onCategoryChange(value)}
            />
          </Form.Item>
        </Col>

        {/* Field for Apply to */}
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            {...formItemLayoutGrid}
            label="Apply to"
            name="ApplyTo"
            rules={[{ required: true }]}
          >
            <Select options={applyOption} placeholder="Select role to apply" />
          </Form.Item>
        </Col>
      </div>
      {/* Field for Status */}
      <Form.Item
        {...formItemLayout}
        label="Active"
        name="Status"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </div>
  );
};

export default TemplateDetails;
