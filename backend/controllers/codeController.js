const { model } = require("mongoose");
const codeUploads = require("../models/codeUploads");

const getSessionsByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch distinct session IDs from the code uploads of the student
    const sessions = await codeUploads.find({ studentId });

    if (!sessions.length) {
      return res
        .status(404)
        .json({ message: "No sessions found for this student" });
    }

    return res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return res.status(500).json({ message: "Failed to fetch sessions", error });
  }
};

module.exports = { getSessionsByStudentId };