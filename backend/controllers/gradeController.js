const ActivityEvaluation = require('../models/ActivityEvaluation');

// Get an evaluation by ID
const getEvaluation = async (req, res) => {
    try {
        const evaluation = await ActivityEvaluation.findById(req.params.id);
        if (!evaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        res.json(evaluation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching evaluation' });
    }
};

// Create a new evaluation
const createEvaluation = async (req, res) => {
    try {
        const { sessionId, activityId, studentId, codeSubmission, aiEvaluation } = req.body;
        const newEvaluation = new ActivityEvaluation({
            sessionId,
            activityId,
            studentId,
            codeSubmission,
            aiEvaluation
        });
        const savedEvaluation = await newEvaluation.save();
        res.status(201).json(savedEvaluation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating evaluation' });
    }
};

// Update an existing evaluation
const updateEvaluation = async (req, res) => {
    try {
        const { instructorEvaluation } = req.body;
        const updatedEvaluation = await ActivityEvaluation.findByIdAndUpdate(
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
        const deletedEvaluation = await ActivityEvaluation.findByIdAndDelete(req.params.id);
        if (!deletedEvaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        res.json({ message: 'Evaluation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting evaluation' });
    }
};

module.exports = {
    getEvaluation,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation
};
