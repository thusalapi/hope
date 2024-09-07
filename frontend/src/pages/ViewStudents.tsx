import React from "react";
import Table from "./../components/Grading/StudentTable"; // Table component to display student data
import Sidebar from "../components/Sidebar";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Calendar from "../components/InstructorDashboard/Calendar";

const mockStudentData = [
  {
    id: "IT2201001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    uploadedTime: "2024-08-15 10:15 AM",
    aiGrade: "A",
  },
  {
    id: "IT2201002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    uploadedTime: "2024-08-15 10:30 AM",
    aiGrade: "B+",
  },
  {
    id: "IT2201003",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    uploadedTime: "2024-08-15 11:00 AM",
    aiGrade: "A-",
  },
  {
    id: "IT2201004",
    name: "David Wilson",
    email: "david.wilson@example.com",
    uploadedTime: "2024-08-15 11:15 AM",
    aiGrade: "B",
  },
  {
    id: "IT2201005",
    name: "Eva Martinez",
    email: "eva.martinez@example.com",
    uploadedTime: "2024-08-15 11:30 AM",
    aiGrade: "A",
  },
  {
    id: "IT2201006",
    name: "Frank Harris",
    email: "frank.harris@example.com",
    uploadedTime: "2024-08-15 12:00 PM",
    aiGrade: "B+",
  },
  // Add more dummy students if needed
];

const ViewStudents: React.FC = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="w-3/4 max-container mx-auto mt-20">
        <div className="w-full mx-auto mt-10 p-8 ml-20">
          <h2 className="text-3xl font-bold mb-6">Student Submissions</h2>
          <Table students={mockStudentData} />
        </div>
        {/* <div className="w-1/3">
          <InstructorProfile />
          <Calendar />
        </div> */}
      </div>
    </div>
  );
};

export default ViewStudents;
