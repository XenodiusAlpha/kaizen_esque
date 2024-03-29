import "../../assets/css/CoursePage.css";
import image from "../../assets/img/CookingCourse.png";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_COURSE } from "../../GraphQL/queries";
import { ENROLL_USER } from "../../GraphQL/mutations";
import { useState, useEffect } from "react";
import LessonCard from "../miniComponents/LessonCard";
import { useLocation, useNavigate } from "react-router-dom";

export default function CoursePage() {
  const [userId, setUserId] = useState(
    JSON.parse(sessionStorage.getItem("user")).id
  );
  const [courseId, setCourseId] = useState();
  // const navigate = new Navigate();
  const [Enroll, { err }] = useMutation(ENROLL_USER);

  useEffect(() => {
    let x = location.pathname.split("/")[2];
    setCourseId(x);
  });
  const location = useLocation();
  const navigate = new useNavigate();
  const { error, loading, data } = useQuery(QUERY_SINGLE_COURSE, {
    skip: !courseId,
    variables: {
      id: courseId,
    },
  });

  const EnrollNow = async () => {
    const { data } = await Enroll({
      variables: {
        userId: userId,
        courseId: courseId,
      },
    });
    navigate("/Profile")
  };

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
            <button onClick={EnrollNow}>Enroll Now</button>
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
