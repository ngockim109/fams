import React from "react";

import "./Header.scss";
import Account from "../../molecules/Account/Account";

const Header: React.FC = () => (
  <div className="header">
    <img className="header-logo" src="/assets/images/logo.png" alt="@logo" />
    <div className="header-user">
      <div className="header-organization">
        <div className="wrapper-logo-content">
          <img
            className="organization-logo"
            src="/assets/images/organization.png"
            alt="@organization"
          />
          <span>uniGate</span>
        </div>
      </div>
      <Account />
    </div>
  </div>
);

export default Header;
