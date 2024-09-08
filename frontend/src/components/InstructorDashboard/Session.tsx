import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface LabSheet {
  question: string;
}

interface Session {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  duration: string;
  description: string;
  labSheet: LabSheet[];
}

const Session: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/session/${id}`);
        setSession(response.data);
        setLoading(false);
        localStorage.setItem("sessionId", response.data._id);
      } catch (err) {
        setError("Failed to fetch session details");
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [id]);

  const setProjectPath = () => {
    const path = prompt("Please enter your project path:");
    if (path) {
      localStorage.setItem("projectPath", path);
      console.log("Project path set to:", path);
    }
  };

  const defaultPath = "C:/Users/Thusala/Desktop/LAB";
  const projectPath = localStorage.getItem("projectPath") || defaultPath;

  console.log("Using project path:", projectPath);

  if (loading) return <p>Loading session details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!session) return <p>No session details available</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{session.title}</h1>
      <div className="flex bg-blue-500 text-white border border-gray-200 rounded-lg shadow-md p-4">
        <div className="w-2/3">
          <p className="mb-4">
            <strong>Date:</strong> {session.date}
          </p>
          <p className="mb-4">
            <strong>Start Time:</strong> {session.startTime}
          </p>
          <p className="mb-4">
            <strong>Duration:</strong> {session.duration}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {session.description}
          </p>
        </div>
        <div>
          <img
            src="../../../src/assets/illustration1.png" // Replace with your illustration URL
            alt="Session Illustration"
            className="h-64 w-64 ml-32"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-xl font-bold mb-6">Lab Sheet Questions</h2>
        {session.labSheet && session.labSheet.length > 0 ? (
          <ol className="list-decimal ml-6">
            {session.labSheet.map((question, index) => (
              <li className="mb-2" key={index}>
                {question.question}
              </li> // Display labSheet questions
            ))}
          </ol>
        ) : (
          <p>No lab sheet questions available for this session.</p>
        )}
      </div>

      <div className="mt-4">
        <a
          href={`vscode://file/${projectPath}?sessionId=${localStorage.getItem(
            "sessionId"
          )}&authToken=${localStorage.getItem("authToken")}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Open in VS Code
        </a>
        <button
          onClick={setProjectPath}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-4"
        >
          Set Project Path
        </button>
      </div>
    </div>
  );
};

export default Session;
