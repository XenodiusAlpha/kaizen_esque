import React from "react";
import coursesInfo from "../../utils/courseTest";
import CourseCard from "../miniComponents/CourseCards";
import "../../assets/css/CourseContainer.css";

export default function Courses() {
  return (
    <div className="CourseContainer">
      {coursesInfo.map((course, key) => (
        <CourseCard
          key={key}
          title={course.name}
          desc={course.description}
          price={course.price}
        />
      ))}
    </div>
  );
}
