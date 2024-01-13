<<<<<<< HEAD
import { Outlet } from "react-router-dom";
import "./App.css";
import "./assets/css/navbar.css";
import "./assets/css/footer.css";
import "./assets/css/login.css";
import "./assets/css/header.css";
import Header from "./components/mainComponents/Header";
import NavBar from "./components/mainComponents/NavBar";
import Footer from "./components/mainComponents/Footer";
=======
import { Outlet } from 'react-router-dom';
import './App.css';
import './assets/css/navbar.css'
import './assets/css/footer.css'
import './assets/css/login.css'
import './assets/css/header.css'
import './assets/css/signup.css'
import './assets/css/home.css'
import './assets/css/profile.css'
import Header from './components/mainComponents/Header'
import NavBar from './components/mainComponents/NavBar'
import Footer from './components/mainComponents/Footer'
>>>>>>> 55855a22c2d586fc80c17798c95d8575053008c6

function App() {
  return (
    <div>
      <>
        <Header />
      </>
      <>
        <NavBar />
      </>
      <>
        <Outlet />
      </>
      <>
        <Footer />
      </>
    </div>
  );
}

export default App;
