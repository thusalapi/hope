import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthTemplate } from "../templates/AuthTemplate";
import { LoginForm } from "../molecules/LoginForm";
import { useAuth } from "../hooks/useAuth";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <AuthTemplate title="Log In">
      <LoginForm onSubmit={handleLogin} />
    </AuthTemplate>
  );
};
