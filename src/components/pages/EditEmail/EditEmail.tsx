import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useNavigate, useParams } from "react-router";
import { MdOutlineEdit } from "react-icons/md";
import EmailForm from "../../templates/EmailForm/EmailForm";
import { useSingleEmailStore } from "../../../store/EmailStore";
import { IEmail } from "../../../interfaces/email.interface";
import { IAccount } from "../../../interfaces/account.interface";
import HandleTableScore from "../../../utils/HandleTableScore";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";
import RouterEndpoints from "../../../constants/RouterEndpoints";

const EditEmail: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { aEmail, getEmailByID, putSingleEmail, loading } =
    useSingleEmailStore();
  const [bodyValue, setBodyValue] = useState("");
  const [createdByData, setCreatedByData] = useState("");
  const [createdOnData, setCreatedOnData] = useState("");
  const [moduleScores, setModuleScores] = useState<string[]>(
    aEmail?.ModuleScore ?? []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Handle check category to show module score
  const onChangeCategory = (value: string) => {
    setSelectedCategory(value);
  };

  const updateEmailFormValues = () => {
    const { ...value } = aEmail || {};
    form.setFieldsValue({
      ...value,
    });
  };

  useEffect(() => {
    getEmailByID(id ?? "");
  }, [id, getEmailByID]);

  // Set initial module scores
  let initialModuleScores;
  if (aEmail) {
    const { ModuleScore } = aEmail;
    initialModuleScores = ModuleScore;
  }

  const initialValues = {
    Id: aEmail?.Id ?? "",
    Status: aEmail?.Status ?? "",
    ModuleScore: aEmail?.ModuleScore ?? [],
    UserId: aEmail?.UserId ?? "",
    Content: aEmail?.Content ?? "",
    Type: aEmail?.Type ?? "",
  };
  useEffect(() => {
    // save data to body
    if (aEmail) {
      const { Content, CreatedBy, CreatedDate, Type } = aEmail;
      setBodyValue(Content);
      setCreatedByData(CreatedBy);
      setCreatedOnData(CreatedDate);
      setSelectedCategory(Type);
    }
    // Update form values when aEmail changes
    updateEmailFormValues();
  }, [aEmail, form]);

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
  const onFinish = (values: IEmail) => {
    console.log(values.ModuleScore, moduleScores);
    const moduleScoresContent: string | null =
      form.getFieldValue("Type") === "Score"
        ? HandleTableScore(moduleScores ?? values.ModuleScore ?? [])
        : null;
    const emailData: IEmail = {
      ...values,
      Content: values.Content,
      Status: values.Status ? "Active" : "Inactive",
      ModuleScore: moduleScores,
      UserId: userInfo?.uid ?? "1",
    };

    if (form.getFieldValue("Type") === "Score") {
      emailData.Content = moduleScoresContent ?? "";
    }
    console.log(emailData.Content);

    putSingleEmail(emailData, id || "");
    navigate(`${RouterEndpoints.EmailsManagement}`);
  };

  return (
    <div>
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <EmailForm
        initialValues={initialValues}
        title="Edit Email Template"
        form={form}
        formName={`EditEmail_${id}`}
        onFinish={onFinish}
        loading={loading}
        bodyValue={bodyValue}
        onChangeBodyValue={onChangeBodyValue}
        isEdit
        type={selectedCategory}
        onChangeCategory={onChangeCategory}
        createdByData={createdByData}
        createdOnData={createdOnData}
        moduleScores={initialModuleScores}
        onModuleScoresChange={onModuleScoresChange}
        submitText={
          <div className="centered">
            <MdOutlineEdit />
            &nbsp;Change
          </div>
        }
      />
    </div>
  );
};

export default EditEmail;
