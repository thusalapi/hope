import React from "react";
import { useMutation } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generateReport } from "../../services/reportApi";
import { Button } from "@/components/ui/button";

const ReportButton: React.FC = () => {
  const mutation = useMutation({
    mutationFn: () => generateReport(),
    onSuccess: (data) => {
      const pdf = new jsPDF();

      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(0, 102, 204);
      pdf.text("User Report", 105, 15, { align: "center" });

      // Add summary table
      autoTable(pdf, {
        head: [["Category", "Count"]],
        body: [
          ["Students", data.studentCount.toString()],
          ["Instructors", data.instructorCount.toString()],
        ],
        startY: 25,
        theme: "grid",
        headStyles: { fillColor: [0, 122, 255], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 248, 255] },
      });

      // Add pie chart
      const total = data.studentCount + data.instructorCount;
      const studentPercentage = (data.studentCount / total) * 100;
      const instructorPercentage = (data.instructorCount / total) * 100;

      // pdf.setFontSize(16);
      // pdf.setTextColor(0, 0, 0);
      // pdf.text("User Distribution", 105, 70, { align: "center" });

      // const centerX = 105;
      // const centerY = 110;
      // const radius = 40;

      // // Function to draw a pie slice
      // const drawPieSlice = (
      //   startAngle: number,
      //   endAngle: number,
      //   color: number[]
      // ) => {
      //   const x1 = centerX + radius * Math.cos(startAngle);
      //   const y1 = centerY + radius * Math.sin(startAngle);
      //   const x2 = centerX + radius * Math.cos(endAngle);
      //   const y2 = centerY + radius * Math.sin(endAngle);

      //   pdf.setFillColor(color[0], color[1], color[2]);
      //   pdf.lines(
      //     [
      //       [x1 - centerX, y1 - centerY],
      //       [x2 - centerX, y2 - centerY],
      //     ],
      //     centerX,
      //     centerY,
      //     [1, 1],
      //     "F"
      //   );
      // };

      // // Draw pie chart
      // const studentEndAngle = (studentPercentage / 100) * 2 * Math.PI;
      // drawPieSlice(0, studentEndAngle, [0, 102, 204]);
      // drawPieSlice(studentEndAngle, 2 * Math.PI, [255, 165, 0]);

      // Legend
      pdf.setFontSize(12);
      pdf.setFillColor(0, 102, 204);
      pdf.rect(70, 150, 10, 10, "F");
      pdf.text(`Students (${studentPercentage.toFixed(1)}%)`, 85, 158);

      pdf.setFillColor(255, 165, 0);
      pdf.rect(70, 165, 10, 10, "F");
      pdf.text(`Instructors (${instructorPercentage.toFixed(1)}%)`, 85, 173);

      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(128);
      pdf.text("Generated on " + new Date().toLocaleString(), 105, 285, {
        align: "center",
      });

      pdf.save("user-report.pdf");
    },
  });

  return <Button onClick={() => mutation.mutate()}>Download Report</Button>;
};

export default ReportButton;
