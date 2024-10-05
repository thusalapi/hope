const express = require('express');
const { authenticateToken } = require('../middleware/gradeAuth');
const { validateEvaluation } = require('../middleware/gradeValidate');
const { getALLEvaluation, createEvaluation, updateEvaluation, deleteEvaluation } = require('../controllers/gradeController');

const router = express.Router();

router.get('/', getALLEvaluation);
router.post('/', authenticateToken, validateEvaluation, createEvaluation);
router.put('/:id', authenticateToken, validateEvaluation, updateEvaluation);
router.delete('/:id', authenticateToken, deleteEvaluation);

module.exports = router;

