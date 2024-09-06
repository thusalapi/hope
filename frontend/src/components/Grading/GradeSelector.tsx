import React from "react";

interface GradeSelectorProps {
  selectedGrade: string | null;
  onSelectGrade: (grade: string) => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onSelectGrade,
}) => {
  const grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];

  return (
    <div className="flex flex-wrap mb-6">
      {grades.map((grade) => (
        <button
          key={grade}
          onClick={() => onSelectGrade(grade)}
          className={`px-4 py-2 m-1 rounded-full ${
            selectedGrade === grade
              ? "bg-blue-custom text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {grade}
        </button>
      ))}
    </div>
  );
};

export default GradeSelector;
