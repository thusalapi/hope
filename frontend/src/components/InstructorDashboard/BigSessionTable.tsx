import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Define the session type
interface Session {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  duration: string;
  description: string;
}

const BigSessionTable: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/session");
        const sortedSessions = sortSessions(response.data);
        setSessions(sortedSessions);
        setFilteredSessions(sortedSessions);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sessions");
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Function to sort sessions by date and time
  const sortSessions = (sessions: Session[]): Session[] => {
    return sessions.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.startTime}`);
      const dateTimeB = new Date(`${b.date}T${b.startTime}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
  };

  // Function to filter sessions by the selected date
  const filterByDate = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const filtered = sessions.filter(
        (session) => session.date === formattedDate
      );
      setFilteredSessions(filtered);
      setCurrentPage(1); // Reset to first page when filter is applied
    } else {
      setFilteredSessions(sessions);
    }
  };

  // Handler function to reset the table to show all data
  const showAllData = () => {
    setFilteredSessions(sessions);
    setSelectedDate(null);
    setCurrentPage(1); // Reset to first page when showing all data
  };

  // Pagination calculation
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSessions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredSessions.length / rowsPerPage);

  // Handler functions for pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (id: string) => {
    console.log(`Edit session with id: ${id}`);
    // Implement edit logic here
  };

  // Updated handleDelete function with SweetAlert2 confirmation
  const handleDelete = async (id: string) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send delete request to the backend
          await axios.delete(`http://localhost:5000/session/${id}`);

          // Update the state to remove the deleted session
          setSessions(sessions.filter((session) => session._id !== id));
          setFilteredSessions(
            filteredSessions.filter((session) => session._id !== id)
          );

          MySwal.fire("Deleted!", "The session has been deleted.", "success");
        } catch (err) {
          console.error("Failed to delete session:", err);
          MySwal.fire("Error!", "Failed to delete the session.", "error");
        }
      }
    });
  };

  const handleJoin = (id: string) => {
    console.log(`Join session with id: ${id}`);
    // Implement join logic here
  };

  const navigateToForm = () => {
    navigate("/createSession");
  };

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto flex flex-col">
      <div className="overflow-x-auto m-auto">
        <button
          onClick={navigateToForm}
          className="btn btn-primary bg-blue-custom hover:bg-white-content text-white text-bold px-6 py-2 rounded-md mt-4 mb-4 w-full"
        >
          Create a new Lab Session
        </button>
        <h1 className="prose prose-2xl font-bold mb-2">Lab Sessions</h1>
        <div className="flex justify-between mb-4 space-x-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              filterByDate(date);
            }}
            dateFormat="yyyy/MM/dd"
            className="border border-gray-300 rounded-lg p-2 h-12 w-64"
            placeholderText="Filter by a Date"
          />
          <button onClick={showAllData} className="btn btn-outline btn-primary">
            Show all data
          </button>
        </div>
        <table className="table w-full min-w-[1200px] bg-white border border-gray-200 rounded-lg shadow-md p-4 m-auto">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th className="w-1/3">Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {currentRows.length > 0 ? (
              currentRows.map((session) => (
                <tr key={session._id}>
                  <td>{session.title}</td>
                  <td>{session.date}</td>
                  <td>{session.startTime}</td>
                  <td>{session.duration}</td>
                  <td className="max-w-xs break-words">
                    {session.description}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(session._id)}
                        className="btn btn-outline btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(session._id)}
                        className="btn btn-outline btn-error"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleJoin(session._id)}
                        className="btn btn-outline btn-secondary"
                      >
                        Join
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No records were found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="btn btn-outline btn-primary"
          >
            Previous
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="btn btn-outline btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigSessionTable;
