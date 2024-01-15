import React from "react";
import coursesInfo from "../../utils/courseTest";
import CourseCards from "../miniComponents/CourseCards";
import "../../assets/css/CourseContainer.css";

export default function CourseContainer() {
  return (
    <div className="CourseContainer">
      {coursesInfo.map((course, key) => (
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
