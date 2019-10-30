import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './app.scss';
import { Route, BrowserRouter as Router, useHistory } from 'react-router-dom';

import Index from './routes';
import Sell from './routes/sell';

import store from './store';
import Tv from './routes/tv';
import Login from './routes/login';
import { autoLogin } from './reducers/login';
import Preparation from './routes/preparation';
import { State } from './reducers';
import { setHistory } from './reducers/history';

toast.configure({
  autoClose: 3000,
  pauseOnHover: true,
  transition: Flip,
  hideProgressBar: true,
});

const AutoLogin = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  dispatch(autoLogin(history));

  return <>{children}</>;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AutoLogin>
          <>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/sell" component={Sell} />
            <Route path="/preparation" component={Preparation} />
            <Route path="/tv" component={Tv} />
          </>
        </AutoLogin>
      </Router>
    </Provider>
  );
};

export default App;
