/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import EmailTable from "../EmailTable/EmailTable";
import { IEmail } from "../../../interfaces/email.interface";

interface EmailOtherManagementProps {
  emailData: IEmail[] | null;
  loading: boolean;
  handleDataChange: () => void;
}

const EmailOtherManagement: React.FC<EmailOtherManagementProps> = ({
  emailData,
  loading,
  handleDataChange,
}) => {
  const [cateEmails, setCateEmails] = useState([]);

  useEffect(() => {
    if (emailData) {
      const filteredEmails: any = emailData.filter(
        (item) =>
          item.Type !== "Reservation" &&
          item.Type !== "Inform" &&
          item.Type !== "Remind" &&
          item.Type !== "Score"
      );
      setCateEmails(filteredEmails);
    }
  }, [emailData]);

  return (
    <div className="table-container__content">
      <EmailTable
        email={cateEmails}
        loading={loading}
        handleDataChange={handleDataChange}
      />
    </div>
  );
};

export default EmailOtherManagement;
