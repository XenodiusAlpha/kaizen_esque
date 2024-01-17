import React, { useEffect, useState } from 'react';
import placeHolder from "../../assets/img/UserImg.png";
import "../../assets/css/profile.css";

export default function UserInfo(props) {
  const [username, setUsername] = useState('');
  const [signUpDate, setSignUpDate] = useState('');

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const userData = sessionStorage.getItem('user');
    
    if (userData) {
      const user = JSON.parse(userData);

      // Set user information
      setUsername(`${user.firstname} ${user.lastname}`);
      setSignUpDate(user.signupDate);
    }
  }, []);

  return (
    <div className={props.className} id={props.id}>
      <figure>
        <img className="UserPic" src={placeHolder} alt="UserPicture" />
        <figcaption>{username}</figcaption>
      </figure>
      <h2>SignUp date: {signUpDate}</h2>
    </div>
  );
}
