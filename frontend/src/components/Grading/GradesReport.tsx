import React from 'react';
import { useMutation } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { generateReport } from "../../services/reportApi";
import { Button } from "@/components/ui/button";

const ReportButton: React.FC = () => {
  const mutation = useMutation({
    mutationFn: () => generateReport(),
    onSuccess: (data) => {
      const pdf = new jsPDF();
      pdf.text(`Lab Session: ${data.sessionId}`, 10, 10);
      pdf.text(`Lab Sheet Number: ${data.activityId}`, 10, 20);
      pdf.text(`Student Count: ${data.studentCount}`, 10, 30);
      pdf.text(`Students Attempted: ${data.attempt}`, 10, 40);
      pdf.text(`Avergae Grade:`, 10, 50);
      pdf.save("user-report.pdf");
    },
  });

  return <Button onClick={() => mutation.mutate()}>Download Report</Button>;
};

export default ReportButton;
