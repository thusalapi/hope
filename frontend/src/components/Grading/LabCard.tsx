import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LabCardProps {
  session: {
    id: string;
    title: string;
    date: string;
    time: string;
    group: string;
    subGroup: string;
    instructorName: string;
    location: string;
  };
}

const LabCard: React.FC<LabCardProps> = ({ session }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/viewstudents`);
  };

  return (
    <div
      className="card bg-white shadow-lg rounded-lg p-6 cursor-pointer"
      onClick={handleCardClick}
    >
      <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
      <p className="text-gray-600 mb-1">Date: {session.date}</p>
      <p className="text-gray-600 mb-1">Time: {session.time}</p>
      <p className="text-gray-600 mb-1">Group: {session.group}</p>
      <p className="text-gray-600 mb-1">Sub Group: {session.subGroup}</p>
      <p className="text-gray-600 mb-1">Instructor: {session.instructorName}</p>
      <p className="text-gray-600">Location: {session.location}</p>
    </div>
  );
};

export default LabCard;
