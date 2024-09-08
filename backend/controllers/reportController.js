const User = require("../models/User");

// Generate report data
exports.generateReport = async (req, res) => {
    try {
        const students = await User.find({ role: "Student" });
        const instructors = await User.find({ role: "Instructor" });

        res.status(200).json({
            studentCount: students.length,
            instructorCount: instructors.length,
            students,
            instructors,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate report" });
    }
};
