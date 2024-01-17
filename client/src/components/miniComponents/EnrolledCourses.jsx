import coursesInfo from "../../GraphQL/courseTest";
import CourseCards from "./EnrolledCourseCards";
import "../../assets/css/EnrolledCourses.css";
import { useEffect, useState, useParams } from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_ENROLLED_COURSES,
  QUERY_ALL_COURSE,
} from "../../GraphQL/queries";
import { useWatchQueryOptions } from "@apollo/client/react/hooks/useSuspenseQuery";

export default function EnrolledCourses(props) {
  const [userId] = useState(JSON.parse(sessionStorage.getItem("user")).id);

  // const [courses, setCourses] = useState();

  const { error, loading, data } = useQuery(QUERY_ENROLLED_COURSES, {
    skip: !userId,
    variables: {
      id: userId,
    },
  });

  function EnrolledInfo() {
    if (data) {
      let courses = data.user.courses;
      console.log(data);
      return (
        <>
          {courses.map((course, key) => (
            <CourseCards
              key={key}
              title={course.name}
              desc={course.description}
              price={course.price}
            />
          ))}
        </>
      );
    }
  }

  return (
    <div className="EnrolledCourses" id={props.id}>
      <EnrolledInfo />
    </div>
  );
}
