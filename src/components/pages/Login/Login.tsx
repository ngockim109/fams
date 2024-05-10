import React, { useEffect } from "react";
import LoginForm from "../../templates/LoginForm/LoginForm";
import "./Login.scss";
import { Authenticate, isAuthenticated } from "../../../utils/JWTAuth";

const Login: React.FC = () => {
  useEffect(() => {
    Authenticate();
  }, []);
  const userAuthenticated = isAuthenticated();

  // Check authenticated user to show UI
  if (userAuthenticated) {
    return null;
  }
  return (
    <div className="login-container">
      <div className="centered login-left">
        <LoginForm />
      </div>
      <div className="login-right" />
    </div>
  );
};

export default Login;
