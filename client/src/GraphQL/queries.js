import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    me {
      _id
      name
      enrolled_courses
      authored_courses
    }
  }
`;

export const QUERY_SINGLE_COURSE = gql`
  query Courses($id: ID!) {
    course(_id: $id) {
      name
      _id
      description
      price
      slug
      instructor {
        _id
        fullName
      }
      category
      lessons {
        title
        content
      }
    }
  }
`;
export const QUERY_ALL_COURSE = gql`
  query Courses {
    courses {
      name
      description
      _id
      instructor {
        _id
      }
      price
    }
  }
`;

export const QUERY_ENROLLED_COURSES = gql`
  query courses($id: ID!) {
    user(_id: $id) {
      firstName
      lastName
      _id
      courses {
        name
        description
        price
      }
    }
  }
`;

export const MY_CREATED_COURSES = gql`
  query FindMyCreatedCourses($instructorId: ID!) {
    findCoursesByInstructor(instructorId: $instructorId) {
      _id
      name
      slug
      description
      price
      paid
      instructor {
        fullName
      }
    }
  }
`;
