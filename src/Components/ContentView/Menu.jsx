import React from 'react';
import "../../Css/Menu.css"
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";

const Menu = ({menuOpen, setMenuOpen}) => {
    const {user, setUser} = useContext(UserContext)
    const handleLogout = () => {
        setUser(null)
    }
    return (
        <div className={`sidenav menuopen${menuOpen}`}>
            <button className="closemenu" onClick={ () => setMenuOpen(false)}>X</button>
            
            {user ? 
            <>
            <p className="logindetails">Logged in as</p>
            <p className="logindetails user">  {user}</p>
            <button onClick={handleLogout} className="logout">Logout</button>
            </>
            : 
            <>
            <button className="logout">Login</button>
            <br />
            <button className="logout">Sign up</button>
            </>
            }
        

            
        </div>
    );
};

export default Menu;