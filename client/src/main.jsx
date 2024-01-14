import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomeDefault from './components/mainComponents/HomeDefault.jsx'
import Courses from './components/mainComponents/Courses.jsx'
import Login from './components/mainComponents/Login.jsx'
import LearnMore from './components/mainComponents/LearnMore.jsx'
import Signup from './components/UI/Signup.jsx'
import ProfilePage from './components/UI/ProfilePage.jsx'
import Checkout from './components/UI/Checkout.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeDefault />,
      },
      {
        path: 'Courses',
        element: <Courses />,
      },
      {
        path: 'Login',
        element: <Login />,
      },
      {
        path: 'Signup',
        element: <Signup />,
      },
      {
        path: 'LearnMore',
        element: <LearnMore />,
      },
      {
        path: 'Profile',
        element: <ProfilePage />,
      },
      {
        path: 'Checkout',
        element: <Checkout />,
      },
      // {
      //   path: 'createCourse',
      //   element: <CreateCourse />,
      // },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

