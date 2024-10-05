import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser, updateUser } from "../../services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: "Student" | "Instructor";
  batch?: string;
  subGroup?: string;
}

interface UserFormProps {
  user?: User;
  onFormSubmit: () => void;
}

const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    role: z.enum(["Student", "Instructor"]),
    batch: z.string(),
    subGroup: z.string(),
  })
  .refine(
    (data) => {
      if (data.role === "Instructor") {
        return data.batch === "-" && data.subGroup === "-";
      }
      return data.batch !== "" && data.subGroup !== "";
    },
    {
      message: "Batch and Sub Group are required for Students.",
      path: ["role"],
    }
  );

type UserFormData = z.infer<typeof userSchema>;

const UserForm: React.FC<UserFormProps> = ({ user, onFormSubmit }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onFormSubmit();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: User }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onFormSubmit();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "Student",
      batch: user?.batch || "",
      subGroup: user?.subGroup || "",
    },
  });

  const role = watch("role");

  React.useEffect(() => {
    if (role === "Instructor") {
      setValue("batch", "-");
      setValue("subGroup", "-");
    } else {
      setValue("batch", "");
      setValue("subGroup", "");
    }
  }, [role, setValue]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (user?._id) {
        await updateMutation.mutateAsync({ id: user._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name:</Label>
        <Input {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input {...register("email")} type="email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role:</Label>
        <select
          {...register("role")}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="batch">Batch:</Label>
        <Input {...register("batch")} disabled={role === "Instructor"} />
        {errors.batch && <p className="text-red-500">{errors.batch.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="subGroup">Sub Group:</Label>
        <Input {...register("subGroup")} disabled={role === "Instructor"} />
        {errors.subGroup && (
          <p className="text-red-500">{errors.subGroup.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        {user ? "Update User" : "Create User"}
      </Button>
    </form>
  );
};

export default UserForm;
