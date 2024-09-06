import React, { useState } from "react";
import UserList from "../components/UserDashboard/UserList";
import UserForm from "../components/UserDashboard/UserForm";

const UserManagement: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
  };

  const handleFormSubmit = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserList onEdit={handleEditUser} />
      <h2>{selectedUser ? "Edit User" : "Create User"}</h2>
      <UserForm user={selectedUser} onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default UserManagement;
