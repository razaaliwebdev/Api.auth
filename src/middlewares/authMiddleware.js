import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided"
            });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).select("-password");

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    };
};

export default authMiddleware;