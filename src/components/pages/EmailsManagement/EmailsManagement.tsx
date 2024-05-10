/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import EmailCategoriesManagement from "../../templates/EmailCategoriesManagement/EmailCategoriesManagement";
import "./EmailsManagement.scss";
import EmailACateManagementProps from "../../templates/EmailACateManagement/EmailACateManagement";
import EmailOtherManagement from "../../templates/EmailOtherManagement/EmailOtherManagement";
import { useEmailStore } from "../../../store/EmailStore";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";
import TableHeader from "../../organisms/TableHeader/TableHeader";

const EmailsManagement: React.FC = () => {
  const { getEmail, email, loading } = useEmailStore();
  const [isChangeData, setIsChangeData] = useState<boolean>(false);
  const [searchSignal, setSearchSignal] = useState<AbortSignal>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleDataChange = () => {
    setIsChangeData((pre) => !pre);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    setTimeout(() => getEmail(searchTerm, searchSignal), 500);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isChangeData, searchTerm, searchSignal]);

  const filteredEmailData = email?.filter(
    (item) => item.Status === "Active" || item.Status === "Inactive"
  );

  const tabsItems: TabsProps["items"] = [
    {
      key: "all-categories",
      label: "All Categories",
      children: (
        <EmailCategoriesManagement
          emailData={filteredEmailData || []}
          loading={loading}
          handleDataChange={handleDataChange}
        />
      ),
    },
    {
      key: "reservation",
      label: "Reservation",
      children: (
        <EmailACateManagementProps
          cateFilter="Reservation"
          emailData={filteredEmailData || []}
          loading={loading}
          handleDataChange={handleDataChange}
        />
      ),
    },
    {
      key: "inform",
      label: "Inform",
      children: (
        <EmailACateManagementProps
          cateFilter="Inform"
          emailData={filteredEmailData || []}
          loading={loading}
          handleDataChange={handleDataChange}
        />
      ),
    },
    {
      key: "remind",
      label: "Remind",
      children: (
        <EmailACateManagementProps
          cateFilter="Remind"
          emailData={filteredEmailData || []}
          loading={loading}
          handleDataChange={handleDataChange}
        />
      ),
    },
    {
      key: "score",
      label: "Score",
      children: (
        <EmailACateManagementProps
          cateFilter="Score"
          emailData={email}
          loading={loading}
          handleDataChange={handleDataChange}
        />
      ),
    },
    {
      key: "other",
      label: "Other",
      children: (
        <EmailOtherManagement
          emailData={filteredEmailData || []}
          loading={loading}
          handleDataChange={handleDataChange}
        />
      ),
    },
  ];

  return (
    <div className="table-container classinfo">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <div className="table-container">
        <TableHeader
          title="Email List"
          isExport={false}
          isImport={false}
          isSearch
          isAddEmail
          setSearchSignal={setSearchSignal}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="classtab">
        <Tabs defaultActiveKey="email-cate" items={tabsItems} />
      </div>
    </div>
  );
};

export default EmailsManagement;
