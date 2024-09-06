import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../services/userApi";
import { Button } from "@/components/ui/button";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  batch: string;
  subGroup: string;
}

interface UserListProps {
  onEdit: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onEdit }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Batch</th>
            <th className="border border-gray-300 p-2">Sub Group</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.batch}</td>
              <td className="border border-gray-300 p-2">{user.subGroup}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white mr-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user._id!)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
