import placeHolder from "../../assets/img/UserImg.png";
import "../../assets/css/profile.css";
import { useState, useEffect } from "react";
import {useQuery} from '@apollo/client'

export default function UserInfo(props) {
  const [username, setUsername] = useState();

  useEffect(() => {
    let data = sessionStorage.getItem('user');
    let dataJson = JSON.parse(data)
    let firstName = dataJson.firstname
    let lastName = dataJson.lastname
    let fullName = `${firstName} ${lastName}`
    setUsername(
      fullName
    )
  },[
    username
  ]);

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
