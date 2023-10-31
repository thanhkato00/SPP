// import React from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import "./navbars.css";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { Link, Route, Routes } from "react-router-dom";
// import { useAuth } from "../auth-context";
// function NavbarLogin({ state, user }) {
//   const { logout } = useAuth();
//   const handleLogout = () => {
//     logout();
//   };
//   return (
//     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Supper Shoes</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#features">TopPage</Nav.Link>
//           </Nav>
//           <Nav>
//             {user ? (
//               <Nav.Link>User:{user.username}</Nav.Link>
//             ) : (
//               <Nav.Link>User:Guest</Nav.Link>
//             )}
//             <Nav.Link onClick={handleLogout}>logout</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavbarLogin;
