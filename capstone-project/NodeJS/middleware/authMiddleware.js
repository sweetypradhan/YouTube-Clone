import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = 'my_super_secret_key_12345'; // Use the same secret key

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('JWT ')) {
        const token = authHeader.split(' ')[1];

        try {
            const verifiedToken = jwt.verify(token, JWT_SECRET); // Synchronous verification
            const user = await User.findById(verifiedToken.id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = user; // Attach the user to the request object
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(403).json({ message: 'Token not present or invalid format' });
    }
};
