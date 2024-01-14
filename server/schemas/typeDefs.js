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
`;

module.exports = typeDefs;
