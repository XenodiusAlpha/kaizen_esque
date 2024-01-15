import CourseCards from "./CourseCards";
import coursesInfo from "../../utils/courseTest";
import "../../assets/css/MyCourses.css";

export default function MyCreatedCourses(props) {
  return (
    <div className="MyCourses" id={props.id}>
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
