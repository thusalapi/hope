import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser, updateUser } from "../../services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    email: z.string().email("Invalid email format"),
    role: z.enum(["Student", "Instructor"]),
    batch: z.string().optional(),
    subGroup: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "Student") {
        return (
          data.batch !== undefined &&
          data.batch !== "" &&
          data.subGroup !== undefined &&
          data.subGroup !== ""
        );
      }
      return true;
    },
    {
      message: "Batch and Sub Group are required for Students",
      path: ["batch", "subGroup"],
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
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User created successfully",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create user. Please try again.",
      });
      console.error("Error creating user:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: User }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onFormSubmit();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User updated successfully",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update user. Please try again.",
      });
      console.error("Error updating user:", error);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "Student",
      batch: user?.batch || "1", // Default to "1"
      subGroup: user?.subGroup || "1", // Default to "1"
    },
  });

  const role = watch("role");

  useEffect(() => {
    if (role === "Instructor") {
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
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name:</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input {...register("email")} type="email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Role Selection */}
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

      {/* Batch and Sub Group Fields for Students */}
      {role === "Student" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="batch">Batch:</Label>
            <select
              {...register("batch", { required: "Batch is required" })}
              className="border border-gray-300 rounded p-2 w-full"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
            {errors.batch && (
              <p className="text-red-500">{errors.batch.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subGroup">Sub Group:</Label>
            <select
              {...register("subGroup", { required: "Sub Group is required" })}
              className="border border-gray-300 rounded p-2 w-full"
            >
              {[1, 2].map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {errors.subGroup && (
              <p className="text-red-500">{errors.subGroup.message}</p>
            )}
          </div>
        </>
      )}

      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white"
        disabled={isSubmitting}
      >
        {user ? "Update User" : "Create User"}
      </Button>
    </form>
  );
};

export default UserForm;
