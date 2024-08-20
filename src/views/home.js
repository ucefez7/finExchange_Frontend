import React from "react";
import { Link, useHistory } from "react-router-dom";

import Script from "dangerous-html/react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

import Announcement from "../components/announcement";
import Navbar1 from "../components/navbar1";
import Navbar from "../components/navbar";
import Highlight from "../components/highlight";
import Point from "../components/point";
import Accordion from "../components/accordion";
import Feature from "../components/feature";
import Check from "../components/check";
import Quote from "../components/quote";
import Footer from "../components/footer";
import "./home.css";
import GooglePayButton from '@google-pay/button-react';
import Axios from 'axios'; // Import Axios for API calls

const Home = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("U2C");
  const [u2cAmount, setU2CAmount] = useState("");
  const [c2uAmount, setC2UAmount] = useState("");
  const [u2cCurrentLocation, setU2CCurrentLocation] = useState(false);
  const [c2uCurrentLocation, setC2UCurrentLocation] = useState(false);
  const [u2cNotes, setU2CNotes] = useState("");
  const [c2uNotes, setC2UNotes] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(["", "", "", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [status, setStatus] = useState("noExchange");

  const [userExists, setUserExists] = useState(false);

  const history = useHistory();

  

  const verifyUser = async () => {
    const userId = localStorage.getItem('userId');
    console.log("user id ethaann"+userId);
    
    if (!userId) {
      console.error('No userId found in localStorage');
      return;
    }
  
    try {
      const response = await Axios.post('http://localhost:8000/verify-user', { userId });
      if (response.data.exists) {
        console.log('User exists');
        setUserExists(true);
        history.push(response.data.redirect);
      } else {
        console.log('User does not exist');
        // Handle user not existing
      }
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };
  
  useEffect(() => {
    verifyUser();
  }, []);
  


  const handleLogin = (userId) => {
    localStorage.setItem('userId', userId);
    setUserExists(true);
    history.push('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserExists(false);
    history.push('/');
  };

  const statusMapping = {
    noExchange: { text: "No active Exchange", color: "#ADE2DF" },
    pending: { text: "Pending Exchange", color: "yellow" },
    active: { text: "Active Exchange", color: "green" },
    completed: { text: "Completed Exchange", color: "blue" },
    failed: { text: "Failed Exchange", color: "red" },
    cancelled: { text: "Cancelled Exchange", color: "gray" },
  };

  const statusText = statusMapping[status].text;
  const statusColor = statusMapping[status].color;

  const u2cSuccessRate = 85;
  const c2uSuccessRate = 90;

  const openModal = (modalType) => {
    setActiveModal(modalType);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openConfirmationModal = () => {
    setIsModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  const handleU2CAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setU2CAmount(value);
    }
  };

  const handleC2UAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setC2UAmount(value);
    }
  };

  const handleU2CCurrentLocationChange = () => {
    setU2CCurrentLocation(!u2cCurrentLocation);
  };

  const handleC2UCurrentLocationChange = () => {
    setC2UCurrentLocation(!c2uCurrentLocation);
  };

  const handleU2CNotesChange = (e) => {
    setU2CNotes(e.target.value);
  };

  const handleC2UNotesChange = (e) => {
    setC2UNotes(e.target.value);
  };

  const handleConfirmationCodeChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...confirmationCode];
      newCode[index] = value;
      setConfirmationCode(newCode);

      // Move to the next input box
      if (value && index < 5) {
        document.getElementById(`confirmation-code-${index + 1}`).focus();
      }
    }
  };

  const handleU2CSubmit = (e) => {
    e.preventDefault();
    openConfirmationModal();
  };

  const handleC2USubmit = (e) => {
    e.preventDefault();
    openConfirmationModal();
  };

  const handleConfirmationSubmit = (e) => {
    e.preventDefault();
    // Handle final submission logic here
    if (activeModal === "U2C") {
      setSuccessMessage("Your U2C Request has been sent Successfully");
    } else {
      setSuccessMessage("Your C2U Request has been sent Successfully");
    }
    closeConfirmationModal();
    setConfirmationCode(["", "", "", "", "", ""]);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  return (
    <div className="home-container">
      <Helmet>
        <title>FinExchange</title>
        <meta name="description" content="Description of the website" />
        <meta property="og:title" content="FinExchange" />
        <meta property="og:description" content="Description of the website" />
      </Helmet>
      <div className="home-hero">
        <header className="home-heading">
          <div id="notifcation" className="home-notification">
            <Link to="/">
              <Announcement
                rootClassName="announcement-root-class-name"
                className="home-component"
              ></Announcement>
            </Link>
          </div>
          {userExists ? <Navbar1 onLogout={handleLogout} /> : <Navbar onLogout={handleLogin} />}
        </header>




        {userExists && (
  <div className="home-content" id="freeTest">
  <div className="home-content-main">
    <h1 className="home-title">
    FinExchange, where cash exchanges are made simple.
    </h1>
    <span className="home-caption">
    Welcome to finExchange! We provide a platform for our users to exchange their UPI money or liquid money
    by making U2C requests for UPI-to-Cash exchanges and C2U requests for Cash-to-UPI exchanges. 
    We facilitate these transactions but do not guarantee that they will be completed or successful.
    </span>
    <div className="home-hero-buttons">
      <div className="home-main-ios-btn" onClick={() => openModal("U2C")}>
        <span className="home-caption1">Make U2C Request</span>
      </div>
      <div
        className="home-main-android-btn"
        onClick={() => openModal("C2U")}
      >
        <span className="home-caption2">Make C2U Request</span>
      </div>
    </div>
  </div>

  <div className="home-content-side">
    <div className="heading">
      <h2>Your activities</h2>
    </div>

    
    <div className="home-success-rates">
      <div className="success-rate">
        <div className="rate-header">
          <h2 className="rate-title">U2C Success Rate</h2>
          <span className="rate-percentage">{u2cSuccessRate}%</span>
        </div>
        <div className="rate-bar">
          <div className="rate-fill" style={{ width: `${u2cSuccessRate}%` }}></div>
        </div>
      </div>
      <div className="success-rate">
        <div className="rate-header">
          <h2 className="rate-title">C2U Success Rate</h2>
          <span className="rate-percentage">{c2uSuccessRate}%</span>
        </div>
        <div className="rate-bar">
          <div className="rate-fill" style={{ width: `${c2uSuccessRate}%` }}></div>
        </div>
      </div>
    </div>

    <div className="home-status">
          <h2>Current status</h2>
          <div className="status-btn" style={{ backgroundColor: statusColor }}>
            <span className="status-text">{statusText}</span>
            <svg className="aarrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>

    <span className="home-caption">
      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. */}
      Please, Track your current cash exchange status and your partner through the status bar above.
    </span>
    <div className="home-hero-buttons">
      <div className="home-side-ios-btn" onClick={() => alert('Most Exchanges')}>
        <span className="home-caption1">Most Exchanges</span>
      </div>

      <div className="home-side-android-btn" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
      <span className="home-caption2">Upgrade to Premium</span>
      </div>

    </div>
  </div>
</div>
        )}




{/* Modal is here */}

{isModalOpen && (
      <div className="modal-overlay">
        <div className="modal1">
          <div className="modal-header">
            <button
              className={`modal-switch-btn ${
                activeModal === "U2C" ? "active" : ""
              }`}
              onClick={() => setActiveModal("U2C")}
            >
              U2C Request
            </button>
            <button
              className={`modal-switch-btn ${
                activeModal === "C2U" ? "active" : ""
              }`}
              onClick={() => setActiveModal("C2U")}
            >
              C2U Request
            </button>
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>
          </div>
          {activeModal === "U2C" && (
            <form onSubmit={handleU2CSubmit}>
              <div className="modal-body">
                <label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={u2cAmount}
                    onChange={handleU2CAmountChange}
                  />
                </label>
                <label className="checkbox-label">
                  Choose live location
                  <input
                    type="checkbox"
                    checked={u2cCurrentLocation}
                    onChange={() =>
                      setU2CCurrentLocation(!u2cCurrentLocation)
                    }
                  />
                  <span className="checkmark"></span>
                </label>
                <label>
                  <textarea
                    placeholder="Additional notes.."
                    value={u2cNotes}
                    onChange={(e) => setU2CNotes(e.target.value)}
                  />
                </label>
              </div>
              <div className="modal-footer">
                <button type="submit">UPI 2 Cash Request</button>
              </div>
            </form>
          )}
          {activeModal === "C2U" && (
            <form onSubmit={handleC2USubmit}>
              <div className="modal-body">
                <label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={c2uAmount}
                    onChange={handleC2UAmountChange}
                  />
                </label>
                <label className="checkbox-label">
                  Choose live location
                  <input
                    type="checkbox"
                    checked={c2uCurrentLocation}
                    onChange={() =>
                      setC2UCurrentLocation(!c2uCurrentLocation)
                    }
                  />
                  <span className="checkmark"></span>
                </label>
                <label>
                  <textarea
                    placeholder="Additional notes.."
                    value={c2uNotes}
                    onChange={(e) => setC2UNotes(e.target.value)}
                  />
                </label>
              </div>
              <div className="modal-footer">
                <button type="submit">Cash 2 UPI Request</button>
              </div>
            </form>
          )}
        </div>
      </div>
    )}

{isConfirmationModalOpen && (
        <div className="modal-overlay">
          <div className="modal2">
            <div className="modal-header">
              <h2>Enter Confirmation Code</h2>
              <button className="modal-close-btn" onClick={closeConfirmationModal}>×</button>
            </div>
            <form onSubmit={handleConfirmationSubmit}>
              <div className="modal-body">
                <div className="confirmation-code-container">
                  {confirmationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`confirmation-code-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleConfirmationCodeChange(e, index)}
                      className="confirmation-code-input"
                      maxLength="1"
                    />
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" disabled={confirmationCode.includes("")}>
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    {successMessage && (
      <div className="success-message">
        <p>{successMessage}</p>
        <button onClick={() => setSuccessMessage("")}>Close</button>
      </div>
    )}
      </div>


      {/* <div className="home-video">
        <div className="home-content02">
          <div className="home-header">
            <h2 className="home-text">
              Built specifically for people who want faster money exchanges
            </h2>
          </div>
          <div className="home-video-container">
            <video
              src="https://www.youtube.com/watch?v=MRQ69XeDxVk"
              loop
              muted
              poster="/pastedimage-v2-900w.png"
              autoPlay
              className="home-video1"
            ></video>
            <div className="home-heading-container">
              <div className="home-heading01">
                <span className="home-text01">
                  Consectetur adipiscing elit, sed do eiusmod tempor
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home-text02">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </div>
              <div className="home-explore">
                <span className="home-text03">Explore pricing plans -&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="home-stats">
        <div className="home-stat">
          <span className="home-caption3">200k +</span>
          <span className="home-description">
          Be part of our two lakhs plus users worldwide.
            <span
              dangerouslySetInnerHTML={{
                __html: " ",
              }}
            />
          </span>
        </div>
        <div className="home-stat1">
          <span className="home-caption4">₹3,5 millions</span>
          <span className="home-description1">
          Over thirty-five lakhs in cash exchanges all over the World.
            <span
              dangerouslySetInnerHTML={{
                __html: " ",
              }}
            />
          </span>
        </div>
        <div className="home-stat2">
          <span className="home-caption5">₹10,000 +</span>
          <span className="home-description2">
          Over ten thousand plus cash exchanges every minute.
            <span
              dangerouslySetInnerHTML={{
                __html: " ",
              }}
            />
          </span>
        </div>
      </div>
      <div className="home-sections">
        <div className="home-section">
          <div className="home-image">
            <div className="home-image-highlight">
              <span className="home-text04">
                <span>
                  always know your in and out
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="home-content03">
            <h2 className="home-text07">Everywhere you get your partner with finExchange</h2>
            <Highlight
              title="Lorem ipsum dolor sit amet, consectetur "
              description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliquat enim ad minim veniam, quis nostrud"
            ></Highlight>
            <Highlight
              title="Lorem ipsum dolor sit amet, consectetur "
              description="Sed do eiusmod tempor incididunt ut labore et dolore"
            ></Highlight>
            <div className="home-explore1">
              <span>Explore pricing plans -&gt;</span>
            </div>
          </div>
        </div>
        <div className="home-section1">
          <div className="home-content04">
            <div className="home-heading02">
              <h2 className="home-text09">Keep track with your all Exchanges</h2>
              <span className="home-text10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </span>
            </div>
            <div className="home-content05">
              <div className="home-points">
                <Point></Point>
                <Point text="Quis nostrud exercitation ullamco"></Point>
                <Point text="Reprehenderit qui in ea voluptate velit"></Point>
              </div>
              <Link to="/" className="home-navlink1">
                <div className="home-get-started">
                  <span className="home-sign-up">Get started now</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="home-image1"></div>
        </div>
        <div className="home-section2">
          <div className="home-image2">
            <div className="home-image-overlay"></div>
          </div>
          <div className="home-content06">
            <h2 className="home-text11">
              <span>Create milestones</span>
              <br></br>
            </h2>
            <Accordion></Accordion>
          </div>
        </div>
      </div>
      <div className="home-banner-container">
        <div className="home-banner">
          <div className="home-overlay">
            <span className="home-text14">
              Begin your financial journey on finExchange
            </span>
            <div className="home-book-btn">
              <span className="home-text15">Book a demo</span>
            </div>
          </div>
          <img
            alt="pastedImage"
            src="/pastedimage-ylke.svg"
            className="home-pasted-image5"
          />
        </div>
      </div>
      <div className="home-features">
        <div className="home-header1">
          <div className="home-tag">
            <span className="home-text16">Features</span>
          </div>
          <div className="home-heading03">
            <h2 className="home-text17">Everything you get with finExchange</h2>
            <span className="home-text18">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </span>
          </div>
        </div>
        <div className="home-feature-list">
          <Feature></Feature>
          <Feature
            title="Multiple Devices"
            thumbnail="/vector6113-r6dl.svg"
          ></Feature>
          <Feature title="Analytics" thumbnail="/vector6113-6zj.svg"></Feature>
          <Feature
            title="Virtual Card"
            thumbnail="/vector6113-lvvs.svg"
          ></Feature>
          <Feature
            title="Safe Exchanges"
            thumbnail="/vector6114-cupp.svg"
          ></Feature>
          <Feature
            title="Milestones"
            thumbnail="/vector6114-6m1e.svg"
          ></Feature>
          <Feature title="Referrals" thumbnail="/vector6114-yjl.svg"></Feature>
          <Feature title="Wallet" thumbnail="/vector6113-lvvs.svg"></Feature>
        </div>
      </div>
      <div className="home-pricing">
        <div className="home-content07">
          <div className="home-header2">
            <div className="home-tag1">
              <span className="home-text19">Pricing plans</span>
            </div>
            <div className="home-heading04" id="pricing">
              <h2 className="home-text20">No setup cost or hidden fees.</h2>
            </div>
          </div>

          
          <div className="home-pricing-plans">
            <div className="home-plans">
              <div className="home-plan">
                <div className="home-top">
                  <div className="home-heading05">
                    <span className="home-text21">Standard</span>
                    <span className="home-text22">
                    Make costfree exchanges under 200 Rupees
                    </span>
                  </div>
                  <div className="home-cost">
                    <span className="home-text23">Free</span>
                  </div>
                </div>
                <div className="home-bottom">
                  <div className="home-check-list">
                  <Check feature="Costfree cash exchanges"></Check>
                    <Check feature="Make Three exchanges per day"></Check>
                    <Check feature="Exchanges under 200 Rupees"></Check>
                    <Check feature="Limited cash exchange plan"></Check>
                  </div>
                  <div className="home-button" onClick={() => document.getElementById('freeTest').scrollIntoView({ behavior: 'smooth' })}>
                    <span className="home-text24">Get started Free</span>
                  </div>
                </div>
              </div>
              <div className="home-plan1">
                <div className="home-top1">
                  <div className="home-heading06">
                    <span className="home-text25">Plus</span>
                    <span className="home-text26">
                    High prority cash exchanges above 200 Rupees
                    </span>
                  </div>
                  <div className="home-cost1">
                    <span className="home-text27">₹39</span>
                    <span className="home-text28">/month</span>
                  </div>
                </div>
                <div className="home-bottom1">
                  <div className="home-check-list1">
                    <Check feature="Available for just 39 Rupees"></Check>
                    <Check feature="High prority cash exchanges"></Check>
                    <Check feature="Monthly upgrading plan"></Check>
                    <Check feature="Make unlimited daily cash exchanges"></Check>
                    <Check feature="Join now with our Plus membership"></Check>
                  </div>


      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA']
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGate'
                }
              }
            }
          ],
          merchantInfo: {
            merchantId: '12345678',
            merchantName: 'FinExchange'
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '39',
            currencyCode: 'INR',
            countryCode: 'IN'
          },
          shippingAddressRequired: true,
          callbackIntents: ['PAYMENT_AUTHORIZATION']
        }}
        onLoadPaymentData={paymentRequest => {
          console.log(paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
          console.log(paymentData);
          return { transactionState: 'SUCCESS' };
        }}
        existingPaymentMethodRequired="false"
        buttonColor="#black"
        buttonType="PAY" // Changed from "Buy" to "Pay"
      />

                </div>
              </div>
              <div className="home-plan2">
                <div className="home-top2">
                  <div className="home-heading07">
                    <span className="home-text30">Premium</span>
                    <span className="home-text31">
                    High prority cash exchanges above 200 Rupees
                    </span>
                  </div>
                  <div className="home-cost2">
                    <span className="home-text32">₹159</span>
                    <span className="home-text33">/yearly</span>
                  </div>
                </div>
                <div className="home-bottom2">
                  <div className="home-check-list2">
                    <Check feature="Available for just 159 Rupees"></Check>
                    <Check feature="High prority cash exchanges"></Check>
                    <Check feature="Yearly upgrading plan"></Check>
                    <Check feature="Make unlimited daily cash exchanges"></Check>
                    <Check feature="Join with our Premium membership"></Check>
                  </div>


                  <div className="google-pay-button-container">
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA']
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGate'
                }
              }
            }
          ],
          merchantInfo: {
            merchantId: '12345678',
            merchantName: 'FinExchange'
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '159',
            currencyCode: 'INR',
            countryCode: 'IN'
          },
          shippingAddressRequired: true,
          callbackIntents: ['PAYMENT_AUTHORIZATION']
        }}
        onLoadPaymentData={paymentRequest => {
          console.log(paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
          console.log(paymentData);
          return { transactionState: 'SUCCESS' };
        }}
        existingPaymentMethodRequired="false"
        buttonColor="black"
        buttonType="PAY" // Changed from "Buy" to "Pay"
      />



                  </div>
                </div>
              </div>
            </div>
            <div className="home-expand">
              <div className="home-overlay1">
                <div className="home-header3">
                  <div className="home-heading08">
                    <span className="home-text35">Expand</span>
                    <span className="home-text36">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </span>
                  </div>
                  <div className="home-check-list3">
                    <div className="home-check">
                      <svg viewBox="0 0 1024 1024" className="home-icon">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="home-text37">
                        Sed ut perspiciatis unde
                      </span>
                    </div>
                    <div className="home-check1">
                      <svg viewBox="0 0 1024 1024" className="home-icon02">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="home-text38">
                        Quis nostrud exercitation ulla
                      </span>
                    </div>
                    <div className="home-check2">
                      <svg viewBox="0 0 1024 1024" className="home-icon04">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="home-text39">
                        Duis aute irure dolor intuit
                      </span>
                    </div>
                  </div>
                </div>
                <div className="home-button3">
                  <span className="home-text40">
                    <span>Contact us</span>
                    <br></br>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="home-plans1">
            <div className="home-plan3">
              <div className="home-top3">
                <div className="home-heading09">
                  <span className="home-text43">Standard</span>
                  <span className="home-text44">
                    Sed ut perspiciatis unde omnis iste natus error sit.
                  </span>
                </div>
                <div className="home-cost3">
                  <span className="home-text45">Free</span>
                </div>
              </div>
              <div className="home-bottom3">
                <div className="home-check-list4">
                  <Check></Check>
                  <Check feature="Quis nostrud exercitation ulla"></Check>
                  <Check feature="Duis aute irure dolor intuit"></Check>
                  <Check feature="Voluptas sit aspernatur aut odit"></Check>
                  <Check feature="Corporis suscipit laboriosam"></Check>
                </div>
                <div className="home-button4">
                  <span className="home-text46">Get Standard</span>
                </div>
              </div>
            </div>
            <div className="home-plan4">
              <div className="home-top4">
                <div className="home-heading10">
                  <span className="home-text47">Plus</span>
                  <span className="home-text48">
                    Sed ut perspiciatis unde omnis iste natus error sit.
                  </span>
                </div>
                <div className="home-cost4">
                  <span className="home-text49">₹40</span>
                  <span className="home-text50">/month</span>
                </div>
              </div>
              <div className="home-bottom4">
                <div className="home-check-list5">
                  <Check></Check>
                  <Check feature="Quis nostrud exercitation ulla"></Check>
                  <Check feature="Duis aute irure dolor intuit"></Check>
                  <Check feature="Voluptas sit aspernatur aut odit"></Check>
                  <Check feature="Corporis suscipit laboriosam"></Check>
                </div>
                <div className="home-button5">
                  <span className="home-text51">Get Plus</span>
                </div>
              </div>
            </div>
            <div className="home-plan5">
              <div className="home-top5">
                <div className="home-heading11">
                  <span className="home-text52">Premium</span>
                  <span className="home-text53">
                    Sed ut perspiciatis unde omnis iste natus error sit.
                  </span>
                </div>
                <div className="home-cost5">
                  <span className="home-text54">₹160</span>
                  <span className="home-text55">/yearly</span>
                </div>
              </div>
              <div className="home-bottom5">
                <div className="home-check-list6">
                  <Check></Check>
                  <Check feature="Quis nostrud exercitation ulla"></Check>
                  <Check feature="Duis aute irure dolor intuit"></Check>
                  <Check feature="Voluptas sit aspernatur aut odit"></Check>
                  <Check feature="Corporis suscipit laboriosam"></Check>
                </div>
                <div className="home-button6">
                  <span className="home-text56">Get Plus</span>
                </div>
              </div>
            </div>
            <div className="home-expand1">
              <div className="home-overlay2">
                <div className="home-header4">
                  <div className="home-heading12">
                    <span className="home-text57">Expand</span>
                    <span className="home-text58">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </span>
                  </div>
                  <div className="home-check-list7">
                    <div className="home-check3">
                      <svg viewBox="0 0 1024 1024" className="home-icon06">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="home-text59">
                        Sed ut perspiciatis unde
                      </span>
                    </div>
                    <div className="home-check4">
                      <svg viewBox="0 0 1024 1024" className="home-icon08">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="home-text60">
                        Quis nostrud exercitation ulla
                      </span>
                    </div>
                    <div className="home-check5">
                      <svg viewBox="0 0 1024 1024" className="home-icon10">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="home-text61">
                        Duis aute irure dolor intuit
                      </span>
                    </div>
                  </div>
                </div>
                <div className="home-button7">
                  <span className="home-text62">
                    <span>Contact us</span>
                    <br></br>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-help">
          <span className="home-text65">Need any help?</span>
          <div className="home-explore2">
            <span className="home-text66">
              Get in touch with us right away -&gt;
            </span>
          </div>
        </div>
      </div>
      <div className="home-testimonials">
        <div className="home-logo-container">
          <img
            alt="pastedImage"
            src="/pastedimage-idcu.svg"
            className="home-logo"
          />
        </div>
        <div className="home-content08">
          <div id="quotes" className="home-quotes">
            <div className="quote active-quote">
              <Quote rootClassName="quote-root-class-name"></Quote>
            </div>
            <div className="quote">
              <Quote
                quote='"Testing these templates is a pleasure."'
                title="Developer @ Vista La Vista"
                author="Author 2"
                rootClassName="quote-root-class-name"
              ></Quote>
            </div>
            <div className="quote">
              <Quote
                quote='"Wow, awesome works!'
                title="Designer @ OhBoy"
                rootClassName="quote-root-class-name"
              ></Quote>
            </div>
          </div>
          <div className="home-buttons">
            <div id="quote-before" className="home-left">
              <svg viewBox="0 0 1024 1024" className="home-icon12">
                <path d="M854 470v84h-520l238 240-60 60-342-342 342-342 60 60-238 240h520z"></path>
              </svg>
            </div>
            <div id="quote-next" className="home-right">
              <svg viewBox="0 0 1024 1024" className="home-icon14">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
            </div>
          </div>
          <div>
            <div className="home-container2">
              <Script
                html={` <script>
    /* Quote Slider - Code Embed */

    let current = 1;

    const nextButton = document.querySelector("#quote-next");
    const previousButton = document.querySelector("#quote-before");
    const quotes = document.querySelectorAll(".quote");

    if (nextButton && previousButton && quotes) {
      nextButton.addEventListener("click", () => {
        quotes.forEach((quote) => {
          quote.classList.remove("active-quote");
        });

        current == quotes.length ? (current = 1) : current++;
        quotes[current - 1].classList.add("active-quote");
      });

      previousButton.addEventListener("click", () => {
        quotes.forEach((quote) => {
          quote.classList.remove("active-quote");
        });

        current == 1 ? (current = quotes.length) : current--;
        quotes[current - 1].classList.add("active-quote");
      });
    }
  </script>`}
              ></Script>
            </div>
          </div>
        </div>
      </div>
      <div className="home-faq">
        <div className="home-content09">
          <div className="home-header5">
            <div className="home-tag2">
              <span className="home-text67">
                <span>FAQ</span>
                <br></br>
              </span>
            </div>
            <div className="home-heading13">
              <h2 className="home-text70">Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="home-rows">
            <div className="home-column3">
              <div className="Question">
                <span className="home-title1">
                  What is sit amet, consectetur adipiscing elit, sed do?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home-description3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
              </div>
              <div className="Question">
                <span className="home-title2">
                  What is sit amet, consectetur adipiscing elit, sed do?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home-description4">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>
                    tempor incididunt ut labore et dolore magna aliqua.
                    Excepteur sint occaecat
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                </span>
              </div>
              <div className="home-question2 Question">
                <span className="home-title3">
                  What is sit amet, consectetur adipiscing elit, sed do?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home-description5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </span>
              </div>
            </div>
            <div className="home-column4">
              <div className="home-question3 Question">
                <span className="home-title4">
                  What is sit amet, consectetur adipiscing elit, sed do?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home-description6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </span>
              </div>
              <div className="home-question4 Question">
                <span className="home-title5">
                  What is sit amet, consectetur adipiscing elit, sed do?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home-description7">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </span>
              </div>
              <div className="home-question5 Question">
                <span className="home-title6">
                  What is sit amet, consectetur adipiscing elit, sed do?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home-description8">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>
                    tempor incididunt ut labore et dolore magna aliqua.
                    Excepteur sint occaecat
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-get-started1">
        <div className="home-content10">
          <div className="home-heading14">
            <h2 className="home-text77">Get started with finExchange now!</h2>
            <span className="home-text78">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore magna.
            </span>
          </div>
          <div className="home-hero-buttons1">
            <div className="home-ios-btn1">
              <img
                alt="pastedImage"
                src="/pastedimage-zmzg.svg"
                className="home-apple"
              />
              <span className="home-caption6">Download for iOS</span>
            </div>
            <div className="home-android-btn1">
              <img
                alt="pastedImage"
                src="/pastedimage-ld65.svg"
                className="home-android"
              />
              <span className="home-caption7">Download for Android</span>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;