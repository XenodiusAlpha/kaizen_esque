import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EDIT_COURSE, EDIT_LESSON } from "../../GraphQL/mutations";
import { GET_COURSE} from "../../GraphQL/mutations";
import { useMutation } from "@apollo/client";

const EditCourse = (props) => {
  const [EditCourse, { error }] = useMutation(EDIT_COURSE);
  const [EditLesson, { err }] = useMutation(EDIT_LESSON);

  const [updateTitle, setupdateTitle] = useState("");
  const [updateDescription, setupdateDescription] = useState("");
  const [lessons, setLessons] = useState([
    { title: "", description: "", thumbnail: "", hyperlink: "" },
  ]);
  const [updatecoursePrice, setCoursePrice] = useState("");
  const [updatecourseCategory, setCourseCategory] = useState("");

  const handleLessonChange = (index, key, value) => {
    const newLessons = [...lessons];
    newLessons[index][key] = value;
    setLessons(newLessons);
  };


  return (
    <div className={`ccbox-style ${props.className}`} id={props.id}>
      <h2>Course Information</h2>
      <div>
          <Link
            to="/Profile"
          >
            <p>Exit</p>
          </Link>
      </div>
      <label className="flex-container-columns">
      Edit Title:
        <input
          type="text"
          value={updateTitle}
          onChange={(e) => setupdateTitle(e.target.value)}
        />
      </label>
      <br />
      <label className="flex-container-columns">
      Edit Description:
        <textarea
          value={updateDescription}
          onChange={(e) => setupdateDescription(e.target.value)}
        />
      </label>
      <br />
      <label className="flex-container-columns">
      Edit Category:
        <textarea
          value={updatecourseCategory}
          onChange={(e) => setCourseCategory(e.target.value)}
        />
      </label>
      <br />
      <label className="flex-container-columns">
      Edit Price:
        <textarea
          value={updatecoursePrice}
          onChange={(e) => setCoursePrice(e.target.value)}
        />
      </label>
      <hr />

      <h2>Lessons</h2>
      {lessons.map((lesson, index) => (
        <div key={index}>
          <h3>Lesson {index + 1}</h3>
          <label className="flex-container-columns">
            Edit Title:
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
          Edit Description:
            <textarea
              value={lesson.description}
              onChange={(e) =>
                handleLessonChange(index, "description", e.target.value)
              }
            />
          </label>
          <br />
          <label>
          Edit Thumbnail:
            <input
              type="text"
              value={lesson.thumbnail}
              onChange={(e) =>
                handleLessonChange(index, "thumbnail", e.target.value)
              }
            />
          </label>
          <br />
          <label>
          Edit Hyperlink:
            <input
              type="text"
              value={lesson.hyperlink}
              onChange={(e) =>
                handleLessonChange(index, "hyperlink", e.target.value)
              }
            />
          </label>
          <br />
          <hr />
        </div>
      ))}
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditCourse;
