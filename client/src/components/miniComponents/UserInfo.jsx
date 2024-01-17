import placeHolder from "../../assets/img/UserImg.png";
import "../../assets/css/profile.css";
import { useState, useEffect } from "react";

export default function UserInfo(props) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    let data = sessionStorage.getItem('user');

    // Check if data is not null and is a valid JSON string
    if (data) {
      try {
        let dataJson = JSON.parse(data);
        if (dataJson && dataJson.firstname && dataJson.lastname) {
          let fullName = `${dataJson.firstname} ${dataJson.lastname}`;
          setUsername(fullName);
        }
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    }
  }, []); // Removed username from dependency array

  return (
    <div className={props.className} id={props.id}>
      <figure>
        <img className="UserPic" src={placeHolder} alt="UserPicture" />
        <figcaption>{username}</figcaption>
      </figure>
      <h2>SignUp date:</h2>
      <h2>Number of enrolled Courses</h2>
    </div>
  );
}


