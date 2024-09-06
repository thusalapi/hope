import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null); // State for tracking which session is being edited
  const [editingSessionData, setEditingSessionData] = useState<Session | null>(
    null
  ); // State for editing form data
  const navigate = useNavigate();

  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const sortSessions = (sessions: Session[]): Session[] => {
    return sessions.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.startTime}`);
      const dateTimeB = new Date(`${b.date}T${b.startTime}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
  };

  const filterByDate = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      const filtered = sessions.filter(
        (session) => session.date === formattedDate
      );
      setFilteredSessions(filtered);
      setCurrentPage(1);
    } else {
      setFilteredSessions(sessions);
    }
  };

  const showAllData = () => {
    setFilteredSessions(sessions);
    setSelectedDate(null);
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSessions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredSessions.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEdit = (session: Session) => {
    setEditingSessionId(session._id);
    setEditingSessionData(session);
  };

  const handleJoin = (id: string) => {
    console.log(`Join session with id: ${id}`);
    // Implement join logic here
  };

  const handleCancelEdit = () => {
    setEditingSessionId(null);
    setEditingSessionData(null);
  };

  const handleUpdateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editingSessionData) {
        await axios.put(
          `http://localhost:5000/session/${editingSessionData._id}`,
          editingSessionData
        );
        const updatedSessions = sessions.map((session) =>
          session._id === editingSessionData._id ? editingSessionData : session
        );
        setSessions(updatedSessions);
        setFilteredSessions(updatedSessions);
        setEditingSessionId(null);
        setEditingSessionData(null);
        Swal.fire("Updated!", "The session has been updated.", "success");
      }
    } catch (err) {
      console.error("Failed to update session:", err);
      Swal.fire("Error!", "Failed to update the session.", "error");
    }
  };

  const navigateToForm = () => {
    navigate("/createSession");
  };

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
          await axios.delete(`http://localhost:5000/session/${id}`);
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
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((session) => (
                <React.Fragment key={session._id}>
                  <tr>
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
                          onClick={() => handleEdit(session)}
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
                  {editingSessionId === session._id && (
                    <tr>
                      <td colSpan={6}>
                        <form
                          onSubmit={handleUpdateSubmit}
                          className="p-4 border rounded-lg bg-gray-50"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={editingSessionData?.title || ""}
                              onChange={(e) =>
                                setEditingSessionData({
                                  ...editingSessionData!,
                                  title: e.target.value,
                                })
                              }
                              className="input input-bordered w-full"
                              placeholder="Title"
                            />
                            <DatePicker
                              selected={
                                editingSessionData
                                  ? new Date(editingSessionData.date)
                                  : null
                              }
                              onChange={(date: Date | null) =>
                                setEditingSessionData({
                                  ...editingSessionData!,
                                  date: date
                                    ? date.toISOString().split("T")[0]
                                    : "",
                                })
                              }
                              dateFormat="yyyy/MM/dd"
                              className="input input-bordered w-full"
                              placeholderText="Date"
                            />
                            <input
                              type="time"
                              value={editingSessionData?.startTime || ""}
                              onChange={(e) =>
                                setEditingSessionData({
                                  ...editingSessionData!,
                                  startTime: e.target.value,
                                })
                              }
                              className="input input-bordered w-full"
                              placeholder="Start Time"
                            />
                            <input
                              type="text"
                              value={editingSessionData?.duration || ""}
                              onChange={(e) =>
                                setEditingSessionData({
                                  ...editingSessionData!,
                                  duration: e.target.value,
                                })
                              }
                              className="input input-bordered w-full"
                              placeholder="Duration"
                            />
                            <textarea
                              value={editingSessionData?.description || ""}
                              onChange={(e) =>
                                setEditingSessionData({
                                  ...editingSessionData!,
                                  description: e.target.value,
                                })
                              }
                              className="textarea textarea-bordered w-full"
                              placeholder="Description"
                            />
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button type="submit" className="btn btn-primary">
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="btn btn-outline"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No sessions found.</td>
              </tr>
            )}
          </tbody>
        </table>
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
