import React, { useEffect, useState } from "react";
import axios from "axios";

interface Session {
  _id: string;
  title: string;
  date: string; // ISO date string
  startTime: string; // HH:MM:SS format
  groupIds: string[];
  duration: number; // Duration in minutes
}

const SmallSessionTable: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/session");
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          const sortedSessions = response.data.sort(
            (a: Session, b: Session) => {
              // Combine date and time into a single Date object for comparison
              const dateA = new Date(`${a.date}T${a.startTime}`);
              const dateB = new Date(`${b.date}T${b.startTime}`);
              return dateA.getTime() - dateB.getTime();
            }
          );
          setSessions(sortedSessions);
        } else {
          console.error("Unexpected response format:", response.data);
          setSessions([]);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="overflow-x-auto m-4">
      <h1 className="prose prose-2xl font-bold">Upcoming Sessions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sessions.length === 0 ? (
        <p>No sessions available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Group IDs</th>
              <th className="px-4 py-2 border">Duration</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 border">{session.title}</td>
                <td className="px-4 py-2 border">
                  {new Date(session.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(
                    `1970-01-01T${session.startTime}Z`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-2 border">
                  {session.groupIds.length > 0
                    ? session.groupIds.join(", ")
                    : "No Groups"}
                </td>
                <td className="px-4 py-2 border">{session.duration} minutes</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SmallSessionTable;
