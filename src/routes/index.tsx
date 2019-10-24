import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

import './index.css';

const Index = (props: any) : ReactElement => {

    console.log(props);
    return (
        <div id="index">
            <h1>UA - Bouffe</h1>
            <div className="menu">
                <div onClick={() => props.history.push('/sell')}>Vente</div>
                <div>Suivi des commandes</div>
                <div>Préparation</div>
            </div>
        </div>
    );

};


export default Index;