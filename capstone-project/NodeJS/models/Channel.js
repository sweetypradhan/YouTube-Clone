// models/Channel.js
import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: [true, 'Channel name is required'], // Custom error message
        unique: true // Ensure unique channel names
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'] // Validation
    },
    profileImage: {
        type: String,
        required: [true, 'Profile image is required'],
    },
    channelBanner: {
        type: String,
        required: [true, 'Channel banner is required'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model (owner of the channel)
        required: [true, 'Owner is required'],
    },
    subscribers: {
        type: Number,
        default: 0
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }]
}, { timestamps: true });

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;
