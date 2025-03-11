import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import custom CSS file for Navbar styling

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      <Link className="navbar-brand" to="/">
          <img src={require("./logo.png")} alt="Logo" className="logo" />
        </Link>

        {/* Navbar Links */}


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/specials">Specials</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/small-scale-farming">Small Scale Farming</Link> 
            </li>
            {props.email !== null &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
              </>
            }
          </ul>
          <ul className="navbar-nav">
            {props.user === null ?
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {props.user.name}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;