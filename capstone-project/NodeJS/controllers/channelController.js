import Channel from '../models/Channel.js';
import User from '../models/User.js';
import Video from '../models/Video.js'; // Import Video model for video operations

// Create a new channel (protected, requires authentication)
export const createChannel = async (req, res) => {
    const { channelName, description, profileImage, channelBanner } = req.body;

    // Check for missing fields
    if (!channelName || !description) {
        return res.status(400).json({ message: "Channel name and description are required." });
    }

    try {
        console.log("Request Body:", req.body); // Log incoming data for debugging

        // Check if channel name already exists
        const existingChannel = await Channel.findOne({ channelName });
        if (existingChannel) {
            return res.status(400).json({ message: "Channel name already exists" });
        }

        const channel = new Channel({
            channelName,
            description,
            profileImage,
            channelBanner,
            owner: req.user._id, // Assign the logged-in user's ID as the owner
        });

        await channel.save();
        res.status(201).json({ message: 'Channel created successfully', channel });
    } catch (error) {
        console.error("Error creating channel:", error); // Log the error for debugging
        res.status(500).json({ message: error.message || "An error occurred while creating the channel." });
    }
};

// Get a specific channel by its ID
export const getChannel = async (req, res) => {
    const { channelId } = req.params;

    try {
        const channel = await Channel.findById(channelId)
            .populate('owner', 'username profilePic')
            .populate('videos'); // Optional: populate videos if referenced

        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        res.status(200).json(channel);
    } catch (error) {
        console.error("Error fetching channel:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update a channel (protected, only owner can update)
export const updateChannel = async (req, res) => {
    const { channelId } = req.params;
    const { channelName, description, profileImage, channelBanner } = req.body;

    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        // Check if the user is the owner
        if (!channel.owner.equals(req.user._id)) {
            return res.status(403).json({ message: 'You do not have permission to update this channel' });
        }

        // Update channel fields only if provided in the request
        if (channelName) channel.channelName = channelName;
        if (description) channel.description = description;
        if (profileImage) channel.profileImage = profileImage;
        if (channelBanner) channel.channelBanner = channelBanner;

        await channel.save();
        res.status(200).json({ message: 'Channel updated successfully', channel });
    } catch (error) {
        console.error("Error updating channel:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get videos filtered by channelId if provided
export const getVideos = async (req, res) => {
    const { channelId } = req.query;
    const filter = channelId ? { channelId } : {};

    try {
        const videos = await Video.find(filter)
            .populate({
                path: 'channelId',
                select: 'channelName profileImage channelBanner description',
            });

        res.status(200).json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ message: "Error fetching videos" });
    }
};

// Delete a channel (protected, only owner can delete)
export const deleteChannel = async (req, res) => {
    const { channelId } = req.params;

    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        // Check if the user is the owner
        if (!channel.owner.equals(req.user._id)) {
            return res.status(403).json({ message: 'You do not have permission to delete this channel' });
        }

        await channel.remove();
        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error("Error deleting channel:", error);
        res.status(500).json({ message: error.message });
    }
};
