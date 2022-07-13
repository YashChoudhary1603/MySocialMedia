import "./message.css";
import { format } from "timeago.js";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Message({ message, own , friendId }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/user?userId=" + friendId);
       
        setUser(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={PF + user?.profilePicture} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
