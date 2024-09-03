const express = require('express');
const { authenticateToken } = require('../middleware/auth'); // Adjust if needed
const {
    getEvaluation,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation
} = require('../controllers/activityEvaluationController');

const router = express.Router();

router.get('/:id', authenticateToken, getEvaluation);
router.post('/', authenticateToken, createEvaluation);
router.put('/:id', authenticateToken, updateEvaluation);
router.delete('/:id', authenticateToken, deleteEvaluation);

module.exports = router;
