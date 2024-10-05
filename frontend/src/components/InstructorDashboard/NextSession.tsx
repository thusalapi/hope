import React, { useEffect, useState } from "react";
import axios from "axios";

interface Session {
  _id: string;
  title: string;
  date: string; // ISO date string
  startTime: string; // HH:MM:SS format
  instructor: string;
  duration: number; // Duration in minutes
  groupIds: string[]; // Array of group IDs
}

const NextSession: React.FC = () => {
  const [nextSession, setNextSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/session");
        const sessions: Session[] = response.data;

        // Filter and find the next upcoming session based on the current time
        const currentDateTime = new Date();

        const upcomingSessions = sessions
          .filter(
            (session) =>
              new Date(`${session.date}T${session.startTime}`) > currentDateTime
          )
          .sort(
            (a, b) =>
              new Date(`${a.date}T${a.startTime}`).getTime() -
              new Date(`${b.date}T${b.startTime}`).getTime()
          );

        if (upcomingSessions.length > 0) {
          setNextSession(upcomingSessions[0]); // The next upcoming session
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <p>Loading next session...</p>;
  }

  if (!nextSession) {
    return <p>No upcoming session available.</p>;
  }

  return (
    <div className="bg-new-blue text-white p-6 rounded-3xl shadow-lg m-4">
      <h4 className="text-2xl font-bold">Next Session</h4>
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-2">Title: {nextSession.title}</p>
          <p className="mb-2">
            Date: {new Date(nextSession.date).toLocaleDateString()}
          </p>
          <p className="mb-2">Time: {nextSession.startTime}</p>
          <p className="mb-2">
            Groups:{" "}
            {nextSession.groupIds.length > 0
              ? nextSession.groupIds.join(", ")
              : "None"}
          </p>
          <p className="mb-2">Duration: {nextSession.duration} minutes</p>
          <button
            className="btn btn-primary bg-white hover:bg-primary-content text-blue-700 px-6 py-2 rounded-md mt-4"
            onClick={() => console.log("Joining session...")}
          >
            Join Now
          </button>
        </div>
        {/* Right Side: Illustration */}
        <div className="flex items-center">
          <img
            src="../../../src/assets/illustration1.png" // Replace with your illustration URL
            alt="Session Illustration"
            className="h-64 w-64 ml-6"
          />
        </div>
      </div>
    </div>
  );
};

export default NextSession;
