import React from "react";
import { User } from "../../types";

interface ReportTableProps {
  students: User[];
  instructors: User[];
}

const ReportTable: React.FC<ReportTableProps> = ({ students, instructors }) => {
  return (
    <div>
      <h3>Students</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Batch</th>
            <th>SubGroup</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.userID}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.batch}</td>
              <td>{student.subGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Instructors</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.userID}>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
