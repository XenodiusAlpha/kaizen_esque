import "../../assets/css/courseCard.css";
import placeholder from "../../assets/img/CookingCourse.png";
import { useEffect, useState } from "react";

export default function CourseCard(props) {
    const [isLoggedIn, SetLoggedIn] = useState(JSON.parse(sessionStorage.getItem("isLoggedIn")))
    const [route, setRoute] = useState()

    useEffect(() => {
        if (isLoggedIn === true){
            console.log(isLoggedIn)
            setRoute(`/Course/${props.id}`)
        } else if (isLoggedIn === null) {
            setRoute(`/Login`)
        }
    })

  return (
    <div className={`CourseCard ${props.className}`} id={props.id}>
      <h1>{props.title}</h1>
      <img src={placeholder}></img>
      {/* This is just a placeholder picture until we can get the database setup */}
      <p>{props.desc}</p>
      <p>{props.price}</p>
      <div>
        <a href={route}>learn More!</a>{" "}
      </div>
    </div>
  );
}
