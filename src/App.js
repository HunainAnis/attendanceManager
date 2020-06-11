import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
