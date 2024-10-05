import React from "react";
import Sidebar from "../components/Sidebar";
import SmallSessionTable from "../components/InstructorDashboard/SmallSessionTable";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Calendar from "../components/InstructorDashboard/Calendar";
import NextSession from "../components/InstructorDashboard/NextSession";
import TopBar from "@/components/TopBar";
// Import the Navbar component

const InstructorDashboard: React.FC = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <div className="relative z-40">
          <TopBar />
        </div>
        <div className="container mx-auto mt-16 p-4 flex">
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
    </div>
  );
};

export default InstructorDashboard;
