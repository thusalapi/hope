const express = require("express");
const { generateReport } = require("../controllers/reportController");

const router = express.Router();

// Route to generate the report
router.get("/", generateReport);

module.exports = router;
