import React, { useEffect, useState } from "react";
import { getProfile } from "../services/auth";
import { User } from "../types";
import Sidebar from "@/components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CalendarComponent from "@/components/CalendarComponent";
import TopBar from "./TopBar";

const CLIENT_ID =
  "808387821131-rdi2ou03d62t97g22kcqsr8k1g8kj6fr.apps.googleusercontent.com";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="relative z-40">
        <TopBar />
      </div>
      <div className="flex-1 p-8 mt-16 ml-56">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-20">
          <div className="p-8">
            <div className="flex items-center space-x-8 mb-8">
              <img
                className="h-32 w-32 rounded-full object-cover border-4 border-indigo-500"
                src={user.profilePicture}
                alt="Profile"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <ProfileField
                label="User ID"
                value={user.userID || "IT22326690"}
              />
              <ProfileField label="Role" value={"Student"} />

              <ProfileField label="Batch" value={user.batch} />
              <ProfileField label="Sub Group" value={user.subGroup} />
              <ProfileField label="Gender" value={"Male"} />
              <ProfileField label="Date of Birth" value={"2002/09/29"} />
              <ProfileField label="Institute" value={"SLIIT"} />
              <ProfileField label="Branch" value={"Malabe"} />
              <ProfileField label="Phone Number" value={"077 248 5225"} />
            </div>
          </div>
        </div>

        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <CalendarComponent />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

const ProfileField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      readOnly
      value={value}
      className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
  </div>
);

export default Profile;
