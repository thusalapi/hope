const express = require('express');
const { createSession, getSessions, getSessionById, updateSession, deleteSession } = require('../controllers/sessionController');

const router = express.Router();

router.get('/', getSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

module.exports = router;
