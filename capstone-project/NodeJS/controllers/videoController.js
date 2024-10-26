import Video from '../models/Video.js';
import Channel from '../models/Channel.js';


// Get all videos or filtered by title
export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate({
                path: 'channelId',
                select: 'channelName channelProfile channelBanner description profileImage', 
            });
        res.status(200).json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ message: "Error fetching videos" });
    }
};

// Get a specific video by its ID
export const getVideo = async (req, res) => {
    const { id } = req.params; // Get the video ID from the request parameters

    try {
        const video = await Video.findById(id)
        .populate({
            path: 'channelId',
            select: 'channelName channelProfile channelBanner description profileImage', 
        });
        
        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }

        res.status(200).json(video);
    } catch (error) {
        console.error("Error fetching video:", error);
        res.status(500).json({ message: "Error fetching video" });
    }
};




// Add new video
export const addVideo = async (req, res) => {
    const { title, description, thumbnailUrl, videoUrl, channelId, likes = 0, dislikes = 0, views = 0, comments = [] } = req.body;
    console.log("Request Body:", req.body);

    try {
        const newVideo = await Video.create({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            channelId,
            likes,
            dislikes,
            views,
            comments
        });
        res.status(201).json(newVideo);
    } catch (error) {
        console.error("Error adding video:", error); // Log the error for debugging
        res.status(500).json({ message: "Error adding video", error: error.message });
    }
};

// Delete a video
export const deleteVideo = async (req, res) => {
    const { id } = req.params; // Get the video ID from the request parameters

    try {
        const video = await Video.findByIdAndDelete(id); // Delete the video

        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }

        res.status(200).json({ message: "Video deleted successfully." });
    } catch (error) {
        console.error("Error deleting video:", error);
        res.status(500).json({ message: "Error deleting video" });
    }
};
