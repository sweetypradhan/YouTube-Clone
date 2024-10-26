import React, { useEffect, useState } from 'react';
import '../Profile/Profile.css';
import { useParams, Link } from 'react-router-dom';
import SideNavbar from '../../component/SideNavbar/SideNavbar';
import SearchIcon from '@mui/icons-material/Search';

const Profile = ({ sideNavbar }) => {
    const { channelId } = useParams();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/channels/${channelId}`);
                if (!response.ok) throw new Error('Channel not found');
                const data = await response.json();
                setChannel(data);
                console.log("Fetched channel data:", data);
            } catch (err) {
                console.error("Error fetching channel:", err.message);
                setError(err.message);
            }
        };

        const fetchVideos = async () => {
            try {
                const videoResponse = await fetch(`http://localhost:8000/api/videos?channelId=${channelId}`);
                if (!videoResponse.ok) throw new Error('Error fetching videos');
                const videoData = await videoResponse.json();
                console.log("Fetched video data:", videoData);
                setVideos(videoData);
            } catch (err) {
                console.error("Error fetching videos:", err.message);
                setError(err.message);
            }
        };

        if (channelId) {
            fetchChannel().then(fetchVideos);
        } else {
            setError("Channel ID is undefined");
            setLoading(false);
        }

        setLoading(false);
    }, [channelId]);

    if (loading) {
        return <p>Loading channel...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!channel) {
        return <p>Channel not found</p>;
    }

    console.log("Channel data:", channel);

    return (
        <div className="profile">
            {sideNavbar && <SideNavbar sideNavbar={sideNavbar} />}
            <div className={sideNavbar ? "profile_page" : "profile_page_NavbarClose"}>
                {/* Banner Section */}
                <div className="profile_banner">
                    <img className="profile_banner_img" src={channel.channelBanner} alt="banner" />
                </div>

                {/* Profile top section */}
                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img className="profile_top_section_img" src={channel.profileImage} alt="channel" />
                    </div>

                    <div className="profile_top_section_about">
                        <div className="profile_top_section_aboutName">{channel.channelName}</div>
                        <div className="profile_top_section_info">
                            @{channel.channelName} · {videos.length} videos
                        </div>
                        <div className="profile_top_section_info">{channel.description}</div>
                        <div className="profile_top_section_subscribe">Subscribe</div>
                    </div>
                </div>

                {/* Profile bottom section */}
                <div className="profile_video">
                    <div className="profile_video_title">Home</div>
                    <div className="profile_video_title">Videos</div>
                    <div className="profile_video_title">Shorts</div>
                    <div className="profile_video_title">Live</div>
                    <div className="profile_video_title">Playlists</div>
                    <div className="profile_video_title">Posts</div>
                    <div className="profile_video_title"><SearchIcon /></div>
                </div>

                {/* Profile Videos Section */}
                <div className="profileVideos">
                    {loading ? (
                        <p>Loading videos...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : videos.length === 0 ? (
                        <p>No videos available</p>
                    ) : (
                        videos.map(video => (
                            <Link to={`/watch/${video._id}`} key={video._id} className="profileVideo_block">
                                <div className="profileVideo_block_thumbnail">
                                    <img className="profileVideo_block_thumbnail_img" src={video.thumbnailUrl} alt={video.title} />
                                </div>
                                <div className="profileVideo_block_detail">
                                    <div className="profileVideo_block_detail_name">{video.title}</div>
                                    <div className="profileVideo_block_detail_about">Created on {new Date(video.createdAt).toLocaleDateString()}</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;





// import React, { useEffect, useState } from 'react';
// import '../Profile/Profile.css';
// import { useParams, Link } from 'react-router-dom';
// import SideNavbar from '../../component/SideNavbar/SideNavbar';
// import SearchIcon from '@mui/icons-material/Search';

// const Profile = ({ sideNavbar }) => {
//     const { channelId } = useParams();
//     const [channel, setChannel] = useState(null);
//     const [videos, setVideos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchChannel = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8000/api/channels/${channelId}`);
//                 if (!response.ok) throw new Error('Channel not found');
//                 const data = await response.json();
//                 setChannel(data);
//                 console.log("Fetched channel data:", data);
//             } catch (err) {
//                 console.error("Error fetching channel:", err.message);
//                 setError(err.message);
//             }
//         };

//         const fetchVideos = async () => {
//             try {
//                 // Ensure this endpoint returns videos filtered by channelId
//                 const videoResponse = await fetch(`http://localhost:8000/api/videos?channelId=${channelId}`);
//                 if (!videoResponse.ok) throw new Error('Error fetching videos');
//                 const videoData = await videoResponse.json();
//                 console.log("Fetched video data:", videoData);
//                 setVideos(videoData);
//             } catch (err) {
//                 console.error("Error fetching videos:", err.message);
//                 setError(err.message);
//             }
//         };

//         if (channelId) {
//             fetchChannel()
//                 .then(fetchVideos)
//                 .catch(err => setError(err.message))
//                 .finally(() => setLoading(false));
//         } else {
//             setError("Channel ID is undefined");
//             setLoading(false);
//         }
//     }, [channelId]);

//     if (loading) {
//         return <p>Loading channel...</p>;
//     }

//     if (error) {
//         return <p className="error-message">{error}</p>;
//     }

//     if (!channel) {
//         return <p>Channel not found</p>;
//     }

//     return (
//         <div className="profile">
//             {sideNavbar && <SideNavbar sideNavbar={sideNavbar} />}
//             <div className={sideNavbar ? "profile_page" : "profile_page_NavbarClose"}>
//                 {/* Banner Section */}
//                 <div className="profile_banner">
//                     <img className="profile_banner_img" src={channel.channelBanner} alt="banner" />
//                 </div>

//                 {/* Profile top section */}
//                 <div className="profile_top_section">
//                     <div className="profile_top_section_profile">
//                         <img className="profile_top_section_img" src={channel.profileImage} alt="channel" />
//                     </div>

//                     <div className="profile_top_section_about">
//                         <div className="profile_top_section_aboutName">{channel.channelName}</div>
//                         <div className="profile_top_section_info">
//                             @{channel.channelName} · {videos.length} videos
//                         </div>
//                         <div className="profile_top_section_info">{channel.description}</div>
//                         <div className="profile_top_section_subscribe">Subscribe</div>
//                     </div>
//                 </div>

//                 {/* Profile bottom section */}
//                 <div className="profile_video">
//                     <div className="profile_video_title">Home</div>
//                     <div className="profile_video_title">Videos</div>
//                     <div className="profile_video_title">Shorts</div>
//                     <div className="profile_video_title">Live</div>
//                     <div className="profile_video_title">Playlists</div>
//                     <div className="profile_video_title">Posts</div>
//                     <div className="profile_video_title"><SearchIcon /></div>
//                 </div>

//                 {/* Profile Videos Section */}
//                 <div className="profileVideos">
//                     {loading ? (
//                         <p>Loading videos...</p>
//                     ) : error ? (
//                         <p className="error-message">{error}</p>
//                     ) : videos.length === 0 ? (
//                         <p>No videos available</p>
//                     ) : (
//                         videos.map(video => (
//                             <Link to={`/watch/${video._id}`} key={video._id} className="profileVideo_block">
//                                 <div className="profileVideo_block_thumbnail">
//                                     <img className="profileVideo_block_thumbnail_img" src={video.thumbnailUrl} alt={video.title} />
//                                 </div>
//                                 <div className="profileVideo_block_detail">
//                                     <div className="profileVideo_block_detail_name">{video.title}</div>
//                                     <div className="profileVideo_block_detail_about">Created on {new Date(video.createdAt).toLocaleDateString()}</div>
//                                 </div>
//                             </Link>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
