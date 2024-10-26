import express from 'express';
import { getVideos, getVideo, addVideo, deleteVideo } from '../controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

// Route to get all videos
router.get('/', getVideos);

// Route to get a specific video by ID
router.get('/:id', getVideo);

// Route to add a new video (protected)
router.post('/', protect, addVideo);

// Route to delete a video (protected)
router.delete('/:id', protect, deleteVideo);

export default router;
