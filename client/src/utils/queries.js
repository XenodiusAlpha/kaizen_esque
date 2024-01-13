import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      email
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      enrolled_courses
      authored_courses
    }
  }
`;

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

export const QUERY_ALL_COURSE = gql`
  query allCourses {
    me {
      _id
      name
      description
      cost
      author
    }
  }
`;

export const QUERY_SINGLE_COURSE = gql`
  query singleCourses {
    me {
      _id
      name
      description
      cost
      author
    }
  }
`;


// UserActivation, USERID, COURSES, COURSESID, LESSONS, LESSONID