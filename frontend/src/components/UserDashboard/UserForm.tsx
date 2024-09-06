import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createUser, updateUser } from "../../services/userApi";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
}

const UserForm: React.FC<{ user?: User; onFormSubmit: () => void }> = ({
  user,
  onFormSubmit,
}) => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    role: "Student",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?._id) {
      await updateUser(user._id, formData);
    } else {
      await createUser(formData);
    }
    onFormSubmit();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Ensure the button is correctly wrapped by DialogTrigger */}
        <Button variant="secondary">{user ? "Edit User" : "Add User"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role:</Label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="secondary">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
