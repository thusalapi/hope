import React, { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../atoms/Button";
import { Avatar } from "../atoms/Avatar";

interface ProfileTemplateProps {
  children: ReactNode;
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
  children,
}) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <div className="flex items-center">
            <Avatar
              src={user?.avatar}
              alt={user?.name || "User avatar"}
              className="w-10 h-10 mr-4"
            />
            <Button onClick={logout} variant="outline">
              Log Out
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
};
