const db = require('../config/connection');
const Course = require('../models/Course');
const User = require('../models/User');
const userSeeds = require('./userSeeds.json');
const courseSeeds = require('./courseSeeds.json');
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
    await User.create(userSeeds);
    await Course.create(courseSeeds);
    // await Lesson.create(lessonSeeds);
    console.log('All done! Database seeded.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database', err);
    process.exit(1);
  }
});

