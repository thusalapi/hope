const { body, validationResult } = require('express-validator');

// Middleware to validate data for creating/updating evaluations
exports.validateEvaluation = [
    body('sessionId').notEmpty().withMessage('Session ID is required'),
    body('activityId').notEmpty().withMessage('Activity ID is required'),
    body('studentId').notEmpty().withMessage('Student ID is required'),
    body('codeSubmission').notEmpty().withMessage('Code submission is required'),
    // Optionally validate AI and instructor evaluations if they are provided
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
