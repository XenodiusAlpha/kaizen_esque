import { React, useEffect, useState } from "react";
import coursesInfo from "../../GraphQL/courseTest";
import CourseCards from "../miniComponents/CourseCards";
import "../../assets/css/CourseContainer.css";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_COURSE } from "../../GraphQL/queries";

export default function CoursesContainer() {
  const { error, loading, data } = useQuery(QUERY_ALL_COURSE);
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
      console.log(data.courses[1].name);
    }
  }, [data, courses]);

  return (
    <div className="CourseContainer">
      {courses.map((course, key) => (
        <CourseCards
          key={key}
          title={course.name}
          desc={course.description}
          price={course.price}
        />
      ))}
    </div>
  );
}
