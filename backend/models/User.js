const mongoose = require('mongoose');
const { z } = require('zod');

const userSchemaZod = z.object({
    googleId: z.string().nonempty(),
    name: z.string().nonempty(),
    email: z.string().email(),
    accessToken: z.string().nonempty(),
    groupNumber: z.string().optional()
});

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    groupNumber: {
        type: String
    },
});

const User = mongoose.model('User', userSchema);

userSchema.pre('save', function (next) {
    const user = this;
    const validation = userSchemaZod.safeParse(user.toObject());
    if (!validation.success) {
        return next(new Error('Validation failed: ' + validation.error.errors.map(e => e.message).join(', ')));
    }
    next();
});

module.exports = User;