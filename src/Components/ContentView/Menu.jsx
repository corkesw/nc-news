import React from 'react';
import "../../Css/Menu.css"
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";
import { Link } from 'react-router-dom';

const Menu = ({menuOpen, setMenuOpen}) => {
    const {user, setUser} = useContext(UserContext)
    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem('loggedInUser')
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
            
            <Link to="/login"><button onClick={() => setMenuOpen(false)}className="logout">Login</button></Link>
            
            
            }
        

            
        </div>
    );
};

export default Menu;