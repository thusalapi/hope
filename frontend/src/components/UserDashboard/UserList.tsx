import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../services/userApi";
import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  batch?: string;
  subGroup?: string;
}

interface UserListProps {
  onEdit: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<"Student" | "Instructor" | null>(
    null
  );

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const filteredUsers = users.filter((user: User) => {
    const matchesName = user.name.toLowerCase().includes(filter.toLowerCase());
    const matchesRole = roleFilter === null || user.role === roleFilter;

    return matchesName && matchesRole;
  });

  const handleGenerateReport = () => {
    console.log("Generating user report...");
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">
        An error occurred: {(error as Error).message}
      </Typography>
    );

  return (
    <div className="container mx-auto p-4">
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-4 bg-[#2148C0] text-white border border-gray-200 rounded-lg p-4">
        <input
          type="text"
          placeholder="Filter by Name/Email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-1/3 text-black"
        />
        <div className="flex space-x-2">
          <Button
            onClick={() => setRoleFilter("Student")}
            className={`px-4 py-2 rounded ${
              roleFilter === "Student"
                ? "bg-[#E67E22]"
                : "bg-[#E67E22] hover:bg-opacity-80"
            }`}
          >
            Student
          </Button>
          <Button
            onClick={() => setRoleFilter("Instructor")}
            className={`px-4 py-2 rounded ${
              roleFilter === "Instructor"
                ? "bg-[#2ECC71]"
                : "bg-[#2ECC71] hover:bg-opacity-80"
            }`}
          >
            Instructor
          </Button>
          <Button
            onClick={() => setRoleFilter(null)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Reset
          </Button>
        </div>
        <Button
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate Report
        </Button>
      </div>

      {/* User Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mt-0">
        <h2 className="text-xl font-bold mb-6">User List</h2>
        {filteredUsers.length === 0 ? (
          <Typography>No users found.</Typography>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 text-left">Name</th>
                <th className="border-b py-2 text-left">Email</th>
                <th className="border-b py-2 text-left">Role</th>
                <th className="border-b py-2 text-left">Batch</th>
                <th className="border-b py-2 text-left">Sub Group</th>
                <th className="border-b py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: User) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border-b py-2">{user.name}</td>
                  <td className="border-b py-2">{user.email}</td>
                  <td className="border-b py-2">{user.role}</td>
                  <td className="border-b py-2">{user.batch || "N/A"}</td>
                  <td className="border-b py-2">{user.subGroup || "N/A"}</td>
                  <td className="border-b py-2 flex space-x-2">
                    <Button
                      variant="contained"
                      onClick={() => onEdit(user)}
                      className="bg-[#F1C40F] text-white hover:bg-[#D4AC0D]"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => deleteMutation.mutate(user._id!)}
                      className="bg-red-500 text-white hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
