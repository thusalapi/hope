import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import InstructorProfile from "../components/InstructorDashboard/InstructorProfile";
import Calendar from "../components/InstructorDashboard/Calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const mockLabSessions = [
  {
    id: "1",
    title: "Lab Sheet: Data Structures",
    moduleCode: "IT201",
    date: "2024-08-20",
    time: "9:00 AM",
    group: "WD-02.01",
    instructorName: "Ms. Amara",
    location: "A401",
  },
  {
    id: "2",
    title: "Lab Sheet: Software Engineering Concepts",
    moduleCode: "SE301",
    date: "2024-08-22",
    time: "10:30 AM",
    group: "WD-03.02",
    instructorName: "Mr. Ruwan",
    location: "A402",
  },
  {
    id: "3",
    title: "Lab Sheet: Algorithms",
    moduleCode: "DS102",
    date: "2024-08-25",
    time: "11:00 AM",
    group: "WE-01.01",
    instructorName: "Dr. Nalin",
    location: "B401",
  },
  {
    id: "4",
    title: "Lab Sheet: Advanced Databases",
    moduleCode: "IT305",
    date: "2024-08-28",
    time: "2:00 PM",
    group: "WD-04.02",
    instructorName: "Mr. Kamal",
    location: "F1101",
  },
  {
    id: "5",
    title: "Lab Sheet: Machine Learning Basics",
    moduleCode: "DS202",
    date: "2024-09-01",
    time: "1:30 PM",
    group: "WE-02.01",
    instructorName: "Ms. Senevi",
    location: "A403",
  },
  {
    id: "6",
    title: "Lab Sheet: Data Structures",
    moduleCode: "IT201",
    date: "2024-09-03",
    time: "9:30 AM",
    group: "WD-01.02",
    instructorName: "Mr. Nihal",
    location: "B402",
  },
  {
    id: "7",
    title: "Lab Sheet: Software Engineering Concepts",
    moduleCode: "SE301",
    date: "2024-09-07",
    time: "3:00 PM",
    group: "WD-02.01",
    instructorName: "Ms. Amara",
    location: "A501",
  },
  {
    id: "8",
    title: "Lab Sheet: Algorithms",
    moduleCode: "DS102",
    date: "2024-09-10",
    time: "10:00 AM",
    group: "WD-03.02",
    instructorName: "Mr. Ruwan",
    location: "F1102",
  },
  {
    id: "9",
    title: "Lab Sheet: Advanced Databases",
    moduleCode: "IT305",
    date: "2024-09-12",
    time: "4:00 PM",
    group: "WE-01.01",
    instructorName: "Dr. Nalin",
    location: "A504",
  },
  {
    id: "10",
    title: "Lab Sheet: Machine Learning Basics",
    moduleCode: "DS202",
    date: "2024-09-15",
    time: "1:00 PM",
    group: "WE-02.01",
    instructorName: "Ms. Senevi",
    location: "F1103",
  },
  {
    id: "11",
    title: "Lab Sheet: Data Structures",
    moduleCode: "IT201",
    date: "2024-09-18",
    time: "11:30 AM",
    group: "WD-01.02",
    instructorName: "Mr. Nihal",
    location: "F1301",
  },
  {
    id: "12",
    title: "Lab Sheet: Software Engineering Concepts",
    moduleCode: "SE301",
    date: "2024-09-20",
    time: "9:00 AM",
    group: "WD-02.01",
    instructorName: "Ms. Amara",
    location: "A506",
  },
  {
    id: "13",
    title: "Lab Sheet: Algorithms",
    moduleCode: "DS102",
    date: "2024-09-22",
    time: "2:00 PM",
    group: "WE-01.01",
    instructorName: "Dr. Nalin",
    location: "F1104",
  },
  {
    id: "14",
    title: "Lab Sheet: Advanced Databases",
    moduleCode: "IT305",
    date: "2024-09-25",
    time: "3:30 PM",
    group: "WD-04.02",
    instructorName: "Mr. Kamal",
    location: "F1105",
  },
  {
    id: "15",
    title: "Lab Sheet: Machine Learning Basics",
    moduleCode: "DS202",
    date: "2024-09-27",
    time: "11:00 AM",
    group: "WE-02.01",
    instructorName: "Ms. Senevi",
    location: "A507",
  },
  {
    id: "16",
    title: "Lab Sheet: Data Structures",
    moduleCode: "IT201",
    date: "2024-10-01",
    time: "1:00 PM",
    group: "WD-01.02",
    instructorName: "Mr. Nihal",
    location: "F1106",
  },
  {
    id: "17",
    title: "Lab Sheet: Software Engineering Concepts",
    moduleCode: "SE301",
    date: "2024-10-03",
    time: "10:00 AM",
    group: "WD-02.01",
    instructorName: "Ms. Amara",
    location: "A508",
  },
  {
    id: "18",
    title: "Lab Sheet: Algorithms",
    moduleCode: "DS102",
    date: "2024-10-05",
    time: "2:30 PM",
    group: "WE-01.01",
    instructorName: "Dr. Nalin",
    location: "F1302",
  },
  {
    id: "19",
    title: "Lab Sheet: Advanced Databases",
    moduleCode: "IT305",
    date: "2024-10-07",
    time: "9:00 AM",
    group: "WD-04.02",
    instructorName: "Mr. Kamal",
    location: "F1107",
  },
  {
    id: "20",
    title: "Lab Sheet: Machine Learning Basics",
    moduleCode: "DS202",
    date: "2024-10-10",
    time: "11:00 AM",
    group: "WE-02.01",
    instructorName: "Ms. Senevi",
    location: "F1108",
  },
];

const groups = [
  "WD-02.01",
  "WD-03.02",
  "WE-01.01",
  "WD-04.02",
  "WE-02.01",
  "WD-01.02",
];
const modules = [
  "IT201",
  "SE301",
  "DS102",
  "IT305",
  "DS202",
  "IT101",
  "DS301",
  "IM203",
];
const instructors = [
  "Ms. Amara",
  "Mr. Ruwan",
  "Dr. Nalin",
  "Mr. Kamal",
  "Ms. Senevi",
  "Mr. Nihal",
];
const titles = [
  "Lab Sheet: Data Structures",
  "Lab Sheet: Software Engineering Concepts",
  "Lab Sheet: Algorithms",
  "Lab Sheet: Advanced Databases",
  "Lab Sheet: Machine Learning Basics",
];

const ViewGradesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string[]>([]);

  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showModuleOptions, setShowModuleOptions] = useState(false);
  const [showInstructorOptions, setShowInstructorOptions] = useState(false);
  const [showTitleOptions, setShowTitleOptions] = useState(false);

  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredLabSessions = mockLabSessions.filter((session) => {
    return (
      (selectedGroup.length === 0 || selectedGroup.includes(session.group)) &&
      (selectedModule.length === 0 ||
        selectedModule.includes(session.moduleCode)) &&
      (!selectedDate ||
        selectedDate.toISOString().split("T")[0] === session.date) &&
      (selectedInstructor.length === 0 ||
        selectedInstructor.includes(session.instructorName)) &&
      (selectedTitle.length === 0 || selectedTitle.includes(session.title))
    );
  });

  const handleViewSubmission = (id: string) => {
    navigate(`/viewstudents`);
  };

  return (
<div className="flex">
  <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
    <Sidebar />
  </div>

  <div className="flex-1 ml-64 p-4"> {/* This takes the remaining width with padding */}
    <div className="w-full mt-10 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-3xl font-bold mb-6">View Grades</h2>

      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md flex flex-wrap">
        <div className="relative mr-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setShowGroupOptions((prev) => !prev)}
          >
            Groups
          </button>
          {showGroupOptions && (
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
              {groups.map((group) => (
                <label key={group} className="block p-2 hover:bg-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedGroup.includes(group)}
                    onChange={() => handleFilterChange(setSelectedGroup, group)}
                  />
                  {group}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="relative mr-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setShowModuleOptions((prev) => !prev)}
          >
            Modules
          </button>
          {showModuleOptions && (
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
              {modules.map((module) => (
                <label key={module} className="block p-2 hover:bg-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedModule.includes(module)}
                    onChange={() => handleFilterChange(setSelectedModule, module)}
                  />
                  {module}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="relative mr-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setShowTitleOptions((prev) => !prev)}
          >
            Lab Sheets
          </button>
          {showTitleOptions && (
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
              {titles.map((title) => (
                <label key={title} className="block p-2 hover:bg-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedTitle.includes(title)}
                    onChange={() => handleFilterChange(setSelectedTitle, title)}
                  />
                  {title}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="relative mr-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setShowInstructorOptions((prev) => !prev)}
          >
            Instructors
          </button>
          {showInstructorOptions && (
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
              {instructors.map((instructor) => (
                <label key={instructor} className="block p-2 hover:bg-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedInstructor.includes(instructor)}
                    onChange={() => handleFilterChange(setSelectedInstructor, instructor)}
                  />
                  {instructor}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mr-4">
          <h4 className="inline-block mr-2">Date</h4>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border p-2 rounded"
            placeholderText="Select a date"
          />
        </div>
      </div>

      <div
        style={{
          maxHeight: "750px",
          overflowY: "auto",
          border: "1px solid #e2e8f0",
        }}
      >
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Module Code</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Group</th>
              <th className="border border-gray-300 p-2">Instructor</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLabSessions.map((session) => (
              <tr
                key={session.id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="border border-gray-300 p-2">{session.title}</td>
                <td className="border border-gray-300 p-2">{session.moduleCode}</td>
                <td className="border border-gray-300 p-2">{session.date}</td>
                <td className="border border-gray-300 p-2">{session.time}</td>
                <td className="border border-gray-300 p-2">{session.group}</td>
                <td className="border border-gray-300 p-2">{session.instructorName}</td>
                <td className="border border-gray-300 p-2">{session.location}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
                    onClick={() => handleViewSubmission(session.id)}
                  >
                    View Submission
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


  );
};

export default ViewGradesPage;
