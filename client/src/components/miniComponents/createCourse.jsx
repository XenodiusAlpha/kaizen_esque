import React, { useState } from 'react';

const CourseForm = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [lessons, setLessons] = useState([
    { title: '', description: '', thumbnail: '', hyperlink: '' }
  ]);

  const handleLessonChange = (index, key, value) => {
    const newLessons = [...lessons];
    newLessons[index][key] = value;
    setLessons(newLessons);
  };

  const handleAddLesson = () => {
    setLessons([...lessons, { title: '', description: '', thumbnail: '', hyperlink: '' }]);
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
      lessons
    };
    const jsonData = JSON.stringify(submitPackageNewCourse);
    sendDataToDatabase(jsonData);
    return jsonData;
  };
  const sendDataToDatabase = (jsonData) => {
    //Need database logic here to recieve json.
    console.log(jsonData);
  };


  return (
    <div className='ccbox-style'>
      <h2>Course Information</h2>
      <label className='flex-container-columns'>
        Course Title:
        <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
      </label>
      <br />
      <label className='flex-container-columns'>
        Course Description:
        <textarea value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
      </label>
      <hr />

      <h2>Lessons</h2>
      {lessons.map((lesson, index) => (
        <div key={index}>
          <h3>Lesson {index + 1}</h3>
          <label className='flex-container-columns'>
            Title:
            <input
              type="text"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
            />
          </label>
          <br />
          <label className='flex-container-columns'>
            Description:
            <textarea
              value={lesson.description}
              onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
            />
          </label>
          <br />
          <label>
            Thumbnail:
            <input
              type="text"
              value={lesson.thumbnail}
              onChange={(e) => handleLessonChange(index, 'thumbnail', e.target.value)}
            />
          </label>
          <br />
          <label>
            Hyperlink:
            <input
              type="text"
              value={lesson.hyperlink}
              onChange={(e) => handleLessonChange(index, 'hyperlink', e.target.value)}
            />
          </label>
          <br />
          <button onClick={() => handleRemoveLesson(index)}>Remove Lesson</button>
          <hr />
        </div>
      ))}

      <button onClick={handleAddLesson}>Add Lesson</button>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CourseForm;
