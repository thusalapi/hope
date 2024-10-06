// routes/sessionRoutes.js
const express = require("express");
const { getSessionsByStudentId } = require("../controllers/codeController");
const router = express.Router();

// Route to get sessions by student ID
router.get("/:studentId", getSessionsByStudentId);

module.exports = router;