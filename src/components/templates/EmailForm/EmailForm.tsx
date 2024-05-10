import React from "react";
import { Card, Form, FormInstance } from "antd";
import { useNavigate } from "react-router";
import TemplateDetails from "../../organisms/TemplateDetails/TemplateDetails";
import TemplateContent from "../../organisms/TemplateContent/TemplateContent";
import TemplateScore from "../../organisms/TemplateScore/TemplateScore";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import { IEmail } from "../../../interfaces/email.interface";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import "./EmailForm.scss";

interface EmailFormProps {
  initialValues?: object;
  title: string;
  form: FormInstance<IEmail>;
  formName: string;
  loading: boolean;
  onFinish: (values: IEmail) => void;
  bodyValue: string;
  onChangeBodyValue: (value: string) => void;
  submitText: string | React.ReactNode;
  isEdit?: boolean;
  createdByData?: string;
  createdOnData?: string;
  moduleScores?: string[];
  onModuleScoresChange: (ModuleScores: string[]) => void;
  type: string;
  onChangeCategory: (value: string) => void;
}
const emailFormDefaultProps: Partial<EmailFormProps> = {
  isEdit: false,
  createdByData: "",
  createdOnData: "",
  moduleScores: [],
  initialValues: {},
};

const EmailForm: React.FC<EmailFormProps> = ({
  initialValues,
  title,
  form,
  formName,
  loading,
  onFinish,
  bodyValue,
  onChangeBodyValue,
  submitText,
  isEdit,
  createdByData,
  createdOnData,
  moduleScores,
  type,
  onChangeCategory,
  onModuleScoresChange,
}) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/emails");
  };

  return (
    <div className="email-form">
      <TableHeader
        isHeaderBottom={false}
        title={title}
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <Form
        form={form}
        name={formName}
        onFinish={onFinish}
        variant="filled"
        labelAlign="left"
        requiredMark={false}
        colon={false}
        initialValues={initialValues}
      >
        <Card hoverable className="email-form-card">
          <TemplateDetails
            isEdit={isEdit || false}
            createdByData={createdByData || ""}
            createdOnData={createdOnData || ""}
            onCategoryChange={onChangeCategory}
          />
        </Card>
        <Card hoverable className="email-form-card">
          <TemplateContent
            type={type}
            isEdit={isEdit}
            bodyValue={bodyValue}
            onChangeBodyValue={onChangeBodyValue}
          />
        </Card>
        {type === "Score" && (
          <Card hoverable className="email-form-card">
            <TemplateScore
              moduleScores={moduleScores || []}
              onModuleScoresChange={onModuleScoresChange}
            />
          </Card>
        )}

        <div className="btn-save">
          <FormFooter
            formName={formName}
            text={submitText}
            loading={loading}
            handleCancel={handleCancel}
          />
        </div>
      </Form>
    </div>
  );
};

EmailForm.defaultProps = emailFormDefaultProps;

export default EmailForm;
