import React from 'react';
import { Provider } from 'react-redux';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './app.scss';

import Index from './routes';
import Sell from './routes/sell';

import store from './store';
import Tv from './routes/tv';
import Preparation from './routes/preparation';
import LoginRouter from './components/loginRouter';
import { Route, Redirect } from 'react-router';

toast.configure({
  autoClose: 3000,
  pauseOnHover: true,
  transition: Flip,
  hideProgressBar: true,
});

const App = () => {
  return (
    <Provider store={store}>
      <LoginRouter>
        <Route exact path="/" component={Index} />
        <Route path="/sell" component={Sell} />
        <Route path="/preparation" component={Preparation} />
        <Route path="/tv" component={Tv} />
        <Redirect to="/" />
      </LoginRouter>
    </Provider>
  );
};

export default App;
