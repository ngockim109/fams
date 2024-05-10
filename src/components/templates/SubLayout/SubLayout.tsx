import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";

const SubLayout: React.FC = () => (
  <div id="layout">
    {/* Header Component */}
    <Header />

    <Outlet />

    {/* Footer Component */}
    <Footer />
  </div>
);

export default SubLayout;
