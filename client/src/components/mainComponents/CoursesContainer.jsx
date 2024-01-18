import { React, useEffect, useState } from "react";
import CourseCard from "../miniComponents/CourseCard";
import "../../assets/css/CourseContainer.css";
import { useQuery } from "@apollo/client";
import {
  QUERY_ALL_COURSE,
  QUERY_ENROLLED_COURSES,
} from "../../GraphQL/queries";

export default function CoursesContainer() {
  const [isLoggedIn] = useState(
    JSON.parse(sessionStorage.getItem("isLoggedIn"))
  );
  const [userId, setUserId] = useState();

  const { error, loading, data: data } = useQuery(QUERY_ALL_COURSE);
  const {
    err,
    load,
    data: enrollData,
  } = useQuery(QUERY_ENROLLED_COURSES, {
    skip: !userId,
    variables: {
      id: userId,
    },
  });

  const [enrolledCourses, setEnrolledCourses] = useState();
  const [allCourses, setAllCourses] = useState();
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      setUserId(JSON.parse(sessionStorage.getItem("user")).id);
    }
    if (data) {
      console.log(isLoggedIn);
      setAllCourses(data.courses);
    }
    if (enrollData) {
      setEnrolledCourses(enrollData.user.courses);
    }
    checkEnrollment();
  }, [data, enrollData, enrolledCourses,allCourses]);

  const checkEnrollment = () => {
    if (isLoggedIn === true) {
      console.log("all courses", enrollData);
      console.log("enrolled", enrolledCourses);

      if (allCourses && enrolledCourses) {
        const containsAny = allCourses.filter(
          (Enrolled) => !enrolledCourses.find((all) => all._id === Enrolled._id)
        );

        setCourses(containsAny);
        
      } 
    } else if (isLoggedIn === null) {
      setCourses(allCourses);
      console.log("hiya");
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
