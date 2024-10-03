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

const StudentTable: React.FC<{ evaluation: Evaluation }> = ({ evaluation }) => {
    if (!evaluation) {
        return <div>No evaluation data available</div>;
    }

    return (
        <div className="card">
            <h2>Evaluation Details</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Student Name</th>
                        <td>{evaluation.studentName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{evaluation.email}</td>
                    </tr>
                    <tr>
                        <th>Uploaded At</th>
                        <td>{new Date(evaluation.uploadedAt).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Session ID</th>
                        <td>{evaluation.sessionId}</td>
                    </tr>
                    <tr>
                        <th>Activity ID</th>
                        <td>{evaluation.activityId}</td>
                    </tr>
                    <tr>
                        <th>Student ID</th>
                        <td>{evaluation.studentId}</td>
                    </tr>
                    <tr>
                        <th>Code Submission</th>
                        <td>{evaluation.codeSubmission}</td>
                    </tr>
                    <tr>
                        <th>AI Evaluation</th>
                        <td>
                            {evaluation.aiEvaluation ? (
                                <>
                                    <div>Score: {evaluation.aiEvaluation.score}</div>
                                    <div>Feedback: {evaluation.aiEvaluation.feedback}</div>
                                </>
                            ) : (
                                'N/A'
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Instructor Evaluation</th>
                        <td>
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
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;