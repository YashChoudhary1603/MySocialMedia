import { React, useContext } from "react";
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/sidebar";
// import Feed from "../../components/feed/feed";
import FeedHome from "../../components/feed/feedHome";

import HomeRightbar from "../../components/rightbar/rightBarHome";
import "./home.css"
import { AuthContext } from "../../context/AuthContext";

// username ={user.username}

export const Home = () => {
  const {user} =useContext(AuthContext)
  return (
    <>
      <Topbar />
      <div className="Container">
        <Sidebar />
        <FeedHome />
        <HomeRightbar />
      </div>
    </>
  );
}
