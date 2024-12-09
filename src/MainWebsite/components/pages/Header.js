import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../styles/style.css"; // Your custom styles

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header id="header" className="header sticky-top">
      {/* Topbar Section */}
      <div className="topbar d-flex align-items-center accent-background">
        <Container className="d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:info@rajasreetownships.in">
                info@rajasreetownships.in
              </a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+91 6262666999</span>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a href="https://youtube.com/@rajasreetownships-dm?si=kyQqkNtDm58us4p9" target="_blank" rel="noopener noreferrer" className="twitter">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="https://www.facebook.com/share/p/S5bAGYD3YMBZshE3/?mibextid=xfxF2i" target="_blank" rel="noopener noreferrer" className="facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/rajasreetownships/profilecard/?igsh=cHh3Ymxnem1lZ3dk" target="_blank" rel="noopener noreferrer" className="instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="/" className="linkedin">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </Container>
      </div>

      {/* Navbar Section */}
      <div className="branding d-flex align-items-center">
        <Container className="position-relative d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <h1 className="sitename">rajasree townships</h1>
          </a>

          <Navbar expand="lg" className="navmenu">
            {/* Hamburger Menu Button */}
            <button
              className={`menu-icon ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Horizontal Menu for Desktop */}
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="nav-links d-none d-lg-flex"
            >
              <Nav className="ms-auto fw-bold">
                <Nav.Link href="#hero">Home</Nav.Link>
                <Nav.Link href=""></Nav.Link>
                <Nav.Link href="#projects">Projects</Nav.Link>
                <Nav.Link href=""></Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href=""></Nav.Link>
                <Nav.Link href="#contact">Contact Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>

      {/* Slide-in Menu for Mobile */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <Nav className="flex-column text-center">
          <Nav.Link href="#hero" onClick={toggleMenu}>
            Home
          </Nav.Link>
          <Nav.Link href="#projects" onClick={toggleMenu}>
            Projects
          </Nav.Link>
          <Nav.Link href="#about" onClick={toggleMenu}>
            About Us
          </Nav.Link>
          <Nav.Link href="#contact" onClick={toggleMenu}>
            Contact Us
          </Nav.Link>
        </Nav>
      </div>
    </header>
  );
};

export default Header;
