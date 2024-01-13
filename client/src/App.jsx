import { Outlet } from "react-router-dom";
import "./App.css";
import "./assets/css/navbar.css";
import "./assets/css/footer.css";
import "./assets/css/login.css";
import "./assets/css/header.css";
import Header from "./components/mainComponents/Header";
import NavBar from "./components/mainComponents/NavBar";
import Footer from "./components/mainComponents/Footer";

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
