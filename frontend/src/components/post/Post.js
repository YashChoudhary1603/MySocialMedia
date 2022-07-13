import React, { useContext } from "react";
import "./Post.css";
import { MoreVert, SettingsInputCompositeSharp } from "@material-ui/icons";
// import { Users } from "../../dummyData";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import {Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const{user:currentUser} = useContext(AuthContext);


  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))

  },[currentUser._id])
  
  useEffect(() => {
    
    const fetchUser = async () => {
      try{
      const res = await axios.get(`/user?userId=${post.userId}`
      );
      
      setUser(res.data);}
      catch{
        console.log("post data is not availabe")
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts"+ post._id + "like" ,{ userId : currentUser._id})
    } catch (error) {
      
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="post">
      <div className="postT">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to = {`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img crossOrigin="anonymous" className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <img className="comentIcon" src={`${PF}coment.png`} />
            <span className="postCommentText">{post.comment} comments</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Post;
