import "../../assets/css/CoursePage.css";
import image from "../../assets/img/CookingCourse.png";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_COURSE } from "../../GraphQL/queries";
import { useState, useEffect } from "react";
import LessonCard from "../miniComponents/LessonCard";
import { useLocation } from "react-router-dom";

export default function CoursePage() {
  const [courseId, setCourseId] = useState();

  useEffect(() => {
    let x = location.pathname.split("/")[2];
    setCourseId(x);
  });
  const location = useLocation();
  const { error, loading, data } = useQuery(QUERY_SINGLE_COURSE, {
    skip: !courseId,
    variables: {
      id: courseId,
    },
  });

  const CourseInfo = () => {
    if (data) {
      console.log(data);

      let lessons = data.course.lessons;
      console.log(lessons);

      return (
        <div>
          <div className="CoursePage">
            <h1>{data.course.name}</h1>

            <img src={image} className="CourseImg"></img>
            <h2>{data.course.instructor.fullName}</h2>
            <p>{data.course.description}</p>
            <p>${data.course.price}</p>
            <button>Enroll Now</button>
          </div>
          {lessons.map((lesson, key) => (
            <LessonCard
              key={key}
              title={lesson.title}
              content={lesson.content}
            />
          ))}
        </div>
      );
    }
  };

  // {courses.map((course, key) => (
  //   <EnrolledCourseCards
  //     key={key}
  //     title={course.name}
  //     desc={course.description}
  //     price={course.price}
  //     id={course._id}
  //   />
  // ))}

  useEffect(() => {});

  return (
    <div className="CoursePageBox">
      <CourseInfo />
    </div>
  );
}
