import React, { useContext, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../App";

const Header = () => {
  const context = useContext(GlobalContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Reddit Clone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {!context.token ? <Nav.Link href="/login">Login</Nav.Link> : null}
            {!context.token ? (
              <Nav.Link href="/register">Register</Nav.Link>
            ) : null}
            {context.token ? (
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("token");
                  context.setIsLoggedIn(false);
                  context.setToken(null);

                  localStorage.removeItem("loggedIn");
                }}
                to="/login"
              >
                Log Out
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
