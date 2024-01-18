import { useQuery, useMutation } from "@apollo/client";
import { CHECK_LESSON_COMPLETE } from "../../GraphQL/queries";
import { MARK_LESSON_COMPLETE } from "../../GraphQL/mutations";
import { useState } from "react";

export default function EnrolledLessonCard(props) {
  const [CheckCompletedLesson, SetCompletedLesson] = useState(false);

  const [userId, setUserId] = useState(
    JSON.parse(sessionStorage.getItem("user")).id
  );
  const [courseId] = useState(props.courseId);
  const [lessonSlug] = useState(props.lessonSlug);

  
  
  const [courseSlug] = useState(props.courseSlug);
  const [completeLesson, { error }] = useMutation(MARK_LESSON_COMPLETE);
  const { err, loading, data } = useQuery(CHECK_LESSON_COMPLETE, {
    variables: {
      userId: userId,
      courseSlug: courseSlug,
      lessonSlug: lessonSlug,
    },
  });

  const lessonComplete = async () => {
    const { data } = await completeLesson({
      variables: {
        userId: userId,
        courseSlug: courseSlug,
        lessonSlug: lessonSlug,
      },
    });
    
  };

  
 
  return (
    <div className="LessonCard">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <button onClick={lessonComplete}>Complete Lesson!</button>
    </div>
  );
}
