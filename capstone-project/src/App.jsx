import { useState } from 'react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Video from './Pages/Video/Video';
import Profile from './Pages/Profile/Profile';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import SignUp from './Pages/SignUp/SignUp';
import ChannelPage from './component/Channel/ChannelPage';
import Login from './component/Login/Login';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const setSideNavbarFun = (value) => {
    setSideNavbar(value);
  };

  return (
    <div className='App'>
      <Navbar setSideNavbarFun={setSideNavbarFun} sideNavbar={sideNavbar} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path='/home' element={<Home sideNavbar={sideNavbar} searchQuery={searchQuery} />} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:channelId' element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/VideoUpload' element={<VideoUpload />} />
        <Route path='/ChannelPage' element={<ChannelPage />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
