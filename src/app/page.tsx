"use client";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/fr";
import "./page.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import FontAwesome from "react-fontawesome";
import { logout } from "@/reducers/login";
import { Action } from "redux";
import LoginRouter from "@/components/loginRouter";
import Preparation from "./preparation/page";
import { Route } from "react-router";

moment.locale("fr");

const App = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar>
        <div className="logout" onClick={() => dispatch(logout() as unknown as Action)}>
          <FontAwesome name="sign-out-alt" /> Déconnexion
        </div>
      </Navbar>
      <LoginRouter>
        <Route path="/preparation" component={Preparation} />
        {/*<Route exact path="/" component={Index} />
        <Route path="/sell" component={Sell} />
        <Route path="/tv" component={Tv} />
        <Route path="/items" component={Items} />*/}
      </LoginRouter>
      {/* <div id="index">
        <div onClick={() => history.push('/sell?except=goodies')}>
          <FontAwesome name="hamburger" /> Vente de bouffe
        </div>
        <div onClick={() => history.push('/sell?only=goodies')}>
          <FontAwesome name="tshirt" /> Vente de goodies
        </div>
        <div onClick={() => history.push('/preparation')}>
          <FontAwesome name="check" /> Préparation générale
        </div>
        <div onClick={() => history.push('/preparation?only=pizzas')}>
          <FontAwesome name="pizza-slice" /> Préparation des pizzas
        </div>
        <div onClick={() => history.push('/tv')}>
          <FontAwesome name="tv" /> TV
        </div>
        <div onClick={() => history.push('/items')}>
          <FontAwesome name="receipt" /> Gestion des items
        </div>
      </div> */}
    </>
  );
};

export default App;
