import Comment from '../models/Comment.js';

// Add a comment
export const addComment = async (req, res) => {
    const { text, videoId } = req.body;
    const userId = req.user.id; // Assuming req.user is set by auth middleware

    try {
        const comment = await Comment.create({ text, userId, videoId });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment" });
    }
};

// Edit a comment
export const editComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    try {
        const comment = await Comment.findOneAndUpdate(
            { _id: id, userId },
            { text, updatedAt: Date.now() },
            { new: true }
        );
        if (!comment) return res.status(404).json({ message: "Comment not found or not authorized" });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error updating comment" });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const comment = await Comment.findOneAndDelete({ _id: id, userId });
        if (!comment) return res.status(404).json({ message: "Comment not found or not authorized" });
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment" });
    }
};

// Get comments for a video
export const getComments = async (req, res) => {
    const { videoId } = req.params;
    try {
        const comments = await Comment.find({ videoId }).populate('userId', 'username profilePic');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
};
