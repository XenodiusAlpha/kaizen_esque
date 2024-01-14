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
      if (!course) {
        throw new Error('Course not found');
      }
      const isEnrolled = user.enrolled.some(enrolledCourse => enrolledCourse.slug === course.slug);
      return { enrolled: isEnrolled };
    },
  },
};
module.exports = resolvers;