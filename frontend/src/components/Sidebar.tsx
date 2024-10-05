import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { NAV_ITEMS } from "../constants/navItems";

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const handleNavigation = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-primary-content shadow-md flex flex-col">
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-new-blue">HOPE</h1>
      </div>

      <nav className="flex flex-col p-4 flex-grow">
        {NAV_ITEMS.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={item.text}
            isActive={activeIndex === index}
            onClick={() => handleNavigation(index, item.path)}
          />
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-auto mb-6 mx-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
