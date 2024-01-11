const typeDefs = `

type Lesson {
    _id: ID
    title: String
    slug: String
    content: String
    video: String
    free_preview: Boolean
    createdAt: String
    updatedAt: String
    completed: Boolean
  }
  
  type Enrolled {
    _id: ID
    slug: String
    lessons: [Lesson]
    completed: Boolean
  }
  
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String 
    picture: String
    role: [String]
    courses: [Course]
    uenrolled: [Enrolled]
    stripe_account_id: String
    stripe_seller: JSON
    stripeSession: JSON
    createdAt: String
    updatedAt: String
  }
  
 
  type Course {
    _id: ID
    name: String
    slug: String
    description: JSON
    price: Float
    image: JSON
    category: String
    published: Boolean
    paid: Boolean
    instructor: User
    lessons: [Lesson]
    createdAt: String
    updatedAt: String
  }
  
 
  type Auth {
    token: ID
    user: User
  }
  
  type StripeAccountResponse {
    url: String
  }
  

  
  type Query {
    users: [User]
    user(_id: ID!): User
    courses: [Course]
    course(_id: ID!): Course
    
  
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String): User
    addCourse(name: String!, description: String!, price: Float!, category: String!, instructorId: ID!): Course
    publishCourse(courseId: ID!): Course
    unpublishCourse(courseId: ID!): Course
    addLesson(courseId: ID!, title: String!, content: String!, video: String, free_preview: Boolean): Course
    updateLesson(courseId: ID!, lessonId: ID!, title: String!, content: String!, video: String, free_preview: Boolean): Course
    deleteLesson(courseId: ID!, lessonId: ID!): Course
    markLessonCompleted(courseId: ID!, lessonId: ID!, userId: ID!): Completed
    createStripeAccount: StripeAccountResponse
    handleStripeCallback: User
    removeImage(imageUrl: String!): ImageResponse
    confirmUpload(imageUrl: String!): Boolean!
    checkEnrollment(courseId: ID!, userId: ID!): EnrollmentStatus
    enrollInCourse(courseId: ID!): EnrollmentResponse
  }
  

`;
module.exports = typeDefs;


