import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "../services/authService";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Avatar } from "../atoms/Avatar";

export const ProfileManagement: React.FC = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const updatedUser = await updateProfile({ ...user, name, email });
        login(localStorage.getItem("token") || "", updatedUser);
      } catch (error) {
        console.error("Profile update failed:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Avatar
        src={user?.avatar}
        alt={user?.name || ""}
        className="w-24 h-24 rounded-full"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <Button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};
