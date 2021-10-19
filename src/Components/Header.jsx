import React from 'react';
import "../Css/Header.css"


const Header = ({setMenuOpen}) => {
    return (
        <header className="header">
            <button className="burger" onClick={() => setMenuOpen(true)}>=</button>
            <h1 className="title">NC NEWS!</h1>
        </header>
    );
};

export default Header;