import React from 'react';
import "../Css/Header.css"


const Header = ({setMenuOpen, menuOpen}) => {
    console.log(menuOpen)
    return (
        <header className="header">
            <button className="burger vanish" onClick={() => setMenuOpen(true)}>=</button>
            <h1 className="title">NC NEWS!</h1>
        </header>
    );
};

export default Header;