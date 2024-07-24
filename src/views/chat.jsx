import React, { useState } from 'react';
import './chat.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse, faLocationCrosshairs, faLocationArrow, faMessage, faSackDollar, faMoneyCheckDollar, faUser, faBars} from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  let history = useHistory();

  const goToHome = () => {
    history.push('/');
  };
  const goToProfile = () => {
    history.push('/user-profile');
  };

  const [user, setUser] = useState({
    logoImg: "/Screenshot 2024-07-23 153250.png",
    profilePic: "/WhatsApp Image 2023-08-21 at 1.12.10 PM.jpeg",
    firstName: "Yousafali",
    lastName: "E A",
  });


  return (
    <div className="profile-page">
      <aside className="sidebaar">
        <div className="sidebar-heaader">
          <img src={user.logoImg} alt="Logo" className="logoImg" onClick={goToHome} />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={goToHome}><FontAwesomeIcon icon={faHouse} className="hom-icoon" /></li>
            <li><FontAwesomeIcon icon={faLocationCrosshairs} className="location-icoon" /></li>
            <li><FontAwesomeIcon icon={faLocationArrow} className="request-icoon"/></li>
            <li><FontAwesomeIcon icon={faMessage} className="msg-icoon" /> </li>
            <li><FontAwesomeIcon icon={faSackDollar} className="u2c-icoon"/></li>
            <li><FontAwesomeIcon icon={faMoneyCheckDollar} className="c2u-icoon" /></li>
            {/* <li><FontAwesomeIcon icon={faUser} className="profile-icon"/> User Profile</li> */}
            <li onClick={goToProfile} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={user.profilePic} className='profile-imgg' style={{width: '25px', height: '25px', marginRight: '8px'}} alt="Profile"/></li>
            </ul><ul><div className='seticon'>
            <li><FontAwesomeIcon icon={faBars} className="settings-icoon"/></li></div>
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
                <h5 className="profile-name">{user.firstName} {user.lastName}</h5>
              </div>
            </div>
  <div className="referral-section">
  <h4>Messages</h4>
  <div className="form-group referral-group">
  </div>
</div></div>




<div className="aprofile-card">
            <div className="aprofile-info">
              <img src={user.profilePic} alt="Profile" className="aprofile-pic" />
              <div className="profile-details">
                <h5 className="aprofile-name">{user.firstName} {user.lastName}</h5>
              </div>
            </div>
  <div className="referral-section">
  <div className="form-group referral-group">
  </div>
  <div className="form-group">
    <div className="apply-referral-container">
      <input placeholder='Enter message' type="text" name="applyReferral" />
      <button type="button" className="apply-button">Send</button>
    </div>
  </div>
</div></div>



        </section>
      </main>



    </div>
  );
};

export default Chat;
