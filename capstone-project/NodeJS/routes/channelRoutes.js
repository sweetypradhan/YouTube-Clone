// routes/channelRoutes.js
import express from 'express';
import { createChannel, getChannel, updateChannel, deleteChannel } from '../controllers/channelController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

// Route to create a new channel (protected)
router.post('/', protect, createChannel);

// Route to get a specific channel by its ID
router.get('/:channelId', getChannel);

// Route to update a channel (protected, only owner)
router.put('/:channelId', protect, updateChannel);

// Route to delete a channel (protected, only owner)
router.delete('/:channelId', protect, deleteChannel);

export default router;
