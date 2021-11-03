import React from "react";
import "../Css/Header.css";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";
import { Link } from "react-router-dom";

const Header = ({ setMenuOpen, menuOpen }) => {
  const {user, setUser} = useContext(UserContext);
  
  return (
    <header className="header">
      {user ? (
        <Link to="/login"><button className="styledbutton" onClick={()=> {setUser(null)}}>Logout</button></Link>
      ) : (
      <Link to="/login"><button className="styledbutton">Login</button></Link>
      )}
      <h1 className="title">NC NEWS!</h1>
    </header>
  );
};

export default Header;
