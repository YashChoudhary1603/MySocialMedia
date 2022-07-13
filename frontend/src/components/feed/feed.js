import "./feed.css";
import Post from "../post/Post"
import Share from "../share/Share"
import {Posts} from "../../dummyData"
import { React ,useContext,useEffect ,useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({username}) => {
  const [posts,setPosts]= useState([]);
  const [text,setText] = useState('');
  const {user} =useContext(AuthContext)
  
  
  useEffect(() => {
    const fetchPosts = async () => {
      try{
      
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/"+ user._id);
      // const res = await axios.get("posts/timeline/625aa11232791f62e4f36eb3");

       console.log(res.data);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
      }catch{
        console.log("Cant solve feed")
      }
    };
    fetchPosts();
  }, [username , user._id]);
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(username === user.username) ? <Share />:" "  }
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};


export default Feed;