import React, { useState } from 'react';
import './userProfile.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse, faLocationCrosshairs, faLocationArrow, faMessage, faSackDollar, faMoneyCheckDollar, faUser, faBars} from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  let history = useHistory();

  const goToHome = () => {
    history.push('/');
  };

  const [user, setUser] = useState({
    profilePic: "/WhatsApp Image 2023-08-21 at 1.12.10 PM.jpeg",
    firstName: "Yousafali",
    lastName: "E A",
    phone: "+91 7736797483",
    email: "yousafalieamonu@gmail.com",
    city: "Thrissur",
    state: "Kerala",
    country: "India",
    upiId: "yousafaliea@okhdbank",
    upiPhone: "",
    pin: "",
    confirmPin: "",
    referralCode: "ABC123", // Sample referral code
    applyReferral: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode).then(() => {
      alert('Referral code copied to clipboard');
    });
  };

  return (
    <div className="profile-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/finExchangeBW.png" alt="Logo" className="logo" onClick={goToHome} />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={goToHome}><FontAwesomeIcon icon={faHouse} className="hom-icon" /> Home</li>
            <li><FontAwesomeIcon icon={faLocationCrosshairs} className="location-icon" /> Set Location</li>
            <li><FontAwesomeIcon icon={faLocationArrow} className="request-icon"/> My Requests</li>
            <li><FontAwesomeIcon icon={faMessage} className="msg-icon" /> Messages</li>
            <li><FontAwesomeIcon icon={faSackDollar} className="u2c-icon"/> Incoming U2C</li>
            <li><FontAwesomeIcon icon={faMoneyCheckDollar} className="c2u-icon" /> Incoming C2U</li>
            {/* <li><FontAwesomeIcon icon={faUser} className="profile-icon"/> User Profile</li> */}
            <li style={{ display: 'flex', alignItems: 'center' }}>
        <img src={user.profilePic} className='profile-img' style={{width: '25px', height: '25px', marginRight: '8px'}} alt="Profile"/>
        User Profile</li>
            </ul><ul><div className='seticon'>
            <li><FontAwesomeIcon icon={faBars} className="settings-icon"/> Account Settings</li></div>
          </ul>
        </nav>
      </aside>
      <main className="profile-main">
        <div className="profile-header">
          <h1></h1>
        </div>
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-info">
              <img src={user.profilePic} alt="Profile" className="profile-pic" />
              <div className="profile-details">
                <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
                <p className="profile-email"><FontAwesomeIcon icon={faEnvelope} className="email-icon" /> {user.email}</p>
              </div>
            </div>
            <div className="upi-section">
              <h3>UPI & Authentcation</h3>
              <div className="form-group">
                <input placeholder='UPI ID/UPI Phone Number' type="text" name="upiPhone" value={user.upiPhone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input placeholder='Enter 6 Digit Authentication Pin' type="text" name="otp" value={user.pin} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input placeholder='Re-enter Authentication Pin' type="text" name="confirmOtp" value={user.confirmPin} onChange={handleChange} />
              </div>
              <button type="button" className="update-button">Update Credentials</button>
            </div>


  <div className="referral-section">
  <h2>Referral Rewards</h2>
  <div className="form-group referral-group">
    <label>Your Referral Code</label>
    <div className="referral-code-container">
      <input type="text" value={user.referralCode} readOnly />
      <button type="button" className="copy-button" onClick={copyReferralCode}>Copy</button>
    </div>
  </div>
  <div className="form-group">
    <label>Apply Referral Code</label>
    <div className="apply-referral-container">
      <input placeholder='Enter Referral Code' type="text" name="applyReferral" value={user.applyReferral} onChange={handleChange} />
      <button type="button" className="apply-button">Apply</button>
    </div>
  </div>
</div></div>

          <div className="profile-form">
            <h2>Edit Profile</h2>
            <form>
              <div className="form-group">
                <input type="text" name="firstName" placeholder='First Name' value={user.firstName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="lastName" placeholder='Last Name' value={user.lastName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="phone" placeholder='Phone Number' value={user.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder='Email Address' value={user.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="city" placeholder='City' value={user.city} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="state" placeholder='State/County' value={user.state} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="country" placeholder='Country' value={user.country} onChange={handleChange} />
              </div>
              <button type="submit" className="update-button">Update Profile</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
