import "../../assets/css/courseCard.css";
import placeholder from "../../assets/img/CookingCourse.png";

export default function MyCourseCards(props) {
  return (
    <div className={`MyCourseCard ${props.className}`}>
      <h1>{props.title}</h1>
      <img src={placeholder}></img>
      {/* This is just a placeholder picture until we can get the database setup */}
      <p>{props.desc}</p>
      <p>{props.price}</p>
      <div>
        <a>learn More!</a>{" "}
        <button className="grabCourseId" id={props.courseId}>
          Edit Course
        </button>
        <button>Delete</button>
      </div>
    </div>
  );
}
