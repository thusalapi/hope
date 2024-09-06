import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  email: string;
  uploadedTime: string;
  aiGrade: string;
}

interface TableProps {
  students: Student[];
}

const StudentTable: React.FC<TableProps> = ({ students }) => {
  const navigate = useNavigate();


  const handleCardClick = () => {
    navigate(`/reviewsubmission`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4 text-left text-gray-600">Student ID</th>
            <th className="py-3 px-4 text-left text-gray-600">Name</th>
            <th className="py-3 px-4 text-left text-gray-600">Email</th>
            <th className="py-3 px-4 text-left text-gray-600">Uploaded Time</th>
            <th className="py-3 px-4 text-left text-gray-600">AI Grade</th>
            <th className="py-3 px-4 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="py-3 px-4 text-gray-700">{student.id}</td>
              <td className="py-3 px-4 text-gray-700">{student.name}</td>
              <td className="py-3 px-4 text-gray-700">{student.email}</td>
              <td className="py-3 px-4 text-gray-700">{student.uploadedTime}</td>
              <td className="py-3 px-4 text-gray-700">{student.aiGrade}</td>
              <td className="py-3 px-4">
                <button
                  onClick={handleCardClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Review Submission
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
