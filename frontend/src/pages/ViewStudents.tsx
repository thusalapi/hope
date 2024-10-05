import React, { useState, useEffect } from "react";
import StudentTable from "./../components/Grading/StudentTable"; // Adjusted import for clarity
import Sidebar from "../components/Sidebar";
import GradesReport from "@/components/Grading/GradesReport";

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

      <div className="w-3/4 max-container mx-auto mt-20">
        <div className="w-full mx-auto mt-10 p-8 ml-20">
          <h2 className="text-3xl font-bold mb-6">Student Submissions</h2>
          {studentData.length > 0 ? (
            studentData.map((student, index) => (
              <StudentTable key={index} evaluation={student} />
            ))
          ) : (
            <div>No evaluations available</div>
          )}
        </div>
        <GradesReport grades={studentData} />
      </div>
    </div>
  );
};

export default ViewStudents;
