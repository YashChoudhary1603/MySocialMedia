import React from 'react'
import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;
  const[user,setUser] = useState({});
    
  useEffect(() => {
    const fetchUser = async () => {
      try{
      const res = await axios.get(
        `/user?username=${username}`
      );
      // http://localhost:8800/api
     
      setUser(res.data);
      }catch{
        console.log("no data");
      }
    };
    fetchUser();
    
    

  }, [username]);

  

  return (
    <>
      <Topbar />

      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + user.coverPicture : `${PF}person/noCover.png`}
                alt=""
              />
              <img  
                className="profileUserImg"
                src={user.profilePicture ? PF+user.profilePicture :`${PF}person/noAvatar.png`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>

          <div className="profileRightBottom1">
            <div className="profileRightBottom">
              <Feed username={username} />
            </div>
            <div className="profileRightBottom2">
              <Rightbar  user={user}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile