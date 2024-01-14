const { User, Course } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const localBaseUrl = "http://localhost:3000";
const refreshUrl = `${localBaseUrl}/restart-onboarding`;
const returnUrl = `${localBaseUrl}/instructor/dashboard`;
const resolvers = {
    Query: {
        users: async () => {
          return await User.find({});
        },
        user: async (_, { _id }) => {
          return await User.findById(_id).populate('courses').populate('enrolled');
        },
        courses: async () => {
          return await Course.find({}).populate('instructor');
        },
        course: async (_, { _id }) => {
          return await Course.findById(_id).populate('instructor').populate('lessons');
        },

        checkEnrollment: async (_, { userId, courseId }) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new AuthenticationError('User not found');
            }
            const course = await Course.findById(courseId);
            const isEnrolled = user.enrolled.some(enrolledCourse => enrolledCourse.slug === course.slug);
            return isEnrolled; // Directly return the boolean value
        },
        

        checkCourseCompleted: async (_, { userId, courseId }) => {
          const user = await User.findById(userId);
          if (!user) {
            throw new AuthenticationError('User not found');
          }
          const course = await Course.findById(courseId);
          const courseEnrollment = user.enrolled.find(enrolledCourse => enrolledCourse.slug === course.slug);
          if (!courseEnrollment) {
            return false; // User is not enrolled in the course
          }
          return courseEnrollment.completed;
        },


        checkLessonCompleted: async (_, { userId, courseId, lessonSlug }) => {
          const user = await User.findById(userId);
          if (!user) {
            throw new AuthenticationError('User not found');
          }
          const courseEnrollment = user.enrolled.find(enrolledCourse => enrolledCourse.slug === courseId);
          if (!courseEnrollment) {
            return false; // User is not enrolled in the course
          }
          const lesson = courseEnrollment.lessons.some(lesson => lesson.slug === lessonSlug);
          if (!lesson) {
            return false; // Lesson not found in the course enrollment
          }
          return lesson.completed;
        },
      },
  
      Mutation: {
        // Adding a user and assigning a token to them
        addUser: async (_, { firstName, lastName, email, password }) => {
          const user = new User({ firstName, lastName, email, password });
          const token = signToken(user);
          await user.save();
          return { token, user };
        },

        // Login a user by email and password and assigning a token to them
        login: async (_, { email, password }) => {
          const user = await User.findOne({ email });
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
          const correctPw = await user.isCorrectPassword(password);
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
          const token = signToken(user);
          return { token, user };
        },

        // Adding a course from an instructor
        addCourse: async (_, { name, description, price, category, instructorId }) => {
          try {
            // Fetch the instructor by instructorId
            const instructor = await User.findById(instructorId);
            if (!instructor) {
              throw new Error('Instructor not found');
            }
        
            // Generate the slug based on the course name
            const slug = name.toLowerCase().replace(/\s+/g, '-');
        
            // Create a new Course instance with the generated slug
            const course = new Course({
              name,
              slug,
              description,
              price,
              category,
              instructor: instructorId
            });
        
            // Save the new course
            await course.save();
        
            // Update the instructor's user document to include the new course
            await User.findByIdAndUpdate(instructorId, { $push: { courses: course._id } });
        
            return course;
          } catch (error) {
            throw new Error(`Failed to add course: ${error.message}`);
          }
        },
        
        // Publish a course so that users can enroll in it
        publishCourse: async (_, { courseId }) => {
          const course = await Course.findByIdAndUpdate(courseId, { published: true }, { new: true });
          return course;
        },

        // Un-publish a course 
        unpublishCourse: async (_, { courseId }) => {
          const course = await Course.findByIdAndUpdate(courseId, { published: false }, { new: true });
          return course;
        },

        // Enroll a user in a course
        enrollInCourse: async (_, { userId, courseId }) => {
            try {
              // Fetch the user by userId
              const user = await User.findById(userId);
              if (!user) {
                throw new Error('User not found');
              }
              // Fetch the course by courseId
              const course = await Course.findById(courseId);
              if (!course) {
                throw new Error('Course not found');
              }
              // Check if the user is already enrolled
              const isEnrolled = user.enrolled.some(enrolledCourse => enrolledCourse.slug === course.slug);
              if (isEnrolled) {
                throw new Error('User is already enrolled in this course');
              }
              // Add the course to the user's list of courses
              user.courses.push(
                course._id
              );
              // Add the course with it's lessons to the user's list of enrolled courses
              user.enrolled.push({
                slug: course.slug,
                lessons: course.lessons.map((lesson) => {return {slug: lesson.slug}})
              });
              // Save the updated user information
              await user.save();
              // Return the updated user
              return user;
            } catch (error) {
              throw new Error(`Failed to enroll in course: ${error.message}`);
            }
        },
    }
}; 

module.exports = resolvers;