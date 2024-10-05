import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import companyLogo from "../../../src/assets/HOPE.png";

function ReportGeneratorButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleContinue = async () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }

    console.log("Selected option:", selectedOption);

    try {
      const response = await axios.get(`http://localhost:5000/session`, {
        params: { option: selectedOption },
      });

      console.log("API Response:", response.data);
      const sessionData = response.data;

      if (!sessionData || !Array.isArray(sessionData)) {
        console.error("Session data is not an array:", sessionData);
        alert("No session data available.");
        return;
      }

      generatePDF(sessionData);
    } catch (error) {
      console.error("Error fetching session data:", error);
      alert("Failed to fetch session data.");
    }

    closeModal();
  };

  const generatePDF = (data: any[]) => {
    const doc = new jsPDF();
    const tableRows = data.map((session) => [
      session.title,
      session.instructorId,
      session.groupIds.join(", "),
      formatDate(session.createdAt),
      session.startTime,
      session.duration,
    ]);

    const margin = 14;
    const logoWidth = 30;
    const logoHeight = 20;
    const maxWidth = 290;

    const textLines = doc.splitTextToSize(
      `This report contains session data for the selected time period. It includes details such as session title, instructor ID, group IDs, date, start time, duration, quality check result, and any recorded issues.`,
      maxWidth
    );
    const textParagraph = textLines.join("\n");

    doc.addImage(
      companyLogo,
      "PNG",
      doc.internal.pageSize.width - margin - logoWidth,
      margin,
      logoWidth,
      logoHeight
    );
    doc
      .setFontSize(10)
      .setFont("helvetica")
      .text("Hope", margin, margin + 10);
    doc.text("shehanwickramasooriya05@gmail.com", margin, margin + 20);
    doc.text(formatDate(new Date().toString()), margin, margin + 30);

    doc
      .setFontSize(20)
      .setTextColor(56, 119, 91)
      .setFont("helvetica", "bold")
      .text("Session Report", margin, 70);
    doc
      .setFontSize(10)
      .setFont("helvetica", "normal")
      .setTextColor(0, 0, 0)
      .text(textParagraph, margin, 80, { maxWidth });

    (doc as any).autoTable({
      head: [
        [
          "Title",
          "Instructor ID",
          "Group IDs",
          "Date",
          "Start Time",
          "Duration",
        ],
      ],
      body: tableRows,
      startY: 100,
      headStyles: { fillColor: [31, 41, 55] },
    });

    doc
      .setFontSize(10)
      .setTextColor(200, 200, 200)
      .text(
        `Report generated by Session Management System`,
        margin,
        doc.internal.pageSize.height - 10
      );
    doc.save(`SessionReport_${selectedOption}.pdf`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-primary bg-blue-500 hover:bg-white-content text-white text-bold px-6 py-2 rounded-md mb-4 w-full"
      >
        Generate Reports
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Choose Time Period</h2>

            <div className="mb-6">
              <label className="block mb-2">
                <input
                  type="radio"
                  value="7days"
                  checked={selectedOption === "7days"}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Past 7 days
              </label>
              <label className="block">
                <input
                  type="radio"
                  value="1month"
                  checked={selectedOption === "1month"}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Past month
              </label>
            </div>

            <button
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Continue
            </button>

            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportGeneratorButton;
