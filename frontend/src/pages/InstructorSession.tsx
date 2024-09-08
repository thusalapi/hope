import React from "react";
import Sidebar from "../components/Sidebar";
import Session from "@/components/InstructorDashboard/Session";

const InstructorSession: React.FC = () => {
  return (
    <div className="flex ml-4">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="container mx-auto flex ml-64 mt-4 mr-4">
        <Session />
      </div>
    </div>
  );
};

export default InstructorSession;
