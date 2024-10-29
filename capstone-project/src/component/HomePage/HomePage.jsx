import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../HomePage/HomePage.css';

const HomePage = ({ sideNavbar, searchQuery = "" }) => {
  // State to store videos fetched from the API
  const [videos, setVideos] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage error messages
  const [error, setError] = useState(null);

 // Options for the filter categories
 const options = [
  "All", "Javascript", "Music", "Skills", "Dance", "React", 
  "Coke studio", "vacation", "Travel", "Webdesign", "interior", 
  "Decore", "live", "Cricket", "Mixes", "Food", "Cakes", 
  "Turkies Drama", "Mongodb Atlas", "Skincare", "Makeup", "H&M"
];
// Fetch videos from the server when the component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Making a request to fetch videos from the API
        const response = await fetch('http://localhost:8000/api/videos');
        if (!response.ok) throw new Error('Failed to fetch videos');
        // Parse the response data to JSON
        const data = await response.json();
        // Update the videos state with the fetched data
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Filter videos based on search query
  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={sideNavbar ? 'homepage' : 'fullHomePage'}>
      <div className="homepage-option">
        {options.map((item, index) => (
          <div key={index} className="option">
            {item}
          </div>
        ))}
      </div>

      <div className={sideNavbar ? "homeMainPage" : "homeMainPageWithoutSidenavbar"}>
        {loading && <p>Loading videos...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {filteredVideos.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id} className="youtube_video">
            <div className="youtubeThumbnailBox">
              <img src={video.thumbnailUrl} alt="thumbnail" className="youtubeThumbnailPic" />
              <div className="youtubeThumbnailTiming">{video.duration || '00:00'}</div>
            </div>
            <div className="youtubeTitleBox">
              <div className="youtubeTitleboxProfile">
                {video.channelId?.profileImage ? (
                  <img src={video.channelId.profileImage} alt="profile" className="titleBoxprofile" />
                ) : (
                  <img src="/path/to/default/profile.png" alt="default profile" className="titleBoxprofile" />
                )}
              </div>
              <div className="youtubeTitleBox_Title">
                <div className="youtubeVideoTitle">{video.title}</div>
                <div className="youtubeChannelName">{video.channelId?.channelName || 'Unknown Channel'}</div>
                <div className="youtubeVideoViews">{video.likes} likes</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
