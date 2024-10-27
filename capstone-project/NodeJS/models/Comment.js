import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', commentSchema);
