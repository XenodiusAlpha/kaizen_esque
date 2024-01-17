import { React, useEffect, useState } from "react";
import EnrolledCourseCards from "../miniComponents/EnrolledCourseCards";
import "../../assets/css/CourseContainer.css";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_COURSE } from "../../GraphQL/queries";

export default function CoursesContainer() {
  const { error, loading, data } = useQuery(QUERY_ALL_COURSE);

  const [courses, setCourses] = useState();

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);

  if (courses) {
    return (
      <div className="CourseContainer">
        {courses.map((course, key) => (
          <EnrolledCourseCards
            key={key}
            title={course.name}
            desc={course.description}
            price={course.price}
          />
        ))}
      </div>
    );
  }
}
