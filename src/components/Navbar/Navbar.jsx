import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import Modal from '../Modal/Modal';
import SignupForm from '../SignupForm/SignupForm';
import LoginForm from '../LoginForm/LoginForm';
import { AuthContext } from '../../contexts/auth.context';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Button, Offcanvas, Form } from 'react-bootstrap';

function MyNavbar() {
  const { user, logout } = useContext(AuthContext);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <div className="Navbar">
      <Navbar bg="light" expand="lg" fixed="top" className="navbar">
        <Container fluid>
          <div className="d-flex align-items-center">
            <Navbar.Brand as={Link} to="/">
              <img 
                src="https://res.cloudinary.com/dv7nx2bxb/image/upload/v1715702223/travel-next/djehp5gntjcnnabwfkie.png" 
                alt="logo" 
                width="40" 
                height="40" 
              />
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/travels/all-travels" className="display-6">Every travel</Navbar.Brand>
            <Navbar.Brand as={Link} to="/activities/all-activities" className="display-6">Every activity</Navbar.Brand>
          </div>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {!user ? (
                <>
                  <Button className="transparent-btn" onClick={() => setShowSignupModal(true)}>Sign Up</Button>
                  <Button className="transparent-btn" onClick={() => setShowLoginModal(true)}>Login</Button>
                </>
              ) : (
                <>
                  <img 
                    src="https://res.cloudinary.com/dv7nx2bxb/image/upload/v1716395666/travel-next/cuux2luiwvi2mfgeuslm.png"
                    alt="Toggle navigation" 
                    width="40" 
                    height="40" 
                    className="custom-toggler"
                    onClick={handleToggleOffcanvas}
                  />
                  <Offcanvas show={showOffcanvas} onHide={handleToggleOffcanvas} placement="end">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Welcome to Travel Next</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 pe-3 text-start">
                        <NavDropdown title="Your profile" id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} to={`/user/profile`}>Your travels and activities 🛩</NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/favorites">Your favorites ✨</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/travels/create">Create a new travel</Nav.Link>
                        <Nav.Link as={Link} to="/activities/create">Create a new activity</Nav.Link>

                        <Nav.Link as={Link} to="/chats">Chats</Nav.Link>
                        <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
                      </Nav>
                      <Form className="d-flex mt-3" role="search">
                        <Form.Control 
                          type="search" 
                          placeholder="Search" 
                          className="me-2" 
                          aria-label="Search" 
                        />
                        <Button variant="outline-primary" type="submit">Search</Button>
                      </Form>
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      {!user && (
        <>
          {showSignupModal && (
            <Modal modalId="signupModal" title="Signup" onClose={() => setShowSignupModal(false)}>
              <SignupForm onSignupSuccess={handleSignupSuccess} />
            </Modal>
          )}
          {showLoginModal && (
            <Modal modalId="loginModal" title="Login" onClose={() => setShowLoginModal(false)}>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default MyNavbar;