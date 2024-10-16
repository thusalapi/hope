const grade = require('../models/Grade');

// Get an evaluation by ID
const getEvaluation = async (req, res) => {
    try {
        const evaluation = await grade.findById(req.params.id);
        if (!evaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        res.json(evaluation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching evaluation' });
    }
};

const getALLEvaluation = async (req, res) => {
    try {
        const evaluation = await grade.find();
        res.json(evaluation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new evaluation
const createEvaluation = async (req, res) => {
    try {
        const { sessionId, activityId, studentId, studentName, email, codeSubmission, aiEvaluation, instructorEvaluation, uploadedAt } = req.body;
        const newEvaluation = new grade({
            sessionId,
            activityId,
            studentId,
            studentName,
            email,
            codeSubmission,
            aiEvaluation,
            instructorEvaluation,
            uploadedAt
        });

        await newEvaluation.save();
        res.status(201).json(newEvaluation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating evaluation' });
    }
};

// Update an existing evaluation
const updateEvaluation = async (req, res) => {
    try {
        const { instructorEvaluation } = req.body;
        const updatedEvaluation = await grade.findByIdAndUpdate(
            req.params.id,
            { instructorEvaluation, instructorEvaluatedAt: new Date() },
            { new: true }
        );
        if (!updatedEvaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        res.json(updatedEvaluation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating evaluation' });
    }
};

// Delete an evaluation
const deleteEvaluation = async (req, res) => {
    try {
        const deletedEvaluation = await grade.findByIdAndDelete(req.params.id);
        if (!deletedEvaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        res.json({ message: 'Evaluation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting evaluation' });
    }
};

module.exports = {
    getALLEvaluation,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation
};
