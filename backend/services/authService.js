const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign(
        { user: { id: user._id } },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        { user: { id: user._id } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

exports.refreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return this.generateToken({ _id: decoded.user.id });
    } catch (error) {
        return null;
    }
};