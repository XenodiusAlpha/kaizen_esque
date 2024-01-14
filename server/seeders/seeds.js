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
    const users = await User.create(userSeeds);

    courseSeeds = courseSeeds.map((course) => {
      return ({
        ...course,
        instructor: users[Math.floor(Math.random() * users.length)]._id
      })
    });

    await Course.create(courseSeeds);
    // await Lesson.create(lessonSeeds);
    console.log('All done! Database seeded.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database', err);
    process.exit(1);
  }
});

