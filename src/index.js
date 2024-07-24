// src/App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './views/home';
import Login from './views/login'; // Import the Login component
import NotFound from './views/not-found';
import Signup from './views/NameSignup';
import EmailSignup from './views/EmailSignup';
import userProfile from './views/userProfile';
import Chat from './views/chat';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Login} path="/login" /> 
        <Route component={Signup} path="/name" /> 
        <Route component={EmailSignup} path="/email" />
        <Route component={userProfile} path="/user-profile" />
        <Route component={Chat} path="/chats" />
        
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
