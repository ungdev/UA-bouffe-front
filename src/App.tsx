import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Index from './routes';
import Sell from './routes/sell';

import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route exact path="/" component={Index} />
                <Route path="/sell" component={Sell} />
            </Router>
        </Provider>
    );
};

export default App;
