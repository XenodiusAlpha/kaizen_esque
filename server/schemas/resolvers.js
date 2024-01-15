const { User, Course } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const localBaseUrl = "http://localhost:3000";
const refreshUrl = `${localBaseUrl}/restart-onboarding`;
const returnUrl = `${localBaseUrl}/instructor/dashboard`;
const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('courses').populate('enrolled');
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

    findCoursesByInstructor: async (_, { instructorId }) => {
      return await Course.find({ instructor: instructorId });
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

    addLesson: async (_, { courseId, title, content }) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      const slug = title.toLowerCase().replace(/\s+/g, '-');
      course.lessons.push({ title, slug, content });
      await course.save();

      let users = await User.find({ 'enrolled.slug': course.slug });
      for (let user of users) {
        let userCourse = user.enrolled.find((enrolledCourse) => enrolledCourse.slug == course.slug);
        userCourse.lessons = [ ...userCourse.lessons, { slug, completed: false } ];
        await user.save();
      }

      return course;
    },

    updateLesson: async (_, { courseId, lessonId, title, content }) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      const lesson = course.lessons.id(lessonId);
      if (!lesson) {
        throw new Error('Lesson not found');
      }

      // Update all users enrolled in this course
      if(title !== lesson.title) {
        lesson.title = title;
        const updatedSlug = title.toLowerCase().replace(/\s+/g, '-');
        lesson.slug = updatedSlug;

        await User.updateMany(
          { 'enrolled.slug': course.slug },
          { $set: { 'enrolled.$.lessons': { slug: updatedSlug } } }
        );
      }

      lesson.content = content;
      await course.save();
      return course;
    },

    deleteLesson: async (_, { courseId, lessonId }) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      let lessonSlug;
      course.lessons = course.lessons.filter((lesson) => {
        if (lesson._id != lessonId) {
          return true;
        }
        else {
          lessonSlug = lesson.slug;
          return false;
        }
      });

      // Update all users enrolled in this course
      await User.updateMany(
        { 'enrolled.slug': course.slug },
        { $pull: { 'enrolled.$.lessons': { slug: lessonSlug } } }
      );

      await course.save();
      return course;
    },

    markLessonCompleted: async (_, { userId, courseSlug, lessonSlug }) => {
      let user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      let enrolledCourse = user.enrolled.find((course) => course.slug == courseSlug);

      let enrolledLesson = enrolledCourse.lessons.find((lesson) => lesson.slug == lessonSlug);
      enrolledLesson.completed = true;

      let completed = true;
      enrolledCourse.lessons.forEach((lesson) => {
        completed = completed && lesson.completed;
      });
      enrolledCourse.completed = completed;

      await user.save();

      return user;
    },

    updateCourse: async (_, { courseId, name, description, price, category, published, paid, image }) => {
      try {
        // Find the course by ID and update it
        const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          { name, description, price, category, published, paid, image },
          { new: true, omitUndefined: true }
        );
        if (!updatedCourse) {
          throw new Error('Course not found');
        }
        return updatedCourse;
      } catch (error) {
        console.error(error);
        throw new Error('Error updating course');
      }
    },

    createStripeAccount: async (_, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Authentication required');
      }
      const existingUser = await User.findById(user._id);
      if (!existingUser) {
        throw new Error('User not found');
      }
      let stripeAccountId = existingUser.stripe_account_id;
      if (!stripeAccountId) {
        const stripeAccount = await stripe.accounts.create({
          type: 'express',
          email: existingUser.email,
        });
        stripeAccountId = stripeAccount.id;
        existingUser.stripe_account_id = stripeAccountId;
        await existingUser.save();
      }
      const accountLink = await stripe.accountLinks.create({
        account: stripeAccountId,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: 'account_onboarding',
      });
      return {
        url: accountLink.url,
        email: existingUser.email,
      };
    },

    handleStripeCallback: async (_, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Authentication required');
      }
      const existingUser = await User.findById(user._id);
      if (!existingUser) {
        throw new Error('User not found');
      }
      if (!existingUser.stripe_account_id) {
        throw new Error('Stripe onboarding not completed');
      }
      if (!existingUser.role.includes('instructor')) {
        try {
          existingUser.role.push('instructor');
          existingUser.markModified('role');
          await existingUser.save();
        } catch (error) {
          console.error("Error updating user role:", error);
        }
      }
      return existingUser;
    },
  },
};

module.exports = resolvers;