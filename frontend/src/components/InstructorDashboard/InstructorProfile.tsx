import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/auth";

interface Profile {
  name: string;
  email: string;
  sessions: number;
  students: number;
  role: string;
  profilePicture?: string; // Include profilePicture as an optional field
}

const InstructorProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 m-4">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={profile.profilePicture || "../../../src/assets/avatar.png"} // Use profile picture from profile state
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name and Role */}
        <h2 className="text-lg font-semibold text-gray-900">{profile.name}</h2>
        <p className="text-sm text-gray-500">{profile.role}</p>

        {/* Additional Info */}
        <div className="mt-4 w-full">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Sessions:</span>
            <span>{profile.sessions}</span>{" "}
            {/* Display actual sessions count */}
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Students:</span>
            <span>{profile.students}</span>{" "}
            {/* Display actual students count */}
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Email:</span>
            <span>{profile.email}</span> {/* Display user's email */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
