import React from "react";
import '../Home/Home.css';
import SideNavbar from "../../component/SideNavbar/SideNavbar"; 
import HomePage from "../../component/HomePage/HomePage";

function Home({ sideNavbar }) {
  return (
    <>
      <div className="home">
        {sideNavbar && <SideNavbar sideNavbar={sideNavbar} />} 
        <HomePage sideNavbar={sideNavbar} />
      </div>
    </>
  );
}

export default Home;
