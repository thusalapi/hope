import React, { useState } from "react";
import UserList from "../components/UserDashboard/UserList";
import Sidebar from "../components/Sidebar";
import TopBar from "@/components/TopBar";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: "Student" | "Instructor";
  batch?: string;
  subGroup?: string;
}

const UserManagement: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50">
        <Sidebar />
      </div>

      <div className="w-full ml-48">
        <div className="relative z-40">
          <TopBar />
        </div>
        <div className="w-3/4 max-container mx-auto mt-36">
          <div className="flex-1 p-4">
            <UserList onEdit={handleEditUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
