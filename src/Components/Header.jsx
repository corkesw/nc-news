import React from 'react';
import "../Css/Header.css"


const Header = ({setMenuOpen, menuOpen}) => {
    const menuChange = (e) => {
        // e.preventDefault()
        setMenuOpen(true)
    }   
    
    return (
        <header className="header">
            <button type="button" className="burger vanish" onClick={menuChange}>=</button>
            <h1 className="title">NC NEWS!</h1>
        </header>
    );
};

export default Header;