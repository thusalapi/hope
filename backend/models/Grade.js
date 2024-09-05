const mongoose = require('mongoose');
const { z } = require('zod');

// Define the Zod schema for validation
const activityEvaluationSchemaZod = z.object({
    sessionId: z.string().nonempty(),
    activityId: z.string().nonempty(),
    studentId: z.string().nonempty(),
    codeSubmission: z.string().nonempty(),
    aiEvaluation: z.object({
        score: z.number().min(0).max(100),
        feedback: z.string().optional()
    }).optional(),
    instructorEvaluation: z.object({
        score: z.number().min(0).max(100),
        feedback: z.string().optional()
    }).optional(),
    instructorEvaluatedAt: z.date().optional()
});

// Define the Mongoose schema
const activityEvaluationSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    activityId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    codeSubmission: {
        type: String,
        required: true
    },
    aiEvaluation: {
        score: {
            type: Number,
            min: 0,
            max: 100,
        },
        feedback: {
            type: String
        }
    },
    instructorEvaluation: {
        score: {
            type: Number,
            min: 0,
            max: 100,
        },
        feedback: {
            type: String
        }
    },
    instructorEvaluatedAt: {
        type: Date
    }
});

// Pre-save validation using Zod
activityEvaluationSchema.pre('save', function (next) {
    const activityEvaluation = this;
    const validation = activityEvaluationSchemaZod.safeParse(activityEvaluation.toObject());
    if (!validation.success) {
        return next(new Error('Validation failed: ' + validation.error.errors.map(e => e.message).join(', ')));
    }
    next();
});

const ActivityEvaluation = mongoose.model('ActivityEvaluation', activityEvaluationSchema);

module.exports = ActivityEvaluation;
