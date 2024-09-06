import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser, updateUser } from "../../services/userApi";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  batch?: string;
  subGroup?: string;
}

interface UserFormProps {
  user?: User;
  onFormSubmit: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  batch: Yup.string(),
  subGroup: Yup.string(),
});

const UserForm: React.FC<UserFormProps> = ({ user, onFormSubmit }) => {
  const initialValues: User = {
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "Student",
    batch: user?.batch || "",
    subGroup: user?.subGroup || "",
  };

  const handleSubmit = async (values: User, { setSubmitting }: any) => {
    try {
      if (user?._id) {
        await updateUser(user._id, values);
      } else {
        await createUser(values);
      }
      onFormSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name:</Label>
            <Field name="name" as={Input} />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <Field name="email" type="email" as={Input} />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role:</Label>
            <Field
              name="role"
              as="select"
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch">Batch:</Label>
            <Field name="batch" as={Input} />
            <ErrorMessage
              name="batch"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subGroup">Sub Group:</Label>
            <Field name="subGroup" as={Input} />
            <ErrorMessage
              name="subGroup"
              component="div"
              className="text-red-500"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {user ? "Update User" : "Create User"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
