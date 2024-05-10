// Breadcrumbs based on the current location using React Router.
// Breadcrumbs are a navigation aid that shows the user's current location within the website or application
// Use: import CustomBreadcrumb
// <CustomBreadcrumb /> CustomBreadcrumb.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./CustomBreadcrumb.scss";

const routeTitleMap: Record<string, string> = {
  "/students": "Student List",
  "/dashboard": "Dashboard",
  "/classes": "Class List",
  "/dashboard/classes": "Classes",
  "/reserved-students": "Reserve List",
  "/emails": "Email List",
  "/users": "User Management",
  "/students/add": "Add Student",
};

const CustomBreadcrumb: React.FC = () => {
  const location = useLocation();

  const generateBreadcrumbs = (): {
    path: string;
    breadcrumbName: string;
  }[] => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbItems: { path: string; breadcrumbName: string }[] = [];

    let breadcrumbPath = "";

    breadcrumbItems.push({
      path: "/",
      breadcrumbName: "Home",
    });

    pathSnippets.forEach((snippet) => {
      breadcrumbPath = breadcrumbPath.concat("/", snippet);
      const breadcrumbName = routeTitleMap[breadcrumbPath] || snippet;

      if (
        snippet.toLowerCase() !== "student-management" &&
        snippet.toLowerCase() !== "scores" &&
        snippet.toLowerCase() !== "edit"
      ) {
        breadcrumbItems.push({
          path: breadcrumbPath,
          breadcrumbName,
        });
      }
    });

    return breadcrumbItems;
  };

  const items = generateBreadcrumbs().map((item) => ({
    href: item.path,
    title: item.breadcrumbName,
  }));
  return <Breadcrumb className="custom-bread-crumb" items={items} />;
};

export default CustomBreadcrumb;
