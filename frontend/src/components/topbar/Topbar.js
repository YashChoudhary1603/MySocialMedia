import {React,useContext} from 'react'
import './Topbar.css'
import { Search, Person, Chat, Notifications, NoEncryptionSharp } from "@material-ui/icons";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router";



export const Topbar = () => {
  const { user } = useContext(AuthContext);
  const url = user.username;
  const username = useParams().username;
  const PF =process.env.REACT_APP_PUBLIC_FOLDER
  
  const handdleClick=()=>{
    localStorage.clear();
    console.log("click to hua hai");
    window.location.reload();

  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">LetBeSocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search For friends , post and video"
            className="searchInput"
          />
          <Search className="searchIcon" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="topLink">Homepage</span>
          </Link>
          <Link
            to={`profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <span className="topLink">Timeline</span>
          </Link>
          <button onClick={handdleClick} className="logOutButton">
            <span className="topLink">LogOut</span>
          </button>
        </div>
        <div className="topbarIcon">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to ="/messenger">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">3</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">6</span>
          </div>
        </div>
        <Link to={url === username ? " " : `profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImage"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
