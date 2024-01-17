import "../../assets/css/courseCard.css";
import placeholder from "../../assets/img/CookingCourse.png";
import { useMutation } from "@apollo/client";
import { DELETE_COURSE } from "../../GraphQL/mutations";

export default function MyCourseCards(props) {
  const [Del, { error }] = useMutation(DELETE_COURSE);

  async function deleteCourse ()  {

    const {data} = await Del({variables:{courseId:props.courseId}})
    location.reload()
  }
  return (
    <div className={`MyCourseCard ${props.className}` } id={props.courseId}>
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
        <button onClick={deleteCourse}>Delete</button>
      </div>
    </div>
  );
}
