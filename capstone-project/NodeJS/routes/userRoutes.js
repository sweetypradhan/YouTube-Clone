import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/', protect, getAllUsers); // Protect this route with JWT middleware

export default router;
