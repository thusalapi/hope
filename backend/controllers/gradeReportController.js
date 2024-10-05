const Grade = require("../models/Grade");

// Generate report data
exports.generateReport = async (req, res) => {
    try {
        const students = await User.find({ role: "Student" });
        const instructors = await User.find({ role: "Instructor" });

        res.status(200).json({
            studentCount: studentId.length,
            attempt: studentId.length/uploadedAt.length,
            //avg: aievaluation,
            sessionId,
            activityId,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate report" });
    }
};
