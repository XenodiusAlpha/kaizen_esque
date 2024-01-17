import "../../assets/css/courseCard.css";
import placeholder from "../../assets/img/CookingCourse.png";

export default function CourseCard(props) {
  return (
    <div className={`CourseCard ${props.className}`} id={props.id}>
      <h1>{props.title}</h1>
      <img src={placeholder}></img>
      {/* This is just a placeholder picture until we can get the database setup */}
      <p>{props.desc}</p>
      <p>{props.price}</p>
      <div>
        <a href={`/Course/${props.id}`}>learn More!</a>{" "}
      </div>
    </div>
  );
}
