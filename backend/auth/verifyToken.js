import jwt from 'jsonwebtoken';
import Tutor from '../models/TutorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
    // get token from headers 
    const authToken = req.headers.authorization;

    // check token exists 
    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const token = authToken.split(' ')[1];

        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.id;
        req.role = decoded.role;

        next(); // must call the next function 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token is expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;

    let user;

    const student = await User.findById(userId);
    const tutor = await Tutor.findById(userId);

    if (student) {
        user = student;
    }
    if (tutor) {
        user = tutor;
    }

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: 'You are not authorized' });
    }

    next();
};

