import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Code {
  code: string;
  commitMessage: string;
}

interface Session {
  sessionId: string;
  code: string;
  commitMessage: string;
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
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
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
  const [selectedCode, setSelectedCode] = useState<string | null>(null); // Full code for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

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
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [studentId]);

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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Sessions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions?.map((session, index) => (
          <div
            key={session.sessionId}
            className="bg-gray-50 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Session: {session.sessionId}
            </h2>
            <div className="space-y-3">
              <CodeBox
                key={index}
                code={{
                  code: session.code,
                  commitMessage: session.commitMessage,
                }}
                onClick={() => handleCodeClick(session.code)}
              />
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
