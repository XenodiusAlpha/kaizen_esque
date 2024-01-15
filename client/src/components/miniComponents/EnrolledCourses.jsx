import coursesInfo from "../../GraphQL/courseTest";
import CourseCards from "./CourseCards";
import "../../assets/css/EnrolledCourses.css";

export default function EnrolledCourses(props) {
  return (
    <div className="EnrolledCourses" id={props.id}>
      {coursesInfo.map((course, key) => (
        <CourseCards
          key={key}
          title={course.name}
          desc={course.description}
          price={course.price}
          className={props.className}
        />
      ))}
    </div>
  );
}
