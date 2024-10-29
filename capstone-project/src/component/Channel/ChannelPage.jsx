import React, { useState, useEffect } from 'react';
import '../Channel/ChannelPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ChannelPage = () => {
  const [bannerImgUrl, setBannerImgUrl] = useState("https://i.ytimg.com/vi/T0CyWqPYQvw/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCk9Jg7ULtPdVxvsd1_AGkjURUwLw");
  const [profileImgUrl, setProfileImgUrl] = useState("https://i.ytimg.com/vi/T0CyWqPYQvw/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCk9Jg7ULtPdVxvsd1_AGkjURUwLw");
  const [channelInfo, setChannelInfo] = useState({ channelName: '', description: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { channelId } = useParams();

  // Fetch channel data on component mount if editing an existing channel
  useEffect(() => {
    if (channelId) {
      const fetchChannelData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/channels/${channelId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch channel data.");
          }
          const data = await response.json();
          console.log("Fetched channel data:", data);
          setChannelInfo(data);
        } catch (error) {
          console.error("Error fetching channel data:", error);
          setErrorMessage("An error occurred while fetching channel data.");
        }
      };

      fetchChannelData();
    }
  }, [channelId]);

  const handleInputField = (event, name) => {
    setChannelInfo({
      ...channelInfo,
      [name]: event.target.value
    });
  };

  const uploadImg = async (e, isBanner) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dndxcgcpt/image/upload", data);
      const imageUrl = response.data.url;
      if (isBanner) {
        setBannerImgUrl(imageUrl);
      } else {
        setProfileImgUrl(imageUrl);
      }
    } catch (err) {
      console.log("Image upload error:", err);
    }
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page on submit

    const token = localStorage.getItem('jwt'); // Retrieve the JWT token from localStorage

    try {
      const response = await fetch(`http://localhost:8000/api/channels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}` // Include the token here
        },
        body: JSON.stringify({ 
          ...channelInfo, 
          channelBanner: bannerImgUrl, 
          profileImage: profileImgUrl 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Channel created successfully:", data);
        navigate(`/home`); // Navigate to the homepage after creating the channel
      } else {
        setErrorMessage(data.message || "Failed to create channel.");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      setErrorMessage("An error occurred while creating the channel.");
    }
  };

  return (
    <div className="channel-page">
      <div className="channel-card">
        <div className="banner">
          <img src={bannerImgUrl} alt="Channel Banner" className="banner-img" />
          <div className="profile">
            <img src={profileImgUrl} alt="Profile Picture" className="profile-img" />
          </div>
        </div>
        {errorMessage && <p className="error_message">{errorMessage}</p>}
        <form className="channel-form" onSubmit={handleCreateChannel}>
          <input
            type="text"
            placeholder="Channel Name"
            value={channelInfo.channelName}
            onChange={(e) => handleInputField(e, "channelName")}
            className="input-field"
            required
          />
          <textarea
            placeholder="Channel Description"
            value={channelInfo.description}
            onChange={(e) => handleInputField(e, "description")}
            className="input-field"
            required
          />
          <div className="image-upload">
            <label>
              Upload Banner Image
              <input type="file" onChange={(e) => uploadImg(e, true)} />
            </label>
            <label>
              Upload Profile Image
              <input type="file" onChange={(e) => uploadImg(e, false)} />
            </label>
          </div>
          <button type="submit" className="submit-button">Create Channel</button>
        </form>
      </div>
    </div>
  );
};

export default ChannelPage;
