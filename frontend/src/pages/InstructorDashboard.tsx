import React from "react";
import Sidebar from "../components/InstructorDashboard/Sidebar";
import SmallSessionTable from "../components/InstructorDashboard/SmallSessionTable";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Calendar from "../components/InstructorDashboard/Calendar";
import NextSession from "../components/InstructorDashboard/NextSession";

const InstructorDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="container mx-auto flex">
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
