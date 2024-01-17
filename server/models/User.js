const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { ObjectId } = Schema;

// defining a lesson schema to be used from the User model
const enrolledLessonSchema = new Schema(
  {
    // slug is used to provide better for the user to comprehend the url (readability)
      slug: {
          type: String,
          required: true
      },
      // true or false if the course is completed.
      completed: {
          type: Boolean,
          default: false
      }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// defining a enrolledSchema if a user is enrolled, and  what lessons are completed
const enrolledCourseSchema = new Schema(
  {
    slug: {
      type: String,
      required: true
    },
    // lessons that the user is enrolled in
    lessons: [ enrolledLessonSchema ],
    // lessons marked as completed
    completed: {
        type: Boolean,
        default: false
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// defining as stripeSchema to use Stripe as onboarding for the user/seller validation
const stripeSchema = new Schema({
    stripe_account_id: String,
    stripe_seller: String,
    stripeSession: String,
    passwordResetCode: {
    
      type: String,
      default: '',
    
  },
});


// defining a User Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 64,
  },
  // user picture
  picture: {
    type: String,
    default: '/avatar.png',
  },
  // defining if the user has just one role, or multiple roles
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'instructor', 'admin'],
  },
  courses: [{ type: ObjectId, ref: 'Course' }],
  enrolled: [ enrolledCourseSchema ],
  stripe:  stripeSchema ,
},
// timestamp used for whenever something is created
{
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
});

// hook to create or update a password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema
  .virtual('percentageComplete')
  .get(function () {
    return this.enrolled.map((enrolledCourse) => {
      let numberCompleted = 0;
      for (let lesson of enrolledCourse.lessons) {
        if (lesson.completed) {
          numberCompleted++;
        }
      }

      let percentage = Math.round(numberCompleted / enrolledCourse.lessons.length * 100);
      return { slug: enrolledCourse.slug, percentage };
    });
  });

userSchema
  .virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`
  });

userSchema
  .virtual('signupDate')
  .get(function () {
    return new Date().toLocaleDateString('en-us', this.createdAt);
  });

const User = mongoose.model('User', userSchema);
// exports the user model to be used in the project
module.exports = User;
