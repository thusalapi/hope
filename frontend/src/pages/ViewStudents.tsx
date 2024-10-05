import React, { useState, useEffect } from "react";
import StudentTable from "./../components/Grading/StudentTable";
import Sidebar from "../components/Sidebar";
import GradesReport from "@/components/Grading/GradesReport"; 
import TopBar from "@/components/TopBar";

const ViewStudents: React.FC = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost:5000/grade");
        if (!response.ok) throw new Error("Failed to fetch student data");
        const data = await response.json();

        setStudentData(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>
     
      <div className="ml-64 w-full p-4 bg-white rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Student Evaluations</h2>
        {studentData.length > 0 ? (
          <StudentTable evaluations={studentData} />
        ) : (
          <div>No evaluations available</div>
        )}
      </div>
    </div>
  );
};

export default ViewStudents;
