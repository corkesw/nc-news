import React from "react";
import "../Css/Menu.css";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";
import { Link } from "react-router-dom";

const Menu = ({ menuOpen, setMenuOpen }) => {
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
            <button>Add article</button>
          </Link>
          <Link to="/login">
            <button
              onClick={() => {
                handleLogout()
                setMenuOpen(false)}
              }
              className="logout"
            >
              Logout
            </button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <button onClick={() => setMenuOpen(false)} className="logout">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Menu;
