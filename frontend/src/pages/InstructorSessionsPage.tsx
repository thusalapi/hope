import React from "react";
import Sidebar from "../components/InstructorDashboard/Sidebar";
import BigSessionTable from "../components/InstructorDashboard/BigSessionTable";

const InstructorSessionsPage: React.FC = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="container mx-auto flex ml-64">
        <BigSessionTable />
      </div>
    </div>
  );
};

export default InstructorSessionsPage;
