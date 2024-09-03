exports.handleError = (res, error, message = 'An error occurred', statusCode = 500) => {
    console.error(message, error);
    res.status(statusCode).json({ message, error: error.message });
};
