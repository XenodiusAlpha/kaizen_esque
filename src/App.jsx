import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/mainComponents/Header'
import NavBar from './components/mainComponents/NavBar'
import Footer from './components/mainComponents/Footer'

function App() {
  return (
    <div>
      <div><Header/></div>
      <><NavBar/></>
      <div className='Outlet-Style'><Outlet/></div>
      <><Footer/></>
    </div>
  );
}

export default App;
