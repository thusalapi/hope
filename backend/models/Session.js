const mongoose = require('mongoose');
const { z } = require('zod');

const sessionSchemaZod = z.object({
    title: z.string(),
    description: z.string().optional(),
    instructorId: z.string(),
    groupIds: z.array(z.string()),
    labSheet: z.array(z.object({
        question: z.string()
    })),
    date: z.string(),
    startTime: z.string(),
    duration: z.number().positive(),
});

const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    instructorId: {
        type: String,
        required: true
    },
    groupIds: [{
        type: String,
        required: true
    }],
    labSheet: [{
        question: {
            type: String,
            required: true
        }
    }],
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

sessionSchema.pre('save', function (next) {
    const session = this;
    const validation = sessionSchemaZod.safeParse(session.toObject());
    if (!validation.success) {
        return next(new Error('Validation failed: ' + validation.error.errors.map(e => e.message).join(', ')));
    }
    next();
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
