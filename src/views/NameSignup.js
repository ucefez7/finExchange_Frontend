import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import './NameSignup.css';
import Footer from '../components/footer';
import Announcement from '../components/announcement';

const NameSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleNext = async () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      try {
        const phoneNumber = localStorage.getItem('phoneNumber'); // Assume phone number is stored in localStorage
        const response = await Axios.post('http://localhost:8000/name', {
          phoneNumber,
          firstName,
          lastName,
        });
        
        if (response.status === 200) {
          history.push('/'); // Redirect to the home page or any other page
        } else {
          setError(response.data.error || 'Failed to update name.');
        }
      } catch (error) {
        console.error('Error updating name:', error);
        setError(error.response?.data?.error || 'An error occurred. Please try again.');
      }
    } else {
      setError('Please fill out both fields.');
    }
  };

  const handleBack = () => {
    history.push('/email');
  };

  return (
    <div className="name-signup-container">
      <div id="notification" className="home-notification">
        <Link to="/">
          <Announcement
            rootClassName="announcement-root-class-name"
            className="home-component"
          />
        </Link>
      </div>
      <header className="navbar-navbar" style={{border:'0.001rem solid white'}}>
        <div className="navbar-desktop">
          <div className="navbar-main">
            <div className="navbar-branding">
              <Link to="/" className="navbar-navlink">
                <img alt="Cash Exchange Logo" src="/finExchange.png" className="navbar-finbest" />
              </Link>
            </div>
          </div>
          <div className="navbar-quick-actions">
            <Link to="/login" className="navbar-sign-up-btn" style={{ color: 'black' }}>
              Get Started Now
            </Link>
          </div>
        </div>
      </header>
      <main className="name-signup-main">
        <div className="name-signup-form-container">
          <h1>Enter your name</h1>
          <p>Provide your first and last name to complete the registration</p>
          <form className="name-signup-form">
            <div className="name-input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="name-input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button
                type="button"
                className="back-btn"
                onClick={handleBack}
              >
                <svg className="arrrow-icon back-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 5 5 12 12 19"/>
                </svg>
              </button>
              <button
                type="button"
                className="next-btn"
                style={{ backgroundColor: firstName.trim() !== '' && lastName.trim() !== '' ? '#000' : '#e0e0e0', color: firstName.trim() !== '' && lastName.trim() !== '' ? '#fff' : '#000' }}
                onClick={handleNext}
              >
                Next <svg className="arrrow-icon next-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NameSignup;
