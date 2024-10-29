import React from 'react';
import '../SideNavbar/SideNavbar.css';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DownloadIcon from '@mui/icons-material/Download';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MovieIcon from '@mui/icons-material/Movie';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import SupportIcon from '@mui/icons-material/Support';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link } from "react-router-dom";


const SideNavbar = ({sideNavbar}) => {
  return (
    <>
      <div className={sideNavbar?"homeSideNavbar":"homeSideNavbarHide"}>
          <div className="homeSideNavbarTop">
            <div className={`homeSideNavbarTopOption`} >
                <HomeIcon />
                {/* <div className="homeSideNavbarTopOptionTitle">Home</div> */}
                <Link to={'/home'} className="homeSideNavbarTopOptionTitle" style={{textDecoration:"none", color:"black"}}>Home</Link>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <VideoLibraryIcon />
                <div className="homeSideNavbarTopOptionTitle">Shorts</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <SubscriptionsIcon />
                <div className="homeSideNavbarTopOptionTitle">Subscriptions</div>
            </div>

          </div>

          <div className="homeSideNavbarMiddle">
          
            <div className={`homeSideNavbarTopOption`} >
              <div className="homeSideNavbarTopOptionTitle">You</div>
                <KeyboardArrowRightIcon />
                
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <SwitchAccountIcon />
                <div className="homeSideNavbarTopOptionTitle">Your Channel</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <HistoryIcon />
                <div className="homeSideNavbarTopOptionTitle">History</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <PlaylistPlayIcon />
                <div className="homeSideNavbarTopOptionTitle">Playlists</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <SlideshowIcon />
                <div className="homeSideNavbarTopOptionTitle">Your Videos</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <AccessTimeIcon />
                <div className="homeSideNavbarTopOptionTitle">Watch later</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <ThumbUpOffAltIcon />
                <div className="homeSideNavbarTopOptionTitle">Liked videos</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <DownloadIcon />
                <div className="homeSideNavbarTopOptionTitle">Downloads</div>
            </div>

          </div>

          <div className="homeSideNavbarMiddle">
          
            <div className={`homeSideNavbarTopOption`} >
              <div className="homeSideNavbarHeader">Subscription</div>  
            </div>

            <div className="homeSideNavbarTopOption">
              <img className='homeSideNavbarImg' src='data:image/jpeg;base64,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' />
              <div className="homeSideNavbarTopOptionTitle">Internshala</div>
            </div>

            <div className="homeSideNavbarTopOption">
              <img className='homeSideNavbarImg' src='data:image/png;base64,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'/>
              <div className="homeSideNavbarTopOptionTitle">Times Of India</div>
            </div>

            <div className="homeSideNavbarTopOption">
              <img className='homeSideNavbarImg' src='data:image/jpeg;base64,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' />
              <div className="homeSideNavbarTopOptionTitle">Bake with Shivesh</div>
            </div>
            

            </div>


            <div className="homeSideNavbarMiddle">
          
            <div className={`homeSideNavbarTopOption`} >
              <div className="homeSideNavbarTopOptionTitle">Explore</div>
                
                
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <LocalFireDepartmentIcon />
                <div className="homeSideNavbarTopOptionTitle">Trending</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <ShoppingBagIcon />
                <div className="homeSideNavbarTopOptionTitle">Shopping</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <MusicNoteIcon />
                <div className="homeSideNavbarTopOptionTitle">Music</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <MovieIcon />
                <div className="homeSideNavbarTopOptionTitle">Movies</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <SurroundSoundIcon />
                <div className="homeSideNavbarTopOptionTitle">Live</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <SportsEsportsIcon />
                <div className="homeSideNavbarTopOptionTitle">Gaming</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <NewspaperIcon />
                <div className="homeSideNavbarTopOptionTitle">News</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <EmojiEventsIcon />
                <div className="homeSideNavbarTopOptionTitle">Sports</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <CheckroomIcon />
                <div className="homeSideNavbarTopOptionTitle">Fashion and Beauty</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <PodcastsIcon />
                <div className="homeSideNavbarTopOptionTitle">Podcasts</div>
            </div>

          </div>

          <div className={`homeSideNavbarTopOption`} >
                <SupportIcon />
                <div className="homeSideNavbarTopOptionTitle">Setting</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <FlagIcon />
                <div className="homeSideNavbarTopOptionTitle">Report history</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <HelpOutlineIcon />
                <div className="homeSideNavbarTopOptionTitle">Help</div>
            </div>

            <div className={`homeSideNavbarTopOption`} >
                <FeedbackIcon />
                <div className="homeSideNavbarTopOptionTitle">Send Feedback</div>
            </div>

      </div>
    </>
  )
}

export default SideNavbar
