import React from 'react';
import { Provider } from 'react-redux';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'moment/locale/fr';
import './app.scss';

import Index from './routes';
import Sell from './routes/sell';

import store from './store';
import Tv from './routes/tv';
import Preparation from './routes/preparation';
import Items from './routes/items';
import LoginRouter from './components/loginRouter';
import { Route } from 'react-router';
import moment from 'moment';

toast.configure({
  autoClose: 3000,
  pauseOnHover: true,
  transition: Flip,
  hideProgressBar: true,
});

moment.locale('fr');

const App = () => {
  // Enables pointer on press key c
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.onkeypress = (e: any) => {
    // If space bar is pressed
    if (e.key === 'c') {
      const cursor = document.body.style.cursor === 'none' ? 'initial' : 'none';
      document.body.style.cursor = cursor;
    }
  };

  return (
    <Provider store={store}>
      <LoginRouter>
        <Route exact path="/" component={Index} />
        <Route path="/sell" component={Sell} />
        <Route path="/preparation" component={Preparation} />
        <Route path="/tv" component={Tv} />
        <Route path="/items" component={Items} />
      </LoginRouter>
    </Provider>
  );
};

export default App;
