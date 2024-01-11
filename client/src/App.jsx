import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/mainComponents/Header";
import NavBar from "./components/mainComponents/NavBar";
import Footer from "./components/mainComponents/Footer";

function App() {
  return (
    <div className="Outlet-Style">
      <div>
        <Header />
      </div>
      <>
        <NavBar />
      </>
      <div>
        <Outlet />
      </div>
      <>
        <Footer />
      </>
    </div>
  );
}

export default App;
