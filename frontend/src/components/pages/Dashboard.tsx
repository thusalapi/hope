import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../atoms/Button";

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Welcome, {user?.name}!</p>
      <Button onClick={logout}>Log Out</Button>
    </div>
  );
};
