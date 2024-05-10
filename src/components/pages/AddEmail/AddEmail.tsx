import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "antd";
import { MdCloudUpload } from "react-icons/md";
import EmailForm from "../../templates/EmailForm/EmailForm";
import { useSingleEmailStore } from "../../../store/EmailStore";
import { IEmail } from "../../../interfaces/email.interface";
import { getCurrentTime } from "../../../utils/TakeCurrentTime";
import HandleTableScore from "../../../utils/HandleTableScore";
import { IAccount } from "../../../interfaces/account.interface";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";
import RouterEndpoints from "../../../constants/RouterEndpoints";

const AddEmail: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { postSingleEmail, loading } = useSingleEmailStore();
  const [bodyValue, setBodyValue] = useState("");
  const [moduleScores, setModuleScores] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Handle check category to show module score
  const onChangeCategory = (value: string) => {
    setSelectedCategory(value);
  };

  // reset field after done
  const resetFormValue = () => {
    form.resetFields();
  };
  const handleOk = () => {
    resetFormValue();
    navigate(`${RouterEndpoints.EmailsManagement}`);
    setBodyValue("");
  };

  // handle data input
  const onChangeBodyValue = (value: string) => {
    setBodyValue(value);
    form.setFieldsValue({ Content: value });
  };

  // Handle module scores to set to ModuleScores[]
  const onModuleScoresChange = (scores: string[]) => {
    setModuleScores(scores);
  };
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") ?? ""
  ) as IAccount | null;
  // convert form data
  const onFinish = async (values: IEmail) => {
    const moduleScoresContent: string =
      form.getFieldValue("Type") === "Score"
        ? HandleTableScore(moduleScores ?? [])
        : "";
    console.log(moduleScoresContent);

    const emailData: IEmail = {
      ...values,
      ModuleScore: moduleScores,
      CreatedDate: getCurrentTime(),
      CreatedBy: localStorage.getItem("name") ?? "Admin",
      Content: values.Content
        ? values.Content.concat(moduleScoresContent)
        : moduleScoresContent,
      UserId: userInfo?.uid ?? "",
      Status: values.Status ? "Active" : "Inactive",
    };

    postSingleEmail(emailData);
    handleOk();
  };

  return (
    <div>
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <EmailForm
        title="Add Email Template"
        form={form}
        formName="AddEmail"
        onFinish={onFinish}
        loading={loading}
        bodyValue={bodyValue}
        onChangeBodyValue={onChangeBodyValue}
        moduleScores={moduleScores}
        onModuleScoresChange={onModuleScoresChange}
        type={selectedCategory}
        onChangeCategory={onChangeCategory}
        submitText={
          <div className="centered">
            <MdCloudUpload />
            &nbsp;Upload
          </div>
        }
      />
    </div>
  );
};

export default AddEmail;
