import React from "react";
import { useState } from "react";
import '../Navbar/Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { colors } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";

function Navbar({setSideNavbarFun,sideNavbar}){

    const [profilePic, setProfilePic] = useState("data:image/jpeg;base64,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")
    const [navbarDropdown, setNavbarDropdown] = useState(false);
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();

    const handleDropDown = () =>{
        setNavbarDropdown(prev=>!prev);
    }

    const sideNavbarFun=()=>{
        setSideNavbarFun(!sideNavbar)
    }

    const handleProfile =() =>{
        navigate('/user/451');
        setNavbarDropdown(false);
    }

    const setLoginModal=()=>{
        setLogin(false);
    }

    const onClickOption =(button)=>{
        setNavbarDropdown(false);
        if(button==="login"){
            setLogin(true);
        }else{

        }
    }

    return(
        <>
        <div className="navbar">

            <div className="navbar-left">
                <div className="menu-icon" onClick={sideNavbarFun}>
                    <MenuIcon />
                </div>

                <Link to={'/'} className="youtube">
                    <YouTubeIcon sx={{fontSize:"30px"}} className="youtube-icon" />
                    <div className="youtube-title">YouTube<sup>IN</sup></div>
                </Link>

            </div>

            <div className="navbar-center">
                <div className="search-box">
                    <input type="text" placeholder="Search" className="searchBox-input" />
                    <div className="search-icon"><SearchIcon sx={{fontSize: "25px"}} /></div>
                </div>

                <div className="navbar-mike">
                    <MicIcon />
                </div>
            </div>


            <div className="navbar-right">
                <Link to="/videoUpload" className="video-call-icon">
                    <VideoCallIcon sx={{ fontSize: "25px", cursor: "pointer" }} />
                </Link>
                
                {/* <VideoCallIcon sx={{ fontSize: "25px", cursor: "pointer" }} /> */}
                <NotificationsNoneIcon sx={{fontSize: "25px", cursor:"pointer"}} />
                <img onClick={handleDropDown} src={profilePic} className="navbarRight-logo" alt="logo" />

                { navbarDropdown &&
                    <div className="navbar-dropdown">
                    <div className="navbar-dropdown-option" onClick={handleProfile}>Profile</div>
                    <div className="navbar-dropdown-option" onClick={()=>onClickOption("logout")}>Logout</div>
                    <div className="navbar-dropdown-option" onClick={()=>onClickOption("login")}>Login</div>
                </div>}
            </div>

            {
                login && <Login setLoginModal={setLoginModal} />
            }

        </div>
        </>
    )
}

export default Navbar;








