import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Script from 'dangerous-html/react';
import './navbar.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const history = useHistory();

  const userProfile = {
    name: 'Yousafali EA',
    profilePicture: '/WhatsApp Image 2023-08-21 at 1.12.10 PM.jpeg',
  };

  const handleProfileClick = () => {
    history.push('/user-profile');
  };

  return (
    <header className="navbar-navbar" style={{backgroundColor:'#000'}}>
      <div className="navbar-desktop">
        <div className="navbar-main">
          <div className="navbar-branding">
            <Link to="/" className="navbar-navlink">
              <img
                alt="Cash Exchange Logo"
                // src="/finExchange.png"
                src='/finExchangeBW.png'
                className="navbar-finbest"
                style={{height:'50px'}}
              />
            </Link>
          </div>
          <div className="navbar-links">
            <Link to="/" className="link1">
            My requests
            </Link>
            <Link to="/" className="link2">
            Incomming requests
            </Link>
            <Link to="/" className="link3">
            Chats
            </Link>
            <Link to="/" className="link4">
            Set Location
            </Link>
          </div>
        </div>
        <div className="navbar-quick-actions">
          {isLoggedIn ? (
            <div className="navbar-user-info" onClick={handleProfileClick}>
              <img
                alt="User Profile"
                src={userProfile.profilePicture}
                className="navbar-user-pic"
              />
              <span className="navbar-user-name">{userProfile.name}</span>
            </div>
          ) : (
            <Link to="/" className="navbar-navlink1">
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
          Incomming requests
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
      // On openButton click, set the mobileMenu position left to -100vw
      openButton.addEventListener("click", function () {
        mobileMenu.style.transform = "translateX(0%)";
      });

      // On closeButton click, set the mobileMenu position to 0vw
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
