import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const VsCodeOpenButton: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    const storedtoken = localStorage.getItem("token");

    console.log(storedtoken, storedSessionId);
    if (storedtoken) {
      const decodedToken: { id: string } = jwtDecode(storedtoken);
      setStudentId(decodedToken.id);
    } else {
      console.error("Token is not available.");
    }

    setSessionId(storedSessionId);
  }, []);

  const openVSCode = () => {
    if (sessionId && studentId) {
      const vscodeURL = `vscode://samoraAI.hope/command?sessionId=${sessionId}&studentId=${studentId}`;

      window.location.href = vscodeURL;
    } else {
      console.error("Session ID or Student ID is not available.");
    }
  };

  return (
    <button
      onClick={openVSCode}
      className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-auto mb-20 mx-4"
    >
      Open VS Code
    </button>
  );
};

export default VsCodeOpenButton;
