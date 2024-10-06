import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Code {
  code: string;
  commitMessage: string;
  timestamp: string; // Added timestamp for sorting
}

interface Session {
  sessionId: string;
  codes: Code[]; // Changed to an array of codes
}

interface CodeBoxProps {
  code: Code;
  onClick: () => void;
}

interface CodeModalProps {
  code: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const CodeBox: React.FC<CodeBoxProps> = ({ code, onClick }) => {
  return (
    <div
      className="bg-white p-3 border border-gray-200 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <p className="text-sm font-semibold text-gray-700 mb-1">
        Commit: <span className="text-blue-600">{code.commitMessage}</span>
      </p>
      <p className="text-xs text-gray-500 truncate">
        Code: <span className="italic">{code.code}</span>
      </p>
    </div>
  );
};

const CodeModal: React.FC<CodeModalProps> = ({ code, isOpen, onClose }) => {
  if (!isOpen || !code) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-full w-auto relative max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Code Preview</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
          {code}
        </pre>
        <button
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const SessionList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("latest");

  // New state variables for search inputs
  const [searchSessionId, setSearchSessionId] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");

  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    console.error("Token is not available.");
    return null;
  }

  const decodedToken: { id: string } = jwtDecode(storedToken);
  const studentId = decodedToken.id;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/codes/${studentId}`
        );

        // Transform the response data into the desired structure
        const formattedSessions: Session[] = response.data.reduce(
          (acc: Session[], curr: any) => {
            const { sessionId, code, commitMessage, timestamp } = curr;

            // Find or create the session
            let session = acc.find((s) => s.sessionId === sessionId);
            if (!session) {
              session = { sessionId, codes: [] };
              acc.push(session);
            }

            // Push the code into the session
            session.codes.push({ code, commitMessage, timestamp });
            return acc;
          },
          []
        );

        // Sort the codes within each session by timestamp
        formattedSessions.forEach((session) => {
          session.codes.sort((a, b) =>
            sortOrder === "latest"
              ? new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
              : new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
          );
        });

        setSessions(formattedSessions);
        setFilteredSessions(formattedSessions); // Set filtered sessions initially to all sessions
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [studentId, sortOrder]);

  // Function to filter sessions based on search inputs
  const filterSessions = () => {
    const filtered = sessions.filter((session) => {
      const matchesSessionId =
        searchSessionId === "" || session.sessionId.includes(searchSessionId);
      const matchesDate =
        searchDate === "" ||
        new Date(session.codes[0].timestamp).toISOString().split("T")[0] ===
          searchDate; // Compare dates (YYYY-MM-DD)

      return matchesSessionId && matchesDate;
    });

    setFilteredSessions(filtered);
  };

  // Call filterSessions whenever search inputs change
  useEffect(() => {
    filterSessions();
  }, [searchSessionId, searchDate, sessions]);

  const handleCodeClick = (code: string) => {
    setSelectedCode(code);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCode(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Codes</h1>

      {/* Search Bar for Session ID and Date */}
      <div className="mb-4 flex flex-col md:flex-row items-center">
        <div className="mb-2 md:mr-2 w-full md:w-1/2">
          <label
            htmlFor="sessionId"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            Search by Session ID
          </label>
          <input
            id="sessionId"
            type="text"
            placeholder="Enter Session ID"
            value={searchSessionId}
            onChange={(e) => setSearchSessionId(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />
        </div>
        <div className="mb-2 md:mr-2 w-full md:w-1/2">
          <label
            htmlFor="date"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            Search by Date
          </label>
          <input
            id="date"
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />
        </div>
        <div className="mb-2 md:mr-2">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Sort by:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <div
            key={session.sessionId}
            className="bg-blue-600 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-100">
              Session: {session.sessionId}
            </h2>
            <div className="space-y-3">
              {session.codes.map((code, index) => (
                <CodeBox
                  key={index} // Use index as key since codes are unique within the session
                  code={code}
                  onClick={() => handleCodeClick(code.code)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <CodeModal
        code={selectedCode}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default SessionList;
