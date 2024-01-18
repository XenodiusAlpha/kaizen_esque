import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

import HomeDefault from "./components/mainComponents/HomeDefault.jsx";
import CoursesContainer from "./components/mainComponents/CoursesContainer.jsx";
import Login from "./components/mainComponents/Login.jsx";
import LearnMore from "./components/mainComponents/LearnMore.jsx";
import Signup from "./components/UI/Signup.jsx";
import ProfilePage from "./components/UI/ProfilePage.jsx";
import Checkout from "./components/UI/Checkout.jsx";
import CreateCourse from "./components/miniComponents/createCourse.jsx";
import LessonsComponent from "./components/miniComponents/LessonsComponent.jsx";
import UserSettings from "./components/miniComponents/UserSettings.jsx";
import InstructorDashboard from "./components/miniComponents/InstructorDashboard.jsx";
import UserDashboard from "./components/miniComponents/UserDashboard.jsx";
import CoursePage from "./components/mainComponents/CoursePage.jsx";
import EnrolledCoursePage from "./components/mainComponents/EnrolledCoursePage.jsx"
// const errorLink = onError(({ graphqlErrors, networkError }) => {
//   if (graphqlErrors) {
//     graphqlErrors.map(({ message, location, path }) => {
//       alert(`GraphQL error ${message}`);
//       console.log("hi");
//     });
//   }
// });

// const link = from([
//   errorLink,
//   new HttpLink({ uri: "http://localhost:3003/graphql" }),
// ]);

const client = new ApolloClient({
  uri: "https://kaizen-esque.onrender.com/graphql",
  cache: new InMemoryCache(),
  name: "web-workshop-client",
  version: "0.1",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeDefault />,
      },
      {
        path: "Courses",
        element: <CoursesContainer />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Signup",
        element: <Signup />,
      },
      {
        path: "LearnMore",
        element: <LearnMore />,
      },
      {
        path: "Profile",
        element: <ProfilePage />,
      },
      {
        path: "Checkout",
        element: <Checkout />,
      },
      {
        path: "createCourse",
        element: <CreateCourse />,
      },
      {
        path: "LessonsComponent",
        element: <LessonsComponent />,
      },
      {
        path: "UserSettings",
        element: <UserSettings />,
      },

      {
        path: "User-dashboard",
        element: <UserDashboard />,
      },

      {
        path: "Instructor-dashboard",
        element: <InstructorDashboard />,
      },
      {
        path: `CreateCourse`,
        element: <createCourse />,
      },
      {
        path: `Course/:id`,
        element: <CoursePage />,
      },
      { path: "EnrolledCourse/:id", element:<EnrolledCoursePage/>  },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
