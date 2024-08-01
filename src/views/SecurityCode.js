import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import './SecurityCode.css';
import Footer from '../components/footer';
import Announcement from '../components/announcement';

const SecurityCode = () => {
  const [securityCode, setSecurityCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      history.push('/name');
    }
  }, [history]);

  const handleSubmit = async () => {
    if (securityCode.length !== 6 || isNaN(securityCode)) {
      setError('Security code must be a 6-digit number.');
      return;
    }
    if (securityCode !== confirmCode) {
      setError('Security codes do not match.');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:8000/security-code', { userId, securityCode: Number(securityCode) });
      if (response.status === 200) {
        history.push('/');
      } else {
        setError(response.data.error || 'Failed to verify security code.');
      }
    } catch (error) {
      console.error('Error verifying security code:', error);
      setError(error.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div id="notification" className="home-notification">
        <Link to="/">
          <Announcement
            rootClassName="announcement-root-class-name"
            className="home-component"
          />
        </Link>
      </div>
      <header className="navbar-navbar">
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
      <main className="signup-main">
        <div className="signup-form-container">
          <h2>Enter Security Code</h2>
          <p>Please enter and confirm your 6-digit security code</p>
          <form className="signup-form">
            <div className="code-input-group">
              <label htmlFor="securityCode">Security Code</label>
              <input
                type="text"
                id="securityCode"
                placeholder="Enter 6-digit code"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                maxLength="6"
                pattern="\d*"
              />
            </div>
            <div className="code-input-group">
              <label htmlFor="confirmCode">Confirm Security Code</label>
              <input
                type="text"
                id="confirmCode"
                placeholder="Re-enter 6-digit code"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                maxLength="6"
                pattern="\d*"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group1">
              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityCode;
