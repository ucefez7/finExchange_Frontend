import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Modal from 'react-modal';
import './login.css';
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import Announcement from '../components/announcement';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);

  const history = useHistory(); // Initialize history

  useEffect(() => {
    if (otpTimer > 0) {
      const timerId = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [otpTimer]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  useEffect(() => {
    setIsContinueDisabled(otp.some(digit => digit === ''));
  }, [otp]);

  const handleContinueClick = () => {
    setIsOtpModalOpen(true);
    setOtpTimer(30);
    setResendTimer(60);
    setCanResend(false);
    // Simulate sending OTP to the user
    sendOtp();
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    const value = e.target.value.replace(/\D/, ''); // Only allow digits
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus on next input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    setIsOtpModalOpen(false);
    // Redirect to /email route
    history.push('/email');
  };

  const handleResendOtp = () => {
    if (canResend) {
      setOtpTimer(30);
      setResendTimer(30);
      setCanResend(false);
      // Simulate resending OTP to the user
      sendOtp();
    }
  };

  const sendOtp = () => {
    // Simulate an API call to send OTP
    console.log('Sending OTP to the phone number:', phone);
  };

  return (
    <div className="login-container">
      <div id="notifcation" className="home-notification">
        <Link to="/">
          <Announcement
            rootClassName="announcement-root-class-name"
            className="home-component"
          ></Announcement>
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
            <img id="open-mobile-menu" alt="Open Mobile Menu" src="/pastedimage-8o98.svg" className="navbar-hamburger-menu" />
          </div>
        </div>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <form className="login-form">
            <div className="login-input-group">
              <div className="login-input-txt">
                <label htmlFor="phone">Enter your mobile number</label>
              </div>
              <div className="phone-input-wrapper">
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={phone => setPhone(phone)}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true,
                    className: 'phone-input'
                  }}
                />
                <FontAwesomeIcon icon={faUser} className="phone-input-icon" />
              </div>
            </div>
            <button
              type="button"
              className="login-btn"
              style={{ backgroundColor: 'black' }}
              onClick={handleContinueClick}
            >
              Continue
            </button>
          </form>

          <div className="login-options">
            <hr className="divider" />

            <button className="login-btn google-login">
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
              Continue with Google
            </button>
            <button className="login-btn apple-login">
              <FontAwesomeIcon icon={faApple} className="apple-icon" />
              Continue with Apple
            </button>
            <button className="login-btn email-login">
              <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
              Continue with email
            </button>
            <hr className="divider" />
            <a href="/forgot-password" className="login-forgot-password">
              Find my account
            </a>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isOtpModalOpen}
        onRequestClose={() => setIsOtpModalOpen(false)}
        contentLabel="OTP Verification"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className='otp-header'>
          <h2>Enter the 4 digit code</h2>
        </div>
        <Link to="/login" className="change-mobile-number" onClick={() => setIsOtpModalOpen(false)}>
          Change your mobile number
        </Link>
        <form onSubmit={handleOtpSubmit} className="otp-form">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              className="otp-input"
            />
          ))}
          <button
            type="submit"
            className="login-btn"
            style={{ backgroundColor: 'black' }}
            disabled={isContinueDisabled}
          >
            Confirm
          </button>
        </form>
        <div className="otp-timer">
          {resendTimer > 0 ? (
            <span>Resend code in {resendTimer} seconds</span>
          ) : (
            <button onClick={handleResendOtp} disabled={!canResend}>
              Resend Code by SMS
            </button>
          )}
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default Login;