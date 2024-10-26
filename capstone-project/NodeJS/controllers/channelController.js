// // controllers/channelController.js
// import Channel from '../models/Channel.js';
// import User from '../models/User.js';

// // Create a new channel
// export const createChannel = async (req, res) => {
//     const { channelName, description, profileImage, channelBanner } = req.body;

//     try {
//         // Check if channel name already exists
//         const existingChannel = await Channel.findOne({ channelName });
//         if (existingChannel) {
//             return res.status(400).json({ message: "Channel name already exists" });
//         }

//         const channel = new Channel({
//             channelName,
//             description,
//             profileImage,
//             channelBanner,
//             owner: req.user._id, // Assign the logged-in user's ID
//         });

//         await channel.save();
//         res.status(201).json({ message: 'Channel created successfully', channel });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a specific channel by its ID
// export const getChannel = async (req, res) => {
//     const { channelId } = req.params;

//     try {
//         const channel = await Channel.findById(channelId).populate('owner', 'username profilePic');
//         if (!channel) {
//             return res.status(404).json({ message: 'Channel not found' });
//         }
//         res.status(200).json(channel);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a channel (protected, only owner)
// export const updateChannel = async (req, res) => {
//     const { channelId } = req.params;
//     const { channelName, description, profileImage, channelBanner } = req.body;

//     try {
//         const channel = await Channel.findById(channelId);
//         if (!channel) {
//             return res.status(404).json({ message: 'Channel not found' });
//         }

//         // Check if the user is the owner
//         if (!channel.owner.equals(req.user._id)) {
//             return res.status(403).json({ message: 'You do not have permission to update this channel' });
//         }

//         channel.channelName = channelName || channel.channelName;
//         channel.description = description || channel.description;
//         channel.profileImage = profileImage || channel.profileImage;
//         channel.channelBanner = channelBanner || channel.channelBanner;

//         await channel.save();
//         res.status(200).json({ message: 'Channel updated successfully', channel });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // // Update getVideos to filter by channelId if provided
// // export const getVideos = async (req, res) => {
// //     const { channelId } = req.query;
// //     const filter = channelId ? { channelId } : {};

// //     try {
// //         const videos = await Video.find(filter)
// //             .populate({
// //                 path: 'channelId',
// //                 select: 'channelName profileImage channelBanner description',
// //             });
// //         res.status(200).json(videos);
// //     } catch (error) {
// //         res.status(500).json({ message: "Error fetching videos" });
// //     }
// // };


// // Delete a channel (protected, only owner)
// export const deleteChannel = async (req, res) => {
//     const { channelId } = req.params;

//     try {
//         const channel = await Channel.findById(channelId);
//         if (!channel) {
//             return res.status(404).json({ message: 'Channel not found' });
//         }

//         // Check if the user is the owner
//         if (!channel.owner.equals(req.user._id)) {
//             return res.status(403).json({ message: 'You do not have permission to delete this channel' });
//         }

//         await channel.remove();
//         res.status(200).json({ message: 'Channel deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };







import Channel from '../models/Channel.js';
import User from '../models/User.js';
import Video from '../models/Video.js'; // Import Video model for video operations

// Create a new channel
export const createChannel = async (req, res) => {
    const { channelName, description, profileImage, channelBanner } = req.body;

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
        channel.channelName = channelName || channel.channelName;
        channel.description = description || channel.description;
        channel.profileImage = profileImage || channel.profileImage;
        channel.channelBanner = channelBanner || channel.channelBanner;

        await channel.save();
        res.status(200).json({ message: 'Channel updated successfully', channel });
    } catch (error) {
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
        res.status(500).json({ message: error.message });
    }
};
