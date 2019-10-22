import React from 'react';

import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Index from './routes';
import Sell from './routes/sell';

const App = () => {
  return (
    <Router>
        <Route exact path='/' component={Index}/>
        <Route path='/sell' component={Sell}/>
    </Router>
  );
};

export default App;