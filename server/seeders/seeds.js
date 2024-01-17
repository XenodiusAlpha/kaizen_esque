const db = require('../config/connection');
const Course = require('../models/Course');
const User = require('../models/User');
const userSeeds = require('./userSeeds.json');
let courseSeeds = require('./courseSeeds.json');
const lessonSeeds = require('./lessonSeeds.json');
const cleanDB = require('./cleanDB');


db.once('open', async () => {
  try {
    // Clean the database
    await cleanDB('User', 'users');
    console.log('user----------------')
    await cleanDB('Course', 'courses');
    console.log('course ---------------------')
    //  await cleanDB('Lesson', 'lessons');

    // Seed the data
    let users = await User.create(userSeeds);
    let instructors = users.filter((user) => user.role.includes('instructor'));

    courseSeeds = courseSeeds.map((course) => {
      return ({
        ...course,
        instructor: instructors[Math.floor(Math.random() * instructors.length)]._id
      })
    });

    let courses = await Course.create(courseSeeds);

    // Populate courses attribute of each user
    for (let user of users) {
      for (let enrolledCourse of user.enrolled) {
        let course = courses.find((course) => course.slug == enrolledCourse.slug);
        user.courses.push(course._id);
        await user.save();
      }
    }

    // await Lesson.create(lessonSeeds);
    console.log('All done! Database seeded.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database', err);
    process.exit(1);
  }
});

