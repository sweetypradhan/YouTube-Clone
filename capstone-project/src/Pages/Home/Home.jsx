import React from "react";
import '../Home/Home.css';
import SideNavbar from "../../component/SideNavbar/SideNavbar"; 
import HomePage from "../../component/HomePage/HomePage";

function Home({ sideNavbar, searchQuery }) { 
  return (
    <div className="home">
      {sideNavbar && <SideNavbar sideNavbar={sideNavbar} />} 
      <HomePage sideNavbar={sideNavbar} searchQuery={searchQuery} /> 
    </div>
  );
}

export default Home;
