import React from 'react';
import { useHistory } from 'react-router-dom';

import './navbar.scss';

interface PropTypes {
    back: string;
    children: React.ReactNode;
}

const Navbar = ({ back, children }: PropTypes) => {
    const history = useHistory();

    return (
        <nav className="navbar">
            <div className="back" onClick={() => (back ? history.push(back) : false)}>
                {back ? '<-' : ''}
            </div>
            <div>
                <span onClick={() => window.location.reload()}>TurboBouffe</span>
            </div>

            {children}
        </nav>
    );
};

export default Navbar;
