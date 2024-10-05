import React from 'react';

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

    return (
        <div className="mb-6 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Evaluations</h2>
            <table className="min-w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-4">Student Name</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Uploaded At</th>
                        <th className="text-left p-4">Session ID</th>
                        <th className="text-left p-4">Activity ID</th>
                        <th className="text-left p-4">Student ID</th>
                        <th className="text-left p-4">Code Submission</th>
                        <th className="text-left p-4">AI Evaluation</th>
                        <th className="text-left p-4">Instructor Evaluation</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluations.map((evaluation, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-4">{evaluation.studentName}</td>
                            <td className="p-4">{evaluation.email}</td>
                            <td className="p-4">{new Date(evaluation.uploadedAt).toLocaleString()}</td>
                            <td className="p-4">{evaluation.sessionId}</td>
                            <td className="p-4">{evaluation.activityId}</td>
                            <td className="p-4">{evaluation.studentId}</td>
                            <td className="p-4">{evaluation.codeSubmission}</td>
                            <td className="p-4">
                                {evaluation.aiEvaluation ? (
                                    <>
                                        <div>Score: {evaluation.aiEvaluation.score}</div>
                                        <div>Feedback: {evaluation.aiEvaluation.feedback}</div>
                                    </>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td className="p-4">
                                {evaluation.instructorEvaluation ? (
                                    <>
                                        <div>Score: {evaluation.instructorEvaluation.score}</div>
                                        <div>Feedback: {evaluation.instructorEvaluation.feedback}</div>
                                    </>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
