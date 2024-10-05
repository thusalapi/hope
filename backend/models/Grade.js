const mongoose = require('mongoose');
const { z } = require('zod');

// Define the Zod schema for validation
const gradeSchemaZod = z.object({
    sessionId: z.string().nonempty(),
    activityId: z.string().nonempty(),
    studentId: z.string().nonempty(),
    studentName: z.string().nonempty(),
    email: z.string().email(),
    codeSubmission: z.string().nonempty(),
    aiEvaluation: z.object({
        score: z.number().min(0).max(100),
        feedback: z.string().optional()
    }).optional(),
    instructorEvaluation: z.object({
        score: z.number().min(0).max(100),
        feedback: z.string().optional()
    }).optional(),
    instructorEvaluatedAt: z.date().optional(),
    uploadedAt: z.date()
});

// Define the Mongoose schema
const gradeSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    activityId: { type: String, required: true },
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    codeSubmission: { type: String, required: true },
    aiEvaluation: {
        score: { type: Number, min: 0, max: 100 },
        feedback: { type: String }
    },
    instructorEvaluation: {
        score: { type: Number, min: 0, max: 100 },
        feedback: { type: String }
    },
    instructorEvaluatedAt: { type: Date },
    uploadedAt: { type: Date, required: true }
});

const grade = mongoose.model('Grade', gradeSchema);

// Pre-save validation using Zod
gradeSchema.pre('save', function (next) {
    const grade = this;
    const validation = gradeSchemaZod.safeParse(grade.toObject());
    if (!validation.success) {
        return next(new Error('Validation failed: ' + validation.error.errors.map(e => e.message).join(', ')));
    }
    next();
});


module.exports = grade;
