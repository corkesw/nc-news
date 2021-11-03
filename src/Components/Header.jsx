import React from "react";
import "../Css/Header.css";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";
import { Link } from "react-router-dom";

const Header = ({ setMenuOpen, menuOpen }) => {
  const {user, setUser} = useContext(UserContext);
  
  return (
    <header className="header">
        <span></span>
        <span></span>
        <span></span>
      {user ? (
        <Link to="/login"><button className="styledbutton headerbutton" onClick={()=> {setUser(null)}}>Logout</button></Link>
      ) : (
      <Link to="/login"><button className="styledbutton headerbutton">Login</button></Link>
      )}
      <h1 className="title">NC NEWS!</h1>
      {user ? <Link to="/add"><button className="styledbutton headerbutton">Add article</button></Link> : null
}
    </header>
  );
};

export default Header;
