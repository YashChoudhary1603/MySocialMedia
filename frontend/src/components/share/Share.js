import { React, useContext, useRef, useState } from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandle = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(data);
      try {
        await axios.post("/upload", data);
        //http://localhost:8800/api

        console.log("upload nhi ho rhi image");
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload(); //for refreshing the post after uploading post
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="Top">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind  " + user.username + "?"}
            className="shInput"
            ref={desc}
          />
        </div>
        <hr className="shHr" />
        {file ? (
          <div className="shareImgContainer">
            <Cancel
              className="CancelImg"
              onClick={() => {
                setFile(null);
              }}
            />
              <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
          </div>
        ) : (
          " "
        )}

        <form className="Bottom" onSubmit={submitHandle}>
          <div className="soptions">
            <label htmlFor="file" className="shOption">
              <PermMedia htmlColor="tomato" className="shIcon" />
              <span className="shOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png ,.jpeg ,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shOption">
              <Label htmlColor="blue" className="shIcon" />
              <span className="shOptionText">Tag</span>
            </div>
            <div className="shOption">
              <Room htmlColor="green" className="shIcon" />
              <span className="shOptionText">Location</span>
            </div>
            <div className="shOption">
              <EmojiEmotions htmlColor="goldenrod" className="shIcon" />
              <span className="shOptionText">Feelings</span>
            </div>
          </div>
          <button className="shButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
