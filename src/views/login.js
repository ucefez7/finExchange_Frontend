import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Modal from 'react-modal';
import './login.css';
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import Announcement from '../components/announcement';
import Axios from 'axios';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

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

  const handleContinueClick = async () => {
    if (!phone || phone.length < 10) {
      console.error('Invalid phone number:', phone);
      return;
    }

    try {
      setIsLoading(true);
      const formattedPhoneNumber = phone.startsWith('+') ? phone : `+${phone}`;
      console.log('Formatted Phone Number:', formattedPhoneNumber); // Debug statement
      await Axios.post('http://localhost:8000/mobile', { number: formattedPhoneNumber });
      setIsOtpModalOpen(true);
      setOtpTimer(30);
      setResendTimer(60);
      setCanResend(false);
      setOtpError('');
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    const value = e.target.value.replace(/\D/, '');
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await Axios.post('http://localhost:8000/otp', { otp: otp.join(''), userNumber: phone });
      if (response.data.valid) {
        localStorage.setItem('userId', response.data.userId);
        if (response.data.newUser) {
          history.push(response.data.redirect);
        } else {
          history.push(response.data.redirect);
          // history.push('/');
        }
      } else {
        setOtpError('Expired or invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('An error occurred while verifying OTP.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleResendOtp = async () => {
    if (canResend) {
      setOtpTimer(30);
      setResendTimer(30);
      setCanResend(false);
      setOtpError('');
      try {
        await Axios.post('http://localhost:8000/mobile', { number: phone });
      } catch (error) {
        console.error('Error resending OTP:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <div id="notifcation" className="home-notification">
        <Link to="/">
          <Announcement rootClassName="announcement-root-class-name" className="home-component"></Announcement>
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
                  onChange={setPhone}
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
              className={`continue-button ${isLoading ? 'loading' : ''}`} // Apply loading class conditionally
              onClick={handleContinueClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin style={{ color: 'blue', fontSize: '1.5rem' }} />
              ) : (
                'Continue'
              )}
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
        <div className="otp-header">
          <h2>Enter the 6 digit code</h2>
        </div>
        <Link to="/login" className="change-mobile-number" onClick={() => setIsOtpModalOpen(false)}>
          Change your mobile number
        </Link>
        <form onSubmit={handleOtpSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength="1"
                className="otp-input"
                disabled={isLoading}
              />
            ))}
          </div>
          {otpError && <p className="otp-error">{otpError}</p>}
          <button
            type="submit"
            className={`confirm-button ${isLoading ? 'loading' : ''}`} // Apply loading class conditionally
            disabled={isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin style={{ color: 'blue', fontSize: '1.5rem' }} />
            ) : (
              'Confirm'
            )}
          </button>
          <button type="button" className="resend-button" onClick={handleResendOtp} disabled={!canResend || isLoading}>
            {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
          </button>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default Login;
