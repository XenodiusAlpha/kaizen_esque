import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeDefault from "./components/mainComponents/HomeDefault.jsx";
import Courses from "./components/mainComponents/Courses.jsx";
import Login from "./components/mainComponents/Login.jsx";
import LearnMore from "./components/mainComponents/LearnMore.jsx";
import CoursePage from "./components/miniComponents/CoursePage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

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
        element: <Courses />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "LearnMore",
        element: <LearnMore />,
      },
      {
        path: "CoursePage",
        element: <CoursePage />,
      },
      // {
      //   path: 'createCourse',
      //   element: <CreateCourse />,
      // },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
