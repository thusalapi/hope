import React, { useState } from "react";
import {
  IoMdHome,
  IoIosPeople,
  IoMdAnalytics,
  IoIosPerson,
} from "react-icons/io";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, isActive, onClick }) => {
  return (
    <button
      className={`flex items-center w-full p-4 my-2 text-left rounded-lg ${
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className="mr-3 text-xl">{icon}</span>
      <span className="text-md font-medium">{text}</span>
    </button>
  );
};

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const navItems = [
    { icon: <IoMdHome />, text: "Dashboard", path: "/dashboard" },
    { icon: <IoIosPeople />, text: "Sessions", path: "/instructorSessions" },
    { icon: <IoMdAnalytics />, text: "Reports", path: "/reports" },
    { icon: <IoIosPerson />, text: "Profile", path: "/profile" },
  ];

  const handleNavigation = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path); // Navigate to the path when clicked
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md">
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">HOPE</h1>
      </div>

      <nav className="flex flex-col p-4">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={item.text}
            isActive={activeIndex === index}
            onClick={() => handleNavigation(index, item.path)} // Handle navigation
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
