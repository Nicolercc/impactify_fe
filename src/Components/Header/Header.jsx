import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// import Logo from "../assets/ImpactifySSLogoNB.png";
import "./Header.css";

function Header() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="d-flex justify-content-around w-100 "
    >
      <Link to="/discover" className="m-auto text-decoration-none">
        <Navbar.Brand>

          <img src="/ImpactifySSLogo.svg" height="80" alt="Impactify Logo" />

          <span className="custom-header m-3 ">Impactify</span>
        </Navbar.Brand>
      </Link>
      <Nav className="ml-auto">
        <Link to="/user/signup" className="nav-link text-light mx-3">
          Sign Up
        </Link>

        <Link to="/user/login" className="nav-link text-light mx-3">
          Login
        </Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
