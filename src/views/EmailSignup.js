import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './EmailSignup.css';
import Axios from 'axios';
import Footer from '../components/footer';
import Announcement from '../components/announcement';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleNext = async () => {
    if (email.trim() !== '') {
      try {
        const phoneNumber = localStorage.getItem('phoneNumber');
        console.log('PhoneNumber:', phoneNumber, 'Email:', email);

        const response = await Axios.post('http://localhost:8000/email', {
          phoneNumber,
          email,
        });

        if (response.status === 200) {
          console.log('Email updated successfully');
          history.push('/name');
        } else {
          console.error('Failed to update email:', response.data.error);
        }
      } catch (error) {
        console.error('Error updating email:', error);
      }
    }
  };

  const handleBack = () => {
    history.push('/login');
  };

  return (
    <div className="email-signup-container">
      <div id="notification" className="home-notification">
        <Link to="/">
          <Announcement rootClassName="announcement-root-class-name" className="home-component" />
        </Link>
      </div>
      <header className="navbar-navbar" style={{ border: '0.001rem solid white' }}>
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
      <main className="email-signup-main">
        <div className="email-signup-form-container">
          <h1>Enter your email address</h1>
          <p>Add your email to aid in account recovery</p>
          <form className="email-signup-form">
            <div className="email-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="button" className="back-btn" onClick={handleBack}>
                <svg
                  className="arrrow-icon back-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 5 5 12 12 19" />
                </svg>
              </button>
              <button
                type="button"
                className="next-btn"
                style={{ backgroundColor: email.trim() !== '' ? '#000' : '#e0e0e0', color: email.trim() !== '' ? '#fff' : '#000' }}
                onClick={handleNext}
              >
                Next
                <svg
                  className="arrrow-icon next-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
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

export default EmailSignup;
