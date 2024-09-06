import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../../services/userApi";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  batch: string;
  subGroup: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
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
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(user._id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <UserForm user={selectedUser} onFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default UserList;
