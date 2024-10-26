import React, { useState } from 'react';
import '../Channel/ChannelPage.css';
import axios from 'axios';

const ChannelPage = () => {
    const [bannerImgUrl, setBannerImgUrl] = useState("https://i.ytimg.com/vi/T0CyWqPYQvw/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCk9Jg7ULtPdVxvsd1_AGkjURUwLw");
    const [profileImgUrl, setProfileImgUrl] = useState("https://i.ytimg.com/vi/T0CyWqPYQvw/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCk9Jg7ULtPdVxvsd1_AGkjURUwLw");
    const [channelInfo, setChannelInfo] = useState({ channelName: '', description: '' });

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
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Channel Info:", channelInfo);
        console.log("Banner Image URL:", bannerImgUrl);
        console.log("Profile Image URL:", profileImgUrl);
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
                <form className="channel-form" onSubmit={handleSubmit}>
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
                    <button type="submit" className="submit-button">Update Channel</button>
                </form>
            </div>
        </div>
    );
};

export default ChannelPage;


