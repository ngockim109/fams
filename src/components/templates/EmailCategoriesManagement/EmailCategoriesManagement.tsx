import React from "react";
import EmailTable from "../EmailTable/EmailTable";
import { IEmail } from "../../../interfaces/email.interface";

interface EmailCategoriesManagementProps {
  emailData: IEmail[] | null;
  loading: boolean;
  handleDataChange: () => void;
}

const EmailCategoriesManagement: React.FC<EmailCategoriesManagementProps> = ({
  emailData,
  loading,
  handleDataChange,
}) => (
  <div className="table-container__content">
    <EmailTable
      email={emailData ?? []}
      loading={loading}
      handleDataChange={handleDataChange}
    />
  </div>
);

export default EmailCategoriesManagement;
