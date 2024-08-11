import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthTemplate } from "../templates/AuthTemplate";
import { RegisterForm } from "../molecules/RegisterForm";
import { useAuth } from "../hooks/useAuth";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <AuthTemplate title="Register">
      <RegisterForm onSubmit={handleRegister} />
    </AuthTemplate>
  );
};
