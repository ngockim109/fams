/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Form, Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";

interface ReservingStudentSearchProps {
  getStudentByID: (studentId: string) => void;
  id?: string;
  setSearchStudentId: React.Dispatch<React.SetStateAction<string>>;
}
const ReservingStudentSearch: React.FC<ReservingStudentSearchProps> = ({
  id,
  getStudentByID,
  setSearchStudentId,
}) => {
  console.log(id);
  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = async (value, _e, _info) => {
    const studentId = value;
    setSearchStudentId(value);
    // Await the getStudentByID to complete before continuing
    getStudentByID(studentId);
  };
  return (
    <Form.Item<IReservedStudent>
      label="Student ID"
      name="StudentId"
      rules={[
        {
          required: true,
          message: "Please select student id.",
        },
      ]}
    >
      <Search
        placeholder="Input Student ID"
        allowClear
        onSearch={onSearch}
        disabled={id !== ""}
      />
    </Form.Item>
  );
};

ReservingStudentSearch.defaultProps = {
  id: "",
};
export default ReservingStudentSearch;
