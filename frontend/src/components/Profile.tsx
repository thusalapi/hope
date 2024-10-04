import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/auth";
import { User } from "../types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

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

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (values: {
    userID: string;
    name: string;
    email: string;
    batch: string;
    subGroup: string;
    profilePicture: string;
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

  const validationSchema = z.object({
    name: z.string().nonempty("Required"),
    email: z.string().email("Invalid email address").nonempty("Required"),
    batch: z.string().nonempty("Required"),
    subGroup: z.string().nonempty("Required"),
    profilePicture: z.string().url("Invalid URL").nonempty("Required"),
  });

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={user.profilePicture}
                alt="Profile"
              />
            </div>
            <div className="p-8">
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Name: {user.name}
              </h1>
              <p className="mt-2 text-gray-600 ml-1">Email: {user.email}</p>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mt-2 ml-1">
                Group: {user.batch} . {user.subGroup}
              </div>

              {editing ? (
                <Formik
                  initialValues={{
                    userID: user.userID,
                    name: user.name,
                    email: user.email,
                    batch: user.batch || "",
                    subGroup: user.subGroup || "",
                    profilePicture: user.profilePicture || "",
                  }}
                  validationSchema={toFormikValidationSchema(validationSchema)}
                  onSubmit={handleSave}
                >
                  <Form className="mt-6 space-y-4">
                    <div>
                      <Field
                        name="name"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="email"
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="batch"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Batch"
                      />
                      <ErrorMessage
                        name="batch"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="subGroup"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Sub Group"
                      />
                      <ErrorMessage
                        name="subGroup"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="profilePicture"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Profile Picture URL"
                      />
                      <ErrorMessage
                        name="profilePicture"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                      Save Changes
                    </button>
                  </Form>
                </Formik>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEdit}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
