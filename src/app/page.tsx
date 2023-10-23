'use client'
import React from 'react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'moment/locale/fr';
import './page.scss';

import Index from '../routes';
import Sell from '../routes/sell';

import store from '../store';
import Tv from '../routes/tv';
import Preparation from '../routes/preparation';
import Items from '../routes/items';
import LoginRouter from '../components/loginRouter';
import { Route } from 'react-router';
import moment from 'moment';

moment.locale('fr');

const App = () => {
  return (
    <Provider store={store}>
      <LoginRouter>
        <Route exact path="/" Component={Index} />
        <Route path="/sell" Component={Sell} />
        <Route path="/preparation" Component={Preparation} />
        <Route path="/tv" Component={Tv} />
        <Route path="/items" Component={Items} />
      </LoginRouter>
    </Provider>
  );
};

export default App;
