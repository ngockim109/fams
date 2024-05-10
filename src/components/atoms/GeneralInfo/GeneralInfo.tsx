import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Spin } from "antd";
import {
  validateDOB,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/Validations";
import { useProvinceStore } from "../../../store/ProvinceStore";

const { Option } = Select;
const StatusOptions = ["Active", "Inactive"];

interface GeneralInfoProps {
  isEdit?: boolean;
  isAddSuccess?: boolean;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ isEdit, isAddSuccess }) => {
  const { fetchProvinces, loading, province } = useProvinceStore();

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  const dateOfBirthRules = [
    { required: true, message: "Please input date of birth!" },
    {
      validator: (_: unknown, value: string) =>
        validateDOB(_, value)
          ? Promise.resolve()
          : Promise.reject(new Error("Age must be greater than or equal 18!")),
    },
  ];
  return loading ? (
    <div className="spin-container">
      <Spin />
    </div>
  ) : (
    <div className="container-info">
      <div className="col-content">
        {isEdit && (
          <Form.Item
            label={<span className="custom-label-id">ID</span>}
            name="StudentId"
          >
            <Input className="input-content" disabled />
          </Form.Item>
        )}
        <Form.Item
          className="enter-name"
          label="Full Name"
          name="FullName"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input className="input-content" placeholder="Enter Full Name" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="Gender"
          rules={[{ required: true, message: "Please select the gender" }]}
        >
          <Select placeholder="Select Gender" className="select-content">
            <Option value>Male</Option>
            <Option value={false}>Female</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date of Birth" name="DOB" rules={dateOfBirthRules}>
          <DatePicker
            className="input-content"
            format="DD/MM/YYYY"
            placeholder="Select date of birth"
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="Status"
          rules={[{ required: true, message: "Please select the status" }]}
        >
          <Select
            placeholder="Select Status"
            className="select-content"
            disabled
          >
            {StatusOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="col-content">
        <Form.Item
          label="Phone"
          name="Phone"
          rules={[
            { required: true, message: "Please enter the phone" },
            {
              validator: (_, value) =>
                validatePhoneNumber(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Invalid phone number format")),
            },
          ]}
        >
          <Input className="input-content" placeholder="Enter Phone" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          rules={[
            { required: true, message: "Please enter the email" },
            {
              validator: (_, value) =>
                validateEmail(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Invalid email format")),
            },
          ]}
        >
          <Input
            className="input-content"
            placeholder="Enter Email"
            disabled={isEdit || isAddSuccess}
          />
        </Form.Item>
        <Form.Item
          label="FA Account"
          name="FAAccount"
          rules={[
            { required: true, message: "Please enter the email" },
            {
              validator: (_, value) =>
                validateEmail(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Invalid email format")),
            },
          ]}
        >
          <Input
            className="input-content"
            placeholder="Enter FAAccount"
            disabled={isEdit || isAddSuccess}
          />
        </Form.Item>
        <Form.Item
          label="Area"
          name="Area"
          rules={[
            {
              required: true,
              message: "Please select the permanent residence",
            },
          ]}
        >
          <Select placeholder="Select Area" className="select-content">
            {province?.map((option) => (
              <Option key={option.id} value={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Address"
          name="Address"
          rules={[{ required: true, message: "Please select the location" }]}
        >
          <Select placeholder="Select Address" className="select-content">
            {province?.map((option) => (
              <Option key={option.id} value={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

GeneralInfo.defaultProps = {
  isEdit: false,
  isAddSuccess: false,
};

export default GeneralInfo;
