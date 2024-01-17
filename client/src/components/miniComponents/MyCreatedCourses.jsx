import coursesInfo from "../../GraphQL/courseTest";
import MyCourseCards from "./MyCourseCard.jsx";
import "../../assets/css/MyCourses.css";
import { useEffect, useState, useParams } from "react";
import { useQuery } from "@apollo/client";
import { MY_CREATED_COURSES } from "../../GraphQL/queries";
import { useWatchQueryOptions } from "@apollo/client/react/hooks/useSuspenseQuery";

export default function MyCourses(props) {
  const [userId] = useState(JSON.parse(sessionStorage.getItem("user")).id);

  const { error, loading, data } = useQuery(MY_CREATED_COURSES, {
    skip: !userId,
    variables: {
      instructorId: userId,
    },
  });

  function MyCoursesInfo() {
    if (data) {
      let courses = data.findCoursesByInstructor;
      console.log("MyCreatedCourses", courses);

      return (
        <>
          {courses.map((course, key) => (
            <MyCourseCards
              key={key}
              title={course.name}
              desc={course.description}
              price={course.price}
              courseId={course._id}
            />
          ))}{" "}
        </>
      );
    }
  }

  return (
    <div className="MyCourses" id={props.id}>
      <MyCoursesInfo />
    </div>
  );
}
