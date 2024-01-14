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
  
 
};
module.exports = resolvers;