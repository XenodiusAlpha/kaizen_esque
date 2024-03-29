import { gql } from "@apollo/client";

export const ADD_COURSE = gql`
  mutation createCourse(
    $name: String!
    $description: String!
    $price: Float!
    $category: String!
    $instructorId: ID!
  ) {
    addCourse(
      name: $name
      description: $description
      price: $price
      category: $category
      instructorId: $instructorId
    ) {
      name
      description
      price
      instructor {
        _id
        fullName
      }
      _id
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: ID!) {
    deleteCourse(courseId: $courseId)
  }
`;

export const ENROLL_USER = gql`
  mutation enrollUser($userId: ID!, $courseId: ID!) {
    enrollInCourse(userId: $userId, courseId: $courseId) {
      fullName
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $role: Boolean!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      role: $role
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        role
        signupDate
      }
    }
  }
`;

export const REMOVE_COURSE = gql`
  mutation removecourse($enrolled_course: String!) {
    removecourse(course: $enrolled_course) {
      _id
      name
      enrolled_course
    }
  }
`;

export const ADD_LESSON = gql`
  mutation addlesson($courseId: ID!, $title: String!, $content: String!) {
    addLesson(courseId: $courseId, title: $title, content: $content) {
      name
      slug
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        signupDate
        role
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($id: ID!, $firstName: String, $lastName: String, $email: String, $password: String) {
    editUser(_id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const MARK_LESSON_COMPLETE = gql`
  mutation completeLesson(
    $userId: ID!
    $courseSlug: String!
    $lessonSlug: String!
  ) {
    markLessonCompleted(
      userId: $userId
      courseSlug: $courseSlug
      lessonSlug: $lessonSlug
    ) {
      fullName
    }
  }
`;
