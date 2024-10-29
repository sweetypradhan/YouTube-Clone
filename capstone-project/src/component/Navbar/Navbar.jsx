import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Login from "../Login/Login";

function Navbar({ setSideNavbarFun, sideNavbar, setSearchQuery }) {
  const [profilePic, setProfilePic] = useState("");
  const [navbarDropdown, setNavbarDropdown] = useState(false);
  const [login, setLogin] = useState(false);
  const [query, setQuery] = useState("");

  // Toggle dropdown menu visibility
  const token = localStorage.getItem('jwt'); // Retrieve the JWT token from localStorage

  const handleDropDown = () => {
    setNavbarDropdown(prev => !prev);
  };

  // Function to toggle the side navbar visibility
  const sideNavbarFun = () => {
    setSideNavbarFun(!sideNavbar);
  };

  // Function to close the login modal
  const setLoginModal = () => {
    setLogin(false);
  };

  const onClickOption = (button) => {
    setNavbarDropdown(false);
    if (button === "login") {
      setLogin(true);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value); 
  };

  // Load the user's profile picture from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.profilePic) {
      setProfilePic(user.profilePic);
    }
  }, [token]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="menu-icon" onClick={sideNavbarFun}>
          <MenuIcon />
        </div>
        <Link to='/home' className="youtube">
          <YouTubeIcon sx={{ fontSize: "30px" }} className="youtube-icon" />
          <div className="youtube-title" style={{ textDecoration: "none", color: "black" }}>YouTube<sup>IN</sup></div>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            className="searchBox-input"
            value={query}
            onChange={handleSearch}
          />
          <div className="search-icon">
            <SearchIcon sx={{ fontSize: "25px" }} />
          </div>
        </div>
        <div className="navbar-mike">
          <MicIcon />
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/videoUpload" className="video-call-icon">
          <VideoCallIcon sx={{ fontSize: "25px", cursor: "pointer" }} />
        </Link>
        <NotificationsNoneIcon sx={{ fontSize: "25px", cursor: "pointer" }} />
        <img onClick={handleDropDown} src={profilePic} className="navbarRight-logo" alt="User Profile" />

        {navbarDropdown && (
          <div className="navbar-dropdown">
            <Link to='/ChannelPage' className="navbar-dropdown-option" style={{ textDecoration: 'none', color: 'inherit' }}>
              Channel
            </Link>
            <div className="navbar-dropdown-option" onClick={() => onClickOption("login")}>
              Login
            </div>
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
}

export default Navbar;
