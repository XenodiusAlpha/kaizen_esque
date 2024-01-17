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
  mutation addCourse($profileId: ID!, $enrolled_course: String!) {
    addcourse(profileId: $profileId, course: $enrolled_course) {
      _id
      name
      enrolled_course
      createdAt
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
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!,$lastName: String!, $email: String!, $password: String! $confirmPassword: String! $role: boolean!) {
    login(firstName: $firstName, lastName: $lastName, email: $email, password: $password confirmPassword: $confirmPassword role: $role) {
      token
      user {
        _id
        firstName
        lastName
        email
        password
        confirmPassword
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
