import { getProfile } from "@/services/auth";
import { User } from "@/types";
import React, { useEffect, useState } from "react";

const TopBar: React.FC = () => {
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

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary-content shadow-md rounded-b-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex justify-end flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-72 px-6 py-2 border rounded-full focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <div className="ml-12">
          {user && (
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
