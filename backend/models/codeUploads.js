// CodeUpload.js
const mongoose = require("mongoose");

const codeUploadSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  commitMessage: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set to current date by default
  },
  version: {
    type: Number,
    required: true,
  },
});

// Create the model
const Code = mongoose.model("codeUploads", codeUploadSchema);

module.exports = Code;