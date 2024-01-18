import React, { useState } from "react";
import { ADD_COURSE, ADD_LESSON } from "../../GraphQL/mutations";
import { useMutation } from "@apollo/client";

const CreateCourse = (props) => {
  const [CreateCourse, { error }] = useMutation(ADD_COURSE);
  const [CreateLesson, { err }] = useMutation(ADD_LESSON);

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [lessons, setLessons] = useState([
    { title: "", description: "", thumbnail: "", hyperlink: "" },
  ]);
  const [coursePrice, setCoursePrice] = useState("");
  const [courseCategory, setCourseCategory] = useState("");

  const handleLessonChange = (index, key, value) => {
    const newLessons = [...lessons];
    newLessons[index][key] = value;
    setLessons(newLessons);
  };

  const handleAddLesson = () => {
    setLessons([
      ...lessons,
      { title: "", description: "", thumbnail: "", hyperlink: "" },
    ]);
  };

  const handleRemoveLesson = (index) => {
    const newLessons = [...lessons];
    newLessons.splice(index, 1);
    setLessons(newLessons);
  };

  const handleSubmit = () => {
    const submitPackageNewCourse = {
      courseTitle,
      courseDescription,
      lessons,
      coursePrice,
      courseCategory,
    };
    const jsonData = submitPackageNewCourse;
    sendDataToDatabase(jsonData);
    return jsonData;
  };
  const sendDataToDatabase = async (jsonData) => {
    const { data } = await CreateCourse({
      variables: {
        name: jsonData.courseTitle,
        description: jsonData.courseDescription,
        price: parseFloat(jsonData.coursePrice),
        category: jsonData.courseCategory,
        instructorId: JSON.parse(sessionStorage.getItem("user")).id,
      },
    });

    for (let i = 0; i < jsonData.lessons.length; i++) {
      const { lessonData } = await CreateLesson({
        variables: {
          courseId: data.addCourse._id,
          title: jsonData.lessons[i].title,
          content: jsonData.lessons[i].description,
        },
      });
      console.log("Lessons", lessonData);
    }

    console.log("Courses", data);
  };

  //ADDlESSON
  //  {  "courseId": null,
  //   "title": null,
  //   "content": nulll
  // }

  // "instructorId": "65a72700d51ec8766318b4d1",
  // "name":"GraphQl Course",
  // "description":"This course will trach you how to make a database in GraphQl",
  // "price": 10.99,
  // "category": "databases"

  return (
    <div className={`ccbox-style ${props.className}`} id={props.id}>
      <h2>Course Information</h2>
      <label className="flex-container-columns">
        Course Title:
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
      </label>
      <br />
      <label className="flex-container-columns">
        Course Description:
        <textarea
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </label>
      <br />
      <label className="flex-container-columns">
        Course Category:
        <textarea
          value={courseCategory}
          onChange={(e) => setCourseCategory(e.target.value)}
        />
      </label>
      <br />
      <label className="flex-container-columns">
        Course Price:
        <textarea
          value={coursePrice}
          onChange={(e) => setCoursePrice(e.target.value)}
        />
      </label>
      <hr />

      <h2>Lessons</h2>
      {lessons.map((lesson, index) => (
        <div key={index}>
          <h3>Lesson {index + 1}</h3>
          <label className="flex-container-columns">
            Title:
            <input
              type="text"
              value={lesson.title}
              onChange={(e) =>
                handleLessonChange(index, "title", e.target.value)
              }
            />
          </label>
          <br />
          <label className="flex-container-columns">
            Description:
            <textarea
              value={lesson.description}
              onChange={(e) =>
                handleLessonChange(index, "description", e.target.value)
              }
            />
          </label>
          <br />
          {/* <label>
            Thumbnail:
            <input
              type="text"
              value={lesson.thumbnail}
              onChange={(e) =>
                handleLessonChange(index, "thumbnail", e.target.value)
              }
            />
          </label> */}
          <br />
          {/* <label>
            Hyperlink:
            <input
              type="text"
              value={lesson.hyperlink}
              onChange={(e) =>
                handleLessonChange(index, "hyperlink", e.target.value)
              }
            />
          </label> */}
          <br />
          <button onClick={() => handleRemoveLesson(index)}>
            Remove Lesson
          </button>
          <hr />
        </div>
      ))}

      <button onClick={handleAddLesson}>Add Lesson</button>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateCourse;
