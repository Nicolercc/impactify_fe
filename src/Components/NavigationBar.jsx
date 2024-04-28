import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import "../App.css";

function NavigationBar() {
  return (
    <Navbar bg="dark" fixed="bottom">
      <Nav className="ml-auto d-flex justify-content-around w-100 ">
        <Nav.Link href="/discover" className="mx-2 ">
          <i className="fs-4 fi fi-tr-home-heart d-flex justify-content-center mt-2 text-light"></i>{" "}
        </Nav.Link>
        <Nav.Link href="/discover/news" className="mx-2">
          <i className="fs-4 fi fi-tr-newspaper d-flex justify-content-center mt-2 text-light"></i>{" "}
        </Nav.Link>
        <Nav.Link href="/discover/create-event" className="mx-2">
          <i className="fs-4 fi fi-tr-plus-hexagon d-flex justify-content-center mt-2 text-light"></i>{" "}
        </Nav.Link>
        <Nav.Link href="/discover/events" className="mx-2">
          <i className="fs-4 fi fi-tr-videoconference d-flex justify-content-center mt-2 text-light"></i>{" "}
        </Nav.Link>
        <Nav.Link href="/discover/donations" className="mx-2">
          <i className="fs-4 fi fi-tr-hands-heart d-flex justify-content-center mt-2 text-light"></i>{" "}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
