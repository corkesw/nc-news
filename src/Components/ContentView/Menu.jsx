import React from 'react';
import "../../Css/Menu.css"

const Menu = ({menuOpen, setMenuOpen}) => {
    return (
        <div className={`sidenav menuopen${menuOpen}`}>
            <button className="closemenu" onClick={ () => setMenuOpen(false)}>X</button>
            <ul>
            <li>Hi</li>
            <li>Hi</li>
            <li>Hi</li>
            <li>Hi</li>
            <li>Hi</li>
            <li>Hi</li>
            <li>Hi</li>

            </ul>
        </div>
    );
};

export default Menu;