import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import User from '../models/users.model.js'

export const authAdminMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Authentication required');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded?.userId })
        if (user?.role != 'Admin') {
            return res.status(403).send('Access denied');
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
}
