import React from "react";
import Sidebar from "../components/InstructorDashboard/Sidebar";
import SmallSessionTable from "../components/InstructorDashboard/SmallSessionTable";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Calendar from "../components/InstructorDashboard/Calendar";
import NextSession from "../components/InstructorDashboard/NextSession";

const InstructorDashboard: React.FC = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="container mx-auto flex ml-64">
        <div className="w-2/3">
          <NextSession />
          <SmallSessionTable />
        </div>

        <div className="w-1/3">
          <InstructorProfile />
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
