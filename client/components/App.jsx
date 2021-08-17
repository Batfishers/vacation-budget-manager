import React, { Component, useState } from 'react';
import Container from './Container.jsx';
import Navigation from './Navigation.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './login.js';

function App() {

  return (
    <Router>
      <Navigation />
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Container}/>
        </Switch>

    </Router>
  )
}

export default App;