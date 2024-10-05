import React from "react";

interface Evaluation {
  sessionId: string;
  activityId: string;
  studentId: string;
  studentName: string;
  email: string;
  codeSubmission: string;
  aiEvaluation?: {
    score: number;
    feedback: string;
  };
  instructorEvaluation?: {
    score: number;
    feedback: string;
  };
  uploadedAt: string;
}

const StudentTable: React.FC<{ evaluations: Evaluation[] }> = ({ evaluations }) => {
  if (!evaluations || evaluations.length === 0) {
    return <div>No evaluation data available</div>;
  }

  const [filter, setFilter] = React.useState("");
  const [scoreFilter, setScoreFilter] = React.useState<"weak" | "average" | "good" | null>(null);

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesName = evaluation.studentName.toLowerCase().includes(filter.toLowerCase());
    const matchesScore = scoreFilter === null ||
      (scoreFilter === "weak" && (evaluation.aiEvaluation?.score || 0) < 50) ||
      (scoreFilter === "average" && (evaluation.aiEvaluation?.score || 0) >= 50 && (evaluation.aiEvaluation?.score || 0) < 70) ||
      (scoreFilter === "good" && (evaluation.aiEvaluation?.score || 0) >= 70);

    return matchesName && matchesScore;
  });

  const handleGenerateReport = () => {
    console.log("Generating report...");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 bg-[#2148C0] text-white border border-gray-200 rounded-lg p-4">
        <input
          type="text"
          placeholder="Filter by Student Name/IT Number"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-1/3 text-black"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setScoreFilter("weak")}
            className={`px-4 py-2 rounded border border-[#E67E22] text-[#E67E22] ${scoreFilter === "weak" ? "bg-[#E67E22] text-white" : "bg-white hover:bg-[#E67E22] hover:text-white"}`}
          >
            Weak
          </button>
          <button
            onClick={() => setScoreFilter("average")}
            className={`px-4 py-2 rounded border border-[#F1C40F] text-[#F1C40F] ${scoreFilter === "average" ? "bg-[#F1C40F] text-white" : "bg-white hover:bg-[#F1C40F] hover:text-white"}`}
          >
            Average
          </button>
          <button
            onClick={() => setScoreFilter("good")}
            className={`px-4 py-2 rounded border border-[#2ECC71] text-[#2ECC71] ${scoreFilter === "good" ? "bg-[#2ECC71] text-white" : "bg-white hover:bg-[#2ECC71] hover:text-white"}`}
          >
            Good
          </button>
          <button
            onClick={() => setScoreFilter(null)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
        <button
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mt-0">
        <h2 className="text-xl font-bold mb-6">Submitted</h2>
        {filteredEvaluations.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 text-left">Student ID</th>
                <th className="border-b py-2 text-left">Student Name</th>
                <th className="border-b py-2 text-left">Email</th>
                <th className="border-b py-2 text-left">Session ID</th>
                <th className="border-b py-2 text-left">Activity ID</th>
                <th className="border-b py-2 text-left">Uploaded On</th>
                <th className="border-b py-2 text-left text-center">AI Evaluation</th>
                <th className="border-b py-2 text-left text-center">Instructor Evaluation</th>
                <th className="border-b py-2 text-left">Review Submission</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluations.map((evaluation) => (
                <tr key={evaluation.studentId} className="hover:bg-gray-100">
                  <td className="border-b py-2">{evaluation.studentId}</td>
                  <td className="border-b py-2">{evaluation.studentName}</td>
                  <td className="border-b py-2">{evaluation.email}</td>
                  <td className="border-b py-2">{evaluation.sessionId}</td>
                  <td className="border-b py-2">{evaluation.activityId}</td>
                  <td className="border-b py-2">
                    {new Date(evaluation.uploadedAt).toLocaleString('en-US', { month: 'short', day: 'numeric' }).replace(' ', '-').toUpperCase()}
                  </td>
                  <td className="border-b py-2 text-center">
                    {evaluation.aiEvaluation ? evaluation.aiEvaluation.feedback : "N/A"}
                  </td>
                  <td className="border-b py-2 text-center">
                    {evaluation.instructorEvaluation ? evaluation.instructorEvaluation.feedback : "N/A"}
                  </td>
                  <td className="border-b py-2">
                    <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No evaluations found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentTable;
