import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import styles from './stylesheets/styles.scss'


render(
  <BrowserRouter>
    <App />,
  </BrowserRouter>,
  document.getElementById('root')
);