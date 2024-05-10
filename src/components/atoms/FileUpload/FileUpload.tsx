/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import { FiInbox } from "react-icons/fi";
import { useState } from "react";
import { errorNotify, successNotify } from "../Notify/Notify";
import "./FileUpload.scss";
import ImportFromExcel from "../../../utils/ImportFromExcel";

interface FileUploadProps {
  excelUpload: (file: File, id?: string) => void;
  importId: string;
}

const FileUpload = ({ excelUpload, importId }: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const { loading } = ImportFromExcel();
  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    accept: ".xls, .xlsx, .csv",
    multiple: false,
    maxCount: 1,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      console.log(info.file);
      if (status === "done") {
        successNotify(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        errorNotify(`${info.file.name} file upload failed.`);
      }
    },

    onRemove: () => {
      setUploadedFile(null);
    },

    beforeUpload: (file) => {
      setUploadedFile(file);
    },
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <FiInbox />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload with <b>.xls, .xlsx, or .csv</b> file.
        </p>
      </Dragger>

      <Button
        onClick={() => {
          excelUpload(uploadedFile, importId);
        }}
        className="upload-btn"
        type="primary"
        loading={loading}
      >
        Upload File
      </Button>
    </div>
  );
};

export default FileUpload;
