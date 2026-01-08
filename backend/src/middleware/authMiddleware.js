const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header (from frontend request)
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        // 401: Unauthorized access
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload (user ID) to the request object
        req.user = decoded.user;
        next(); // Move to the next function (the controller)
    } catch (err) {
        // Token is invalid (expired, corrupted, etc.)
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
