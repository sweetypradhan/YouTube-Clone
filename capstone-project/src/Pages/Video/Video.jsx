import React, { useEffect, useState } from 'react';
import '../Video/Video.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { Link, useParams } from 'react-router-dom';

const Video = () => {
    const { id } = useParams(); // Get video ID from the URL
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]); // State for video suggestions

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/videos/${id}`); // Fetch video details by ID
                if (!response.ok) {
                    throw new Error('Failed to fetch video');
                }
                const data = await response.json();
                setVideo(data);

                // Fetch video suggestions after fetching the main video
                const suggestionsResponse = await fetch(`http://localhost:8000/api/videos?suggested=true&channelId=${data.channelId._id}`);
                const suggestionsData = await suggestionsResponse.json();
                setSuggestions(suggestionsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [id]);

    if (loading) return <p>Loading video...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!video) return null; // No video data

    // Extract video ID from the YouTube URL
    const getVideoId = (url) => {
        const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    const youtubeVideoId = getVideoId(video.videoUrl); // Assuming video.videoUrl is a valid YouTube URL

    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {/* Embed YouTube video using iframe */}
                    <iframe
                        width="100%"
                        height="500px"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        title={video.title}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="video_aboutYoutube">
                    <div className="video_YTtitle">{video.title}</div>
                    <div className="YT_video_profileBlock">
                        <div className="YT_video_profileBlock_left">
                            <Link to={`/user/${video.channelId._id}`} className="YT_video_profileBlock_left_img">
                                <img className='YT_video_profileBlock_left_image' src={video.channelId.profileImage} alt='profile' />
                            </Link>

                            <div className="YTvideo_subsView">
                                <div className="YTpostProfileName">{video.channelId.channelName}</div>
                                <div className="YTpostProfileSubs">{new Date(video.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div className="subscribeBtnYT">Subscribe</div>
                        </div>
                        <div className="YTvideoLikeBlock">
                            <div className="YTvideoLikeBlock_like">
                                <ThumbUpOffAltIcon />
                                <div className="YTvideoLikeBlock_NoOfLikes">{video.likes}</div>
                            </div>
                            <div className="YTvideoDivider"></div>
                            <div className="YTvideoLikeBlock_like">
                                <ThumbDownOffAltIcon />
                            </div>
                            <div className="YTvideoDivider"></div>
                            <div className="YTvideoLikeBlock_like">
                                <ShareIcon /> Share
                            </div>
                            <div className="YTvideoDivider"></div>
                            <div className="YTvideoLikeBlock_like">
                                <DownloadIcon /> Download
                            </div>
                        </div>
                    </div>
                    <div className="YT_video_about">
                        <div>{new Date(video.createdAt).toLocaleDateString()}</div>
                        <div>{video.channelId.description}</div>
                    </div>
                    {/* Comment Section */}
                    <div className="YT_commentSection">
                <div className="YT_commentSectionTitle">2 comments</div>

                <div className="YT_selfComment">
                    <img className='YT_selfComment_profile' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCkZ5qZwRgDe1REogRmfaYbXB8gM0Txgr5EBWkaGVR2FsY_1VO3Y6uCA&s' alt='img' />
                    <div className="addComment">
                        <input type="text"  className='addCommentInput' placeholder='Add a comment' />

                        <div className="cancelSubmitComment">
                            <div className="cancelComment">Cancel</div>
                            <div className="cancelComment">Comment</div>
                        </div>
                    </div>
                </div>

                <div className="YT_OtherComment">
                    <div className="YT_selfComment">
                    <img className='YT_selfComment_profile' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCkZ5qZwRgDe1REogRmfaYbXB8gM0Txgr5EBWkaGVR2FsY_1VO3Y6uCA&s' alt='img' />

                    <div className="others_commentSection">
                        <div className="others_commentSectionHeader">
                            <div className="channelName_comment">UserName</div>
                            <div className="commentTimingOthers">2024-08-25</div>
                        </div>

                        <div className="others_commentSectionComment">
                            This is a great project
                        </div>
                    </div>
                    </div>


                    <div className="YT_selfComment">
                    <img className='YT_selfComment_profile' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCkZ5qZwRgDe1REogRmfaYbXB8gM0Txgr5EBWkaGVR2FsY_1VO3Y6uCA&s' alt='img' />

                    <div className="others_commentSection">
                        <div className="others_commentSectionHeader">
                            <div className="channelName_comment">UserName</div>
                            <div className="commentTimingOthers">2024-08-25</div>
                        </div>

                        <div className="others_commentSectionComment">
                            This is a great project
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        
                </div>
            </div>

            {/* Render video suggestions */}
            <div className="videoSuggestions">
                {suggestions.map((suggestedVideo) => (
                    <div key={suggestedVideo._id} className="videoSuggestionBlock">
                        <div className="video_suggestion_thumbnail">
                            <img src={suggestedVideo.thumbnailUrl} alt='img' className='video_suggestion_thumbnail_img' />
                        </div>
                        <div className="video_suggestions_about">
                            <div className="video_suggestions_about_title">{suggestedVideo.title}</div>
                            <div className="video_suggestions_about_profile">{suggestedVideo.channelId.channelName}</div>
                            <div className="video_suggestions_about_profile">{suggestedVideo.views} views . {new Date(suggestedVideo.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Video;
