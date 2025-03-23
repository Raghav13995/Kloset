const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const auth = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'No token, authorization denied' 
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user from payload to request
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ 
            success: false,
            message: 'Token is not valid' 
        });
    }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required.'
        });
    }
    next();
};

// Middleware to check if user is vendor
const isVendor = (req, res, next) => {
    if (req.user.role !== 'vendor' && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Vendor role required.'
        });
    }
    next();
};

module.exports = {
    auth,
    isAdmin,
    isVendor
}; 