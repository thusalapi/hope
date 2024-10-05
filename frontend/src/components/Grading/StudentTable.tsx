import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../src/assets/HOPE.png"; // Add this line


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
  const navigate = useNavigate();

  if (!evaluations || evaluations.length === 0) {
    return <div>No evaluation data available</div>;
  }

  const [filter, setFilter] = useState("");
  const [scoreFilter, setScoreFilter] = useState<"weak" | "average" | "good" | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [manualGrades, setManualGrades] = useState<{ [key: string]: string }>({});

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesName = evaluation.studentName.toLowerCase().includes(filter.toLowerCase());
    const matchesScore = scoreFilter === null ||
      (scoreFilter === "weak" && (evaluation.aiEvaluation?.score || 0) < 50) ||
      (scoreFilter === "average" && (evaluation.aiEvaluation?.score || 0) >= 50 && (evaluation.aiEvaluation?.score || 0) < 70) ||
      (scoreFilter === "good" && (evaluation.aiEvaluation?.score || 0) >= 70);

    return matchesName && matchesScore;
  });

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    
// Add the logo
doc.addImage(logo, 'PNG', 170, 10, 30, 20); // Replace your existing addImage line with this



    // Calculate statistics
    const totalStudents = filteredEvaluations.length;
    const totalScores = filteredEvaluations.reduce((acc, evaluation) => {
      const score = evaluation.aiEvaluation?.score || 0;
      return acc + score;
    }, 0);
    const averageScore = totalScores / totalStudents || 0;
    const weakCount = filteredEvaluations.filter(evaluation => (evaluation.aiEvaluation?.score || 0) < 50).length;
    const weakPercentage = (weakCount / totalStudents) * 100 || 0;
    const goodCount = filteredEvaluations.filter(evaluation => (evaluation.aiEvaluation?.score || 0) >= 70).length;
    const averageCount = filteredEvaluations.filter(evaluation => (evaluation.aiEvaluation?.score || 0) >= 50 && (evaluation.aiEvaluation?.score || 0) < 70).length;

// Add a title
doc.setFontSize(18);
doc.setTextColor(0, 0, 0); // Set text color to black
doc.setFont("helvetica", "bold"); // Set font to bold
doc.text("Student Evaluation Report", 14, 20);
doc.setFont("helvetica", "normal"); // Reset font to normal for subsequent text


    // Add a description
    doc.setFontSize(12);
    const descriptionLines = doc.splitTextToSize(
      "This report provides a comprehensive overview of student performance based on AI evaluations and manual grading. It highlights strengths and areas for improvement, ensuring that students receive the feedback necessary to enhance their learning.",
      180 // Width of the text box
    );
    doc.text(descriptionLines, 14, 40);

    // Add statistics as a small table
    autoTable(doc, {
      head: [["Metric", "Value"]],
      body: [
        ["Total Evaluations", totalStudents],
        ["Average AI Score", averageScore.toFixed(2)],
        ["Weak Performance Percentage", `${weakPercentage.toFixed(2)}%`],
        ["Number of Good Evaluations", goodCount],
        ["Number of Average Evaluations", averageCount],
      ],
      startY: 70,
      styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineColor: [0, 0, 0] },
      headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
    });

    // Add the report generation date
    doc.setFontSize(10);
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, 14, (doc as any).lastAutoTable.finalY + 10);

    // Adding a table
    const tableColumn = [
      "SID",
      "Email",
      "Session ",
      "Activity",
      "Date ",
      "Score",
      "AI Grade",
      "Instructor Feedback",,
    ];
    
    const tableRows = filteredEvaluations.map(evaluation => ([
      evaluation.studentId,
      evaluation.email,
      evaluation.sessionId,
      evaluation.activityId,
      new Date(evaluation.uploadedAt).toLocaleString('en-US', { month: 'short', day: 'numeric' }).replace(' ', '-').toUpperCase(),
      evaluation.aiEvaluation?.score || "N/A",
      evaluation.aiEvaluation?.feedback || "N/A",
      evaluation.instructorEvaluation?.feedback || "N/A",
    ]));

    // Move the cursor down for the table
    const startY = (doc as any).lastAutoTable.finalY + 20; // Ensuring table is below the statistics
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: startY,
      styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineColor: [0, 0, 0] },
      headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
    });
    
    // Save the PDF
    doc.save("Student_Evaluation_Report.pdf");
  };

  const toggleRow = (studentId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(studentId)) {
      newExpandedRows.delete(studentId);
    } else {
      newExpandedRows.add(studentId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleGradeChange = (studentId: string, newGrade: string) => {
    setManualGrades((prev) => ({ ...prev, [studentId]: newGrade }));
  };

  const handleSaveGrades = (studentId: string) => {
    console.log("Saving grade for student:", studentId, "Grade:", manualGrades[studentId]);

    // Collapse the row after saving the grade
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      newExpandedRows.delete(studentId);
      return newExpandedRows;
    });
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
            className={`px-4 py-2 rounded border border-[#E67E22] text-${scoreFilter === "weak" ? "white" : "[#E67E22]"} ${scoreFilter === "weak" ? "bg-[#E67E22]" : "bg-white hover:bg-[#E67E22] hover:text-white"}`}
          >
            Weak
          </button>
          <button
            onClick={() => setScoreFilter("average")}
            className={`px-4 py-2 rounded border border-[#F1C40F] text-${scoreFilter === "average" ? "white" : "[#F1C40F]"} ${scoreFilter === "average" ? "bg-[#F1C40F]" : "bg-white hover:bg-[#F1C40F] hover:text-white"}`}
          >
            Average
          </button>
          <button
            onClick={() => setScoreFilter("good")}
            className={`px-4 py-2 rounded border border-[#2ECC71] text-${scoreFilter === "good" ? "white" : "[#2ECC71]"} ${scoreFilter === "good" ? "bg-[#2ECC71]" : "bg-white hover:bg-[#2ECC71] hover:text-white"}`}
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
        <div className="flex space-x-2">
          <button
            onClick={() => window.open("https://courseweb.sliit.lk/pluginfile.php/128323/mod_resource/content/1/Tutorial%201.pdf", "_blank")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            View Labsheet
          </button>
          <button
            onClick={handleGenerateReport}
            className="px-4 py-2 bg-[#38B2A8] text-white rounded hover:bg-[#2E8C82]"
          >
            Generate Report
          </button>
        </div>
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
                <React.Fragment key={evaluation.studentId}>
                  <tr className="hover:bg-gray-100">
                    <td className="border-b py-2 px-4">{evaluation.studentId}</td>
                    <td className="border-b py-2 px-4">{evaluation.studentName}</td>
                    <td className="border-b py-2 px-4">{evaluation.email}</td>
                    <td className="border-b py-2 px-4">{evaluation.sessionId}</td>
                    <td className="border-b py-2 px-4">{evaluation.activityId}</td>
                    <td className="border-b py-2 px-4">
                      {new Date(evaluation.uploadedAt).toLocaleString('en-US', { month: 'short', day: 'numeric' }).replace(' ', '-').toUpperCase()}
                    </td>
                    <td className="border-b py-2 text-center px-4">
                      {evaluation.aiEvaluation ? evaluation.aiEvaluation.feedback : "N/A"}
                    </td>
                    <td className="border-b py-2 text-center px-4">
                      {manualGrades[evaluation.studentId] || (evaluation.instructorEvaluation ? evaluation.instructorEvaluation.feedback : "N/A")}
                    </td>
                    <td className="border-b py-2 px-4">
                      <button onClick={() => toggleRow(evaluation.studentId)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Review
                      </button>
                    </td>
                  </tr>
                  {expandedRows.has(evaluation.studentId) && (
                    <tr>
                      <td colSpan={9} className="border-b py-4">
                        <pre className="bg-gray-100 p-4 rounded">
                          {evaluation.codeSubmission}
                        </pre>
                        <div className="mt-2">
                          <label htmlFor={`grade-select-${evaluation.studentId}`} className="block mb-2">Manual Grade:</label>
                          <select
                            id={`grade-select-${evaluation.studentId}`}
                            value={manualGrades[evaluation.studentId] || ""}
                            onChange={(e) => handleGradeChange(evaluation.studentId, e.target.value)}
                            className="p-2 border rounded"
                          >
                            <option value="" disabled>Select Grade</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                          </select>
                          <button
                            onClick={() => handleSaveGrades(evaluation.studentId)} // Save the grade and collapse
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Save Grade
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
