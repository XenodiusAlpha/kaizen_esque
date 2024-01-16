import coursesInfo from "../../GraphQL/courseTest";
import CourseCards from "./CourseCards";
import "../../assets/css/EnrolledCourses.css";
import { useEffect, useState, useParams } from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_ENROLLED_COURSES,
  QUERY_ALL_COURSE,
} from "../../GraphQL/queries";

export default function EnrolledCourses(props) {
  const [userId] = useState(JSON.parse(sessionStorage.getItem("user")).id);

  const [courses, setCourses] = useState();

  const { error, loading, data } = useQuery(QUERY_ENROLLED_COURSES, {
    skip: !userId,
    variables: {
      id: userId,
    },
  });

  useEffect(() => {
    if (data) {
      setCourses(data.user.coursesInfo);
      console.log(data.user.courses);
    }
  }, [data, loading]);

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
