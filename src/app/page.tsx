"use client";
import React from "react";
import "moment/locale/fr";
import moment from "moment";
import { useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import FontAwesome from "react-fontawesome";
import { logout } from "@/reducers/login";
import { Action } from "redux";

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
    </>
  );
};

export default App;
