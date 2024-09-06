import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Calendar from "../components/InstructorDashboard/Calendar";
import GradeSelector from "../components/Grading/GradeSelector";

const ReviewSubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const studentCode = `// Dummy code example
function add(a, b) {
  return a + b;
}

const result = add(5, 7);
console.log('Result:', result);
`;

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
  };

  const handleSubmit = () => {
    // Logic to handle grade submission can be added here
    navigate("/viewstudents"); // Redirect to the student list page
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="container mx-auto flex ml-64">
        <div className="w-2/3">
          <div className="w-full max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Review Student Submission
            </h2>
            <GradeSelector
              selectedGrade={selectedGrade}
              onSelectGrade={handleGradeSelect}
            />
            <textarea
              readOnly
              value={studentCode}
              className="w-full h-80 border border-gray-300 rounded-lg p-4 text-sm bg-gray-100"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-blue-custom-600 rounded-lg text-white"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="w-1/3">
          <InstructorProfile />
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmissionPage;
