import React from "react";
import "../Css/Menu.css";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";
import { Link } from "react-router-dom";

const Menu = ({ menuOpen, setMenuOpen }) => {
    console.log('menu open is ', menuOpen)
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };
  return (
    <div className={`sidenav menuopen${menuOpen}`}>
      <button className="closemenu vanish" onClick={() => setMenuOpen(false)}>
        X
      </button>

      {user ? (
        <>
          <p className="logindetails">Logged in as</p>
          <p className="logindetails user"> {user}</p>
          <Link to="/add">
            <button className="styledbutton" >Add article</button>
          </Link>
          <Link to="/login">
            <button
              onClick={() => {
                handleLogout()
                setMenuOpen(false)}
              }
              className="logout styledbutton"
            >
              Logout
            </button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <button className="styledbutton logout" onClick={() => setMenuOpen(false)}>
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Menu;
