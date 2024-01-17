const { User, Course } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const localBaseUrl = "http://localhost:3000";
const refreshUrl = `${localBaseUrl}/restart-onboarding`;
const returnUrl = `${localBaseUrl}/instructor/dashboard`;
const resolvers = {
  Query: {

    // Find all users
    users: async () => {
      try {
        return await User.find({}).populate('courses').populate('enrolled');
      } catch (error) {
        throw new Error(`Failed to find users. ${error.message}`);
      }
    },

    // Find a single user by id
    user: async (_, { _id }) => {
      try {
        return await User.findById(_id).populate('courses').populate('enrolled');
      } catch (error) {
        throw new Error(`Failed to find user: ${error.message}`);
      }
    },

    //  Find all courses
    courses: async () => {
      try {
        return await Course.find({}).populate('instructor');
      } catch (error) {
        throw new Error(`Failed to find courses. ${error.message}`);
      }
    },

    //  Find a single course by id
    course: async (_, { _id }) => {
      try {
        return await Course.findById(_id).populate('instructor').populate('lessons');
      } catch (error) {
        throw new Error(`Failed to find course: ${error.message}`);        
      }
    },

    // Find all published courses
    publishedCourses: async (_, args) => {
      try {
        return await Course.find({ published: true }).populate('instructor').populate('lessons');
      } catch (error) {
        throw new Error(`Failed to find published courses. ${error.message}`);        
      }
    },

    // Verifies if user is enrolled in course
    checkEnrollment: async (_, { userId, courseId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new AuthenticationError('User not found');
        }
        const course = await Course.findById(courseId);
        const isEnrolled = user.enrolled.some(enrolledCourse => enrolledCourse.slug === course.slug);
        return isEnrolled; // Directly return the boolean value
      } catch (error) {
        throw new Error(`Failed to find if user is enrolled in course. ${error.message}`);        
      }
    },

    // Querying the count of enrolled courses the user has
    getEnrolledCoursesCount: async (_, { userId }) => {
      try {
        const user = await User.findById(userId).populate('enrolled');
        if (!user) {
          throw new AuthenticationError('User not found');
        }
        // Return the count of enrolled courses
        return user.enrolled.length;
      } catch (error) {
        throw new Error(`Failed to find enrolled courses count for specified user. ${error.message}`);        
      }
  },

    // Verifies if course is completed by user
    checkCourseCompleted: async (_, { userId, courseId }) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to find if user completed a course. ${error.message}`);        
      }
    },

    // Verifies if lesson is completed by user, and if the course is completed due to the last lesson being completed
    checkLessonCompleted: async (_, { userId, courseId, lessonSlug }) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to find if user completed a lesson. ${error.message}`);        
      }
    },

    // Finds courses by instructor id
    findCoursesByInstructor: async (_, { instructorId }) => {
      try {
        return await Course.find({ instructor: instructorId }).populate('instructor').populate('lessons');
      } catch (error) {
        throw new Error(`Failed to find courses by instructor: ${error.message}`);        
      }
    },
  },


  Mutation: {
    // Adding a user and assigning a token to them
    addUser: async (_, { firstName, lastName, email, password, role }) => {
      try {
        let userRole = (role) ? 'instructor' : 'user';
        const user = new User({ firstName, lastName, email, password, role: userRole });
        const token = signToken(user);
        await user.save();
        return { token, user };
      } catch (error) {
        throw new Error(`Failed to add a user. ${error.message}`);
      }
    },

    editUser: async (_, { _id, firstName, lastName, email, password }) => {
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error('User not found');
        }
        if (firstName) {
          user.firstName = firstName;
        }
        if (lastName) {
          user.lastName = lastName;
        }
        if (email) {
          user.email = email;
        }
        if (password) {
          user.password = password;
        }
        await user.save();
        return user;
      } catch (error) {
        throw new Error(`Failed to edit user. ${error.message}`);
      }
    },

    // Login a user by email and password and assigning a token to them
    login: async (_, { email, password }) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to login a user. ${error.message}`);
      }
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
        throw new Error(`Failed to add course. ${error.message}`);
      }
    },

    // Publish a course so that users can enroll in it
    publishCourse: async (_, { courseId }) => {
      try {
        const course = await Course.findByIdAndUpdate(courseId, { published: true }, { new: true });
        return course;
      } catch (error) {
        throw new Error(`Failed to publish a course. ${error.message}`);
      }
    },

    // Un-publish a course
    unpublishCourse: async (_, { courseId }) => {
      try {
        const course = await Course.findByIdAndUpdate(courseId, { published: false }, { new: true });
        return course;
      } catch (error) {
        throw new Error(`Failed to unpublish a course. ${error.message}`);
      }
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
        throw new Error(`Failed to enroll in course. ${error.message}`);
      }
    },

    // Add a lesson
    addLesson: async (_, { courseId, title, content }) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to add a lesson. ${error.message}`);
      }
    },

    // Update a lesson
    updateLesson: async (_, { courseId, lessonId, title, content }) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to update a lesson. ${error.message}`);
      }
    },

    // Delete a lesson
    deleteLesson: async (_, { courseId, lessonId }) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to delete a lesson. ${error.message}`);
      }
    },

    // Logic to mark a lesson completed
    markLessonCompleted: async (_, { userId, courseSlug, lessonSlug }) => {
      try {
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
      } catch (error) {
        throw new Error(`Failed to mark a lesson completed. ${error.message}`);
      }
    },

    // Update a course in both the course model, and in the users' course and enrolled fields.
    updateCourse: async (_, { courseId, name, description, price, category, published, paid, image }) => {
      try {
        let updateFields = { name, description, price, category, published, paid, image };
        let updateSlug = false;
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found');
        }
        if (name && name !== course.name) {
          updateFields.slug = name.toLowerCase().replace(/\s+/g, '-');
          updateSlug = true;
        }
        // Update the course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateFields, { new: true, omitUndefined: true });
        if (!updatedCourse) {
        throw new Error('Course not found');
        }
        // If the course slug is updated, we reflect this change in the enrolled courses of all users
        if (updateSlug) {
          await User.updateMany(
            { 'enrolled.slug': course.slug },
            { $set: { 'enrolled.$.slug': updateFields.slug } }
          );
        }
        
        return updatedCourse;
      } catch (error) {
        console.error(error);
        throw new Error('Error updating course');
      }
    },

    // Delete the course from the course model and from the users' courses and enrolled fields
    deleteCourse: async (_, { courseId }) => {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          console.error('Course not found');
          return false;
        }
        await Course.findByIdAndDelete(courseId);
        // Remove this course from any users' 'courses' and 'enrolled' arrays
        await User.updateMany(
          {},
          {
            $pull: {
              courses: courseId,
              enrolled: { slug: course.slug }
            }
          }
        );
        return true;
      } catch (error) {
        throw new Error('Error deleting course:', error);
      }
    },

    //  Create a stripe account
    createStripeAccount: async (_, args, { user }) => {
      try {
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
      } catch (error) {
        throw new Error('Error creating Stripe account.', error);
      }
    },

    // Handles Stripe Callback onboarding
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