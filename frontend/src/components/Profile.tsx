import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/auth";
import { User } from "../types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Sidebar from "@/components/Sidebar";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (values: {
    userID: string;
    name: string;
    email: string;
    batch: string;
    subGroup: string;
  }) => {
    console.log("Form Values:", values);
    try {
      const updatedUser = await updateProfile(values);
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading profile
      </div>
    );

  const validationSchema = z.object({
    name: z.string().nonempty("Required"),
    email: z.string().email("Invalid email address").nonempty("Required"),
    batch: z.string().nonempty("Required"),
    subGroup: z.string().nonempty("Required"),
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Profile
                  </h2>
                  {editing ? (
                    <Formik
                      initialValues={{
                        userID: user.userID,
                        name: user.name,
                        email: user.email,
                        batch: user.batch || "",
                        subGroup: user.subGroup || "",
                      }}
                      validationSchema={toFormikValidationSchema(
                        validationSchema
                      )}
                      onSubmit={async (values) => {
                        // Console log the form values when the form is submitted
                        console.log("Form Values Submitted:", values);

                        try {
                          // Call the handleSave function with the form values
                          await handleSave(values);
                        } catch (error) {
                          console.error("Error updating profile:", error);
                        }
                      }}
                    >
                      <Form>
                        <div className="mt-6">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                        <div className="mt-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                        <div className="mt-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="batch"
                          >
                            Batch
                          </label>
                          <Field
                            type="text"
                            id="batch"
                            name="batch"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          <ErrorMessage
                            name="batch"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                        <div className="mt-4">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="subGroup"
                          >
                            Sub Group
                          </label>
                          <Field
                            type="text"
                            id="subGroup"
                            name="subGroup"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          <ErrorMessage
                            name="subGroup"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                        <div className="pt-6">
                          <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  ) : (
                    <div>
                      <p className="mt-6 text-xl">Name: {user.name}</p>
                      <p className="mt-2 text-xl">Email: {user.email}</p>
                      <p className="mt-2 text-xl">Batch: {user.batch}</p>
                      <p className="mt-2 text-xl">Sub Group: {user.subGroup}</p>
                      <div className="pt-6">
                        <button
                          onClick={handleEdit}
                          className="bg-blue-custom hover:bg-blue-custom-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
