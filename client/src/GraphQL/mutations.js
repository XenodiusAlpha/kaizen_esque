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


export const ADD_USER_MUTATION = gql`
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $role: Boolean!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $role) {
      token
      user {
        _id
        firstName
        lastName
        email
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

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;