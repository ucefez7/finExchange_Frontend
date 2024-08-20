import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Script from 'dangerous-html/react';
import './navbar.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const Navbar1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profilePicture: '/WhatsApp Image 2023-08-21 at 1.12.10 PM.jpeg',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log("UserId from local storage:", userId);
        
        if (userId) {
          // Fetch user data from the backend
          const response = await fetch(`http://localhost:8000/user/${userId}`);
          console.log("Evde indd ath" +response);
          
          const data = await response.json();
          
          if (response.ok) {
            console.log("Fetched user data:", data);
            // Update state with user data
            setUserProfile({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phoneNumber: data.phoneNumber,
              // Add other fields as needed
            });
          } else {
            console.error("Failed to fetch user data:", data.error);
          }
        } else {
          console.log("No userId found in local storage.");
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);
  
  
  
  // const [userProfile, setUserProfile] = useState({
  //   name: '',
  //   firstName: 'Yousafali',
  //   profilePicture: '/WhatsApp Image 2023-08-21 at 1.12.10 PM.jpeg',
  // });

  const handleProfileClick = () => {
    history.push('/user-profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    history.push('/login');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeModal();
  };

  return (
    <header className="navbar-navbar" style={{ backgroundColor: '#000' }}>
      <div className="navbar-desktop">
        <div className="navbar-main">
          <div className="navbar-branding">
            <Link to="/" className="navbar-navlink">
              <img
                alt="Cash Exchange Logo"
                src='/finExchangeBW.png'
                className="navbar-finbest"
                style={{ height: '50px' }}
              />
            </Link>
          </div>
          <div className="navbar-links">
            <Link to="/" className="link1">
              My requests
            </Link>
            <Link to="/" className="link2">
              Incoming requests
            </Link>
            <Link to="/" className="link3">
              Chats
            </Link>
            <Link to="/" className="link4">
              Set Location
            </Link>
          </div>

          <button onClick={openModal} className="navbar-logout-btn" style={{ backgroundColor: 'white' }}>
            Logout
          </button>
        </div>
        <div className="navbar-quick-actions">
          {isLoggedIn ? (
            <div className="navbar-user-info" onClick={handleProfileClick}>
              <img
                alt="User Profile"
                src={userProfile.profilePicture}
                className="navbar-user-pic"
              />
              {/* <span className="navbar-user-name">{userProfile.name}</span> */}
              <span className="navbar-user-name">{userProfile.firstName}</span>
            </div>
          ) : (
            <Link to="/login" className="navbar-navlink1">
              <div className="navbar-sign-up-btn">
                <span className="navbar-sign-up">Get Started</span>
              </div>
            </Link>
          )}
          <img
            id="open-mobile-menu"
            alt="Open Mobile Menu"
            src="/pastedimage-8o98.svg"
            className="navbar-hamburger-menu"
          />
        </div>
      </div>

      {/* Modal for logout confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={{backgroundColor:'black'}}>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button onClick={confirmLogout} className="confirm-logout-btn">Confirm</button>
              <button onClick={closeModal} className="cancel-logout-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div id="mobile-menu" className="navbar-mobile">
        <div className="navbar-top">
          <img
            alt="Cash Exchange Mobile Image"
            src="/pastedimage-cx4wqj.svg"
            className="navbar-image"
          />
          <svg
            id="close-mobile-menu"
            viewBox="0 0 1024 1024"
            className="navbar-icon"
          >
            <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
          </svg>
        </div>
        <div className="navbar-links1">
          <Link to="/" className="navbar-navlink2">
            My requests
          </Link>
          <Link to="/" className="navbar-navlink3">
            Incoming requests
          </Link>
          <Link to="/" className="navbar-navlink4">
            Chats
          </Link>
          <Link to="/" className="navbar-navlink5">
            Set Location
          </Link>
          <div className="navbar-buttons">
            <Link to="/" className="navbar-navlink6">
              <div className="navbar-btn">
                <span className="navbar-text">Log in</span>
              </div>
            </Link>
            <Link to="/" className="navbar-navlink7">
              <div className="navbar-btn1">
                <span className="navbar-text1">Sign up</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="navbar-container1">
          <Script
            html={` <script defer>
    /*
    Mobile menu - Code Embed
    */

    // Mobile menu
    const mobileMenu = document.querySelector("#mobile-menu");

    // Buttons
    const closeButton = document.querySelector("#close-mobile-menu");
    const openButton = document.querySelector("#open-mobile-menu");

    if (mobileMenu && closeButton && openButton) {
      openButton.addEventListener("click", function () {
        mobileMenu.style.transform = "translateX(0%)";
      });

      closeButton.addEventListener("click", function () {
        mobileMenu.style.transform = "translateX(100%)";
      });
    }
  </script>`}
          ></Script>
        </div>
      </div>
    </header>
  );
};

export default Navbar1;
