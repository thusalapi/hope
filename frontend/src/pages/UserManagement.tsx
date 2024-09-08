import React, { useState } from "react";
import UserList from "../components/UserDashboard/UserList";
import UserForm from "../components/UserDashboard/UserForm";
import Sidebar from "../components/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReportButton from "@/components/UserDashboard/ReportButton";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
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

  const handleFormSubmit = () => {
    setSelectedUser(undefined);
    setIsFormOpen(false);
  };

  const handleDialogClose = () => {
    setSelectedUser(undefined);
    setIsFormOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="w-3/4 max-container mx-auto mt-20">
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">User List</h2>
            <Dialog
              open={isFormOpen}
              onOpenChange={(open) => {
                if (!open) handleDialogClose();
                setIsFormOpen(open);
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedUser ? "Edit User" : "Create User"}
                  </DialogTitle>
                </DialogHeader>
                <UserForm user={selectedUser} onFormSubmit={handleFormSubmit} />
              </DialogContent>
            </Dialog>
          </div>
          <UserList onEdit={handleEditUser} />
        </div>
        <ReportButton />
      </div>
    </div>
  );
};

export default UserManagement;
