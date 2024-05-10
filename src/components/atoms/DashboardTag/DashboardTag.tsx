import React from "react";
import "./DashboardTag.scss";

interface DashboardTagProps {
  title: string;
  content: number;
  unit: string;
  icon: React.ReactNode;
}

const DashboardTag = ({ title, content, unit, icon }: DashboardTagProps) => (
  <div className="dashboard-tag ">
    <div className="title-tag">{title}</div>
    <div className="icon-tag">{icon}</div>
    <div className="content-tag ">
      <div className="content">{content}</div>
      <div className="unit">{unit}</div>
    </div>
  </div>
);

export default DashboardTag;
