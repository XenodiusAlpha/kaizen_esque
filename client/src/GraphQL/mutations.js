import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    addProfile(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        role
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
