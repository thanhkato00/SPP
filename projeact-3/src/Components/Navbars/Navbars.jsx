import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth-context";
import Button from "react-bootstrap/Button";

import "./navbars.css";
function Navbars() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage);
      login(parsedUser);
    }
  }, []);
  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");

    console.log(user);
    navigate("/");
  };
  console.log(user);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Supper Shoes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Top Page
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                
                <Nav.Link>{user.username}</Nav.Link>
                
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Navbar.Text>
                <Button variant="outline-secondary" as={Link} to="/login">
                  Đăng nhập
                </Button>
                <Button variant="outline-secondary">Đăng ký</Button>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
