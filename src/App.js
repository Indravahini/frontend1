import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import Product from './Product';
import Stock from './Stock';
import AddItem from './AddItem';
import AddStock from './AddStock';
import UpdateStock from './UpdateStock';
import UpdateItem from './UpdateItem';
import Logout from './Logout';
import RequestPage from './RequestPage';
import Department from './department';
import Login from './login.js';
import Register from './register.js';

import View from './view';
import './App.css'; 
import Dashboard from './Dashboard';

function App() {
  const navigate = useNavigate(); // Use the navigate hook

  const LandingPage = () => {
    const [overlayVisible, setOverlayVisible] = useState(true);

    useEffect(() => {
      // Set a timeout to hide the overlay after 1.5 seconds
      const timer = setTimeout(() => {
        setOverlayVisible(false);
      }, 1500); // Adjust the time based on the animation duration

      return () => clearTimeout(timer);
    }, []);

    const imgSlider = (imgSrc) => {
      const img = document.querySelector('.starbucks');
      if (img) img.src = imgSrc;
    };

   
    const handleLoginClick = () => {
      navigate('/login');
    };

    const handleExploreClick = () => {
      navigate('/view');
    };

    

    return (
      <>
      <div className='appfr'>
        <div className={`overlay ${!overlayVisible ? 'fade-out' : ''}`}></div>
        <section>
          <div className="circle"></div>
          <header>
            <a href="#">
              <img
                src="https://sairamgroup.in/wp-content/themes/sairamgroup/images/logo.gif"
                className="logo"
                alt="Logo"
              />
            </a>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            <div className='log-btn'>  <button className='button' onClick={handleLoginClick}>LOG IN</button></div>
            </ul>
          </header>
          <div className="containers">
            <div className="text-boxs">
              <h2>
                <br /> Product Hub <span></span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor modi consequatur nulla, fugit odit rerum quaerat illo at! Nihil velit tempore debitis. Doloribus quasi perspiciatis fuga nulla aspernatur necessitatibus adipisci.
              </p>
              <a onClick={handleExploreClick}>Explore</a>
            </div>
            <div className="img-box">
              <img
                src="https://sairamincubation.com/_next/image?url=%2Fincubator-logo.png&w=3840&q=75"
                alt="incubation"
              />
            </div>
          </div>
          <ul className="thumb">
            <li>
              
            </li>
            <li>
              <img
                
                onClick={() => {
                  imgSlider('https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/img2.png');
                  
                }}
                
              />
            </li>
            <li>
              
            </li>
          </ul>
          <ul className="social">
            <li>
              <a href="#">
                <img
                  src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/facebook.png"
                  alt="Facebook"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/instagram.png"
                  alt="Instagram"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/twitter.png"
                  alt="Twitter"
                />
              </a>
            </li>
          </ul>
        </section></div>
      </>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/view" element={<View />} />
        <Route path="/product" element={<Product />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/stocks/createStock" element={<AddStock />} />
        <Route path="/create" element={<AddItem />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/update/:id" element={<UpdateItem />} />
        <Route path="/updateStock/:id" element={<UpdateStock />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/department" element={<Department />} />
      </Routes>
    </div>
  );
}

export default App;
