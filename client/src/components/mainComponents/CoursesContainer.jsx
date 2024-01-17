import { React, useEffect, useState } from "react";
import CourseCard from "../miniComponents/CourseCard";
import "../../assets/css/CourseContainer.css";
import { useQuery } from "@apollo/client";
import {
  QUERY_ALL_COURSE,
  QUERY_ENROLLED_COURSES,
} from "../../GraphQL/queries";

export default function CoursesContainer() {
  const [userId] = useState(JSON.parse(sessionStorage.getItem("user")).id);
  const { error, loading, data: data } = useQuery(QUERY_ALL_COURSE);
  const {
    err,
    load,
    data: enrollData,
  } = useQuery(QUERY_ENROLLED_COURSES, {
    variables: {
      id: userId,
    },
  });

  const [enrolledCourses, setEnrolledCourses] = useState();
  const [allCourses, setAllCourses] = useState();
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (data) {
      setAllCourses(data.courses);
    }
    if (enrollData) {
      setEnrolledCourses(enrollData.user.courses);
    }
    checkEnrollment();
  }, [data, enrollData, enrolledCourses]);

  const checkEnrollment = () => {
    console.log("all courses", allCourses);
    console.log("enrolled", enrolledCourses);
    
    if (allCourses && enrolledCourses){
    const containsAny = allCourses.filter(Enrolled =>
      !enrolledCourses.find(all => all._id === Enrolled._id)
    );
    console.log(containsAny);
    setCourses(containsAny)
  }
  };

  if (courses) {
    return (
      <div className="CourseContainer">
        {courses.map((course, key) => (
          <CourseCard
            key={key}
            title={course.name}
            desc={course.description}
            price={course.price}
            id={course._id}
          />
        ))}
      </div>
    );
  }
}
