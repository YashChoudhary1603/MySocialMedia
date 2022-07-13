import "./rightbar.css";
import { React, useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Add, FlashOnRounded, Remove } from "@material-ui/icons";

import axios from "axios";
import { Link } from "react-router-dom";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
   const [followed, setFollowed] = useState();
  // const [followed, setFollowed] = useState(
  //   currentUser.followings.includes(user._id)? true :false
  // );

  console.log("followed ki value " + followed ,user._id);
   console.log(currentUser.followings.includes(user._id))

  useEffect(()=>{
       setFollowed(currentUser.followings.includes(user._id) ? true : false);
  },[user._id]) 
  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:8800/api/user/friends/" + user._id
        );
        setFriends(friendList.data);
      } catch (error) {}
    };

    getFriends();
  }, [user._id]);

  

  const clickhandle = async () => {
    try {
      if (followed) {
        await axios.put(`/user/${user._id}/unfollow`, {
          //http://localhost:8800/api
          userId: currentUser._id,
        });
        // dispatch({ type: "Follow" , payload :user._id});
      } else {
        await axios.put(`/user/${user._id}/follow`, {
          //http://localhost:8800/api
          userId: currentUser._id,
        });
        // dispatch({ type: "Unfollow", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowBotton" onClick={clickhandle}>
            {followed ? "UnFollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "Married"
                : " "}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user._id ? <ProfileRightbar /> : " "}
      </div>
    </div>
  );
};

export default Rightbar;
