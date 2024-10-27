import express from 'express';
import { addComment, editComment, deleteComment, getComments } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the middleware
const router = express.Router();

router.post('/',protect, addComment);
router.put('/:id', protect, editComment);
router.delete('/:id', protect, deleteComment);
router.get('/:videoId', getComments);

export default router;
