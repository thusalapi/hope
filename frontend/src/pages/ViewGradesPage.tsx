import React from 'react';
import LabCard from './../components/Grading/LabCard';
import Sidebar from "../components/InstructorDashboard/Sidebar";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Calendar from "../components/InstructorDashboard/Calendar";

const mockLabSessions = [
  { id: '1', title: 'Lab 1: Introduction to React', date: '2024-08-15', time: '10:00 AM', group: '01', subGroup: 'A', instructorName: 'Dr. Smith', location: 'A401' },
  { id: '2', title: 'Lab 2: State Management', date: '2024-08-22', time: '11:00 AM', group: '01', subGroup: 'B', instructorName: 'Dr. Johnson', location: 'A402' },
  { id: '3', title: 'Lab 3: Component Lifecycle', date: '2024-08-29', time: '01:00 PM', group: '01', subGroup: 'C', instructorName: 'Dr. Davis', location: 'A403' },
  { id: '4', title: 'Lab 4: Advanced Hooks', date: '2024-09-05', time: '02:00 PM', group: '02', subGroup: 'A', instructorName: 'Dr. Lee', location: 'A404' },
  { id: '5', title: 'Lab 5: Routing with React Router', date: '2024-09-12', time: '10:00 AM', group: '02', subGroup: 'B', instructorName: 'Dr. Martinez', location: 'A405' },
  { id: '6', title: 'Lab 6: Performance Optimization', date: '2024-09-19', time: '11:00 AM', group: '02', subGroup: 'C', instructorName: 'Dr. Wilson', location: 'A406' },
];

const ViewGradesPage: React.FC = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="container mx-auto flex ml-64">
        <div className="w-2/3">
          <div className="w-full max-w-4xl mx-auto mt-10 p-8">
            <h2 className="text-3xl font-bold mb-6">View Grades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLabSessions.map((session) => (
                <LabCard key={session.id} session={session} />
              ))}
            </div>
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

export default ViewGradesPage;
