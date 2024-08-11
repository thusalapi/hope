import React from "react";
import { ProfileManagement } from "../organisms/ProfileManagement";
import { ProfileTemplate } from "../templates/ProfileTemplate";
import { useAuth } from "../hooks/useAuth";

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileTemplate>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <ProfileManagement />
    </ProfileTemplate>
  );
};
