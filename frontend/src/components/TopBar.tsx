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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Search Bar */}
        <div className="flex justify-end flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>

        {/* Profile Button */}
        <div className="ml-4">
          {user && (
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
