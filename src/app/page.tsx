'use client';
import React from 'react';
import 'moment/locale/fr';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import Navbar from '@/components/navbar';
import FontAwesome from 'react-fontawesome';
import { logout } from '@/reducers/login';
import { Action } from 'redux';
import { State } from "@/types";
import { useRouter } from 'next/navigation';

moment.locale('fr');

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const login = useSelector((state: State) => state.login);
  return (
    <>
      <Navbar>
        <div className="logout" onClick={() => dispatch(logout() as unknown as Action)}>
          <FontAwesome name="sign-out-alt" /> Déconnexion
        </div>
      </Navbar>
      <div id="index">
        { ['admin','preparator'].includes(login.key) &&
          <div className='link_category'>
            <p>Préparation par commande :</p>
            <div className='links_btns'>
              <div onClick={() => router.push('/preparation')}>
                <FontAwesome name="check" /> Général
              </div>
              <div onClick={() => router.push('/preparation?only=pizzas')}>
                <FontAwesome name="pizza-slice" /> Pizzas
              </div>
              <div onClick={() => router.push('/preparation?only=crepes')}>
                <FontAwesome name="stroopwafel" /> Crêpes
              </div>
              <div onClick={() => router.push('/preparation?only=croques')}>
                <FontAwesome name="bread-slice" /> Croques
              </div>
            </div>
          </div>
        }
        { ['admin','tv','seller'].includes(login.key) &&
          <div className='link_category'>
            <p>Administration / Affichage :</p>
            <div className='links_btns'>
              { ['admin','seller'].includes(login.key) &&
                <div onClick={() => router.push('/sell')}>
                  <FontAwesome name="hamburger" /> Vente
                </div>
              }
              { login.key === 'admin' &&
                <div onClick={() => router.push('/items')}>
                  <FontAwesome name="receipt" /> Gestion
                </div>
              }
              <div onClick={() => router.push('/tv')}>
                <FontAwesome name="tv" /> TV
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default App;
