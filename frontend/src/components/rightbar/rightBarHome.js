import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/online";

const HomeRbar =()=>{

const HomeRightbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src={PF + "gift.png"} alt="" />
        <span className="birthdayText">
          <b>Max Havell </b> and <b> 3 others friends</b> have Birthday Today
        </span>
      </div>
      <img className="rightbarAd" src={PF + "side.png"} alt="" />
      <h4 className="rightbarTitle">
        <b>Online Friends</b>
      </h4>
      <ul className="rightbarFriendList">
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
    </>
  );
};

 return (
   <div className="rightbar">
     <div className="rightbarWrapper">
       <HomeRightbar />
     </div>
   </div>
 );
}

export default HomeRbar;
