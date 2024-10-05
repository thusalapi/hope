import React from "react";

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
        isActive ? "bg-new-blue text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className="mr-3 text-xl">{icon}</span>
      <span className="text-md font-medium">{text}</span>
    </button>
  );
};

export default NavItem;
