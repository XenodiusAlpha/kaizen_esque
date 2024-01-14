import coursesInfo from "../../utils/courseTest";
import CourseCard from "./CourseCards";
import "../../assets/css/EnrolledCourses.css";

export default function EnrolledCourses(props) {
  return (
    <div className="EnrolledCourses">
      {coursesInfo.map((course, key) => (
        <CourseCard
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
