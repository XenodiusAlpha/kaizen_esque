const typeDefs = `
  type enrolledLesson {
    slug: String!
    completed: Boolean
  }

  type enrolledCourse {
    slug: String!
    lessons: [enrolledLesson]
    completed: Boolean
  }

  type Stripe {
    stripe_account_id: String
    stripe_seller: String
    stripeSession: String
    passwordResetCode: String
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    picture: String
    role: [String]
    courses: [Course]
    enrolled: [enrolledCourse]
    stripe: Stripe
  }

  type Lesson {
    _id: ID!
    title: String!
    slug: String!
    content: String!
  }

  type Course {
    _id: ID!
    name: String!
    slug: String!
    description: String!
    price: Float!
    image: String
    category: String
    published: Boolean
    paid: Boolean
    instructor: User!
    lessons: [Lesson]
  }

  type Auth {
    token: ID!
    user: User!
  }

  type StripeAccountResponse {
    url: String
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    courses: [Course]
    course(_id: ID!): Course
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String): User
    addCourse(name: String!, description: String!, price: Float!, category: String!, instructorId: ID!): Course
    publishStatus(courseId: ID!): Course
    addLesson(courseId: ID!, title: String!, content: String!): Course
    updateLesson(courseId: ID!, lessonId: ID!, title: String!, content: String!): Course
    deleteLesson(courseId: ID!, lessonId: ID!): Course
    markLessonCompleted(userId:ID!, courseId: ID!, lessonId: ID!): User
    createStripeAccount: StripeAccountResponse
    handleStripeCallback: User
    enrollInCourse(userId: ID!, courseId: ID!): User
  }
`;

module.exports = typeDefs;
