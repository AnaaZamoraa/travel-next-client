import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import Modal from '../Modal/Modal';
import SignupForm from '../SignupForm/SignupForm';
import LoginForm from '../LoginForm/LoginForm';
import { AuthContext } from '../../contexts/auth.context';
import { Link } from 'react-router-dom';


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (username) => {
    setShowLoginModal(false);
    
  };

  return (
    <div className='Navbar'>
      <Navbar className="navbar bg-light fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link to='/'>
              <img 
                src="https://res.cloudinary.com/dv7nx2bxb/image/upload/v1715702223/travel-next/djehp5gntjcnnabwfkie.png" 
                alt="logo" 
                width="40" 
                height="40" 
              />
            </Link>
            <Link className="navbar-brand display-6" to="/all-travels">Every travel</Link>
            <Link className="navbar-brand display-6" to="/all-experiences">Every experience</Link>
          </div>
          <div className="d-flex">
            {!user ? (
              <>
                <button type="button" className="btn" onClick={() => setShowSignupModal(true)}>
                  Sign Up
                </button>
                <button type="button" className="btn" onClick={() => setShowLoginModal(true)}>
                  Login
                </button>
              </>
            ) : (
              <>
                <button 
                  className="navbar-toggler custom-toggler" 
                  type="button" 
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasNavbar" 
                  aria-controls="offcanvasNavbar" 
                  aria-label="Toggle navigation"
                >
                  <img 
                    src='https://res.cloudinary.com/dv7nx2bxb/image/upload/v1716395666/travel-next/cuux2luiwvi2mfgeuslm.png'
                    alt="Toggle navigation" 
                    width="40" 
                    height="40" 
                  />
                </button>
                <div 
                  className="offcanvas offcanvas-end" 
                  tabIndex="-1" 
                  id="offcanvasNavbar" 
                  aria-labelledby="offcanvasNavbarLabel"
                >
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Welcome</h5>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" data-bs-dismiss="offcanvas"></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 text-start">
                      <li className="nav-item dropdown">
                        <Link 
                          className="nav-link active dropdown-toggle display fs-6" 
                          to="/profile" 
                          role="button" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false"
                        >
                          Your profile
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item display fs-6" to="/trips">Your trips 🛩</Link></li>
                          <li><Link className="dropdown-item display fs-6" to="/favorites">Your favorites ✨</Link></li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link display-6" aria-current="page" to="/new-trip">Create a new trip</Link></li>
                      <li className="nav-item">
                        <Link className="nav-link display-6" aria-current="page" to="/chats">Chats</Link></li>
                      <li className="nav-item">
                        <Link className="nav-link display-6" aria-current="page" to="/logout" onClick={logout}>Logout</Link></li>
                    </ul>
                    <form className="d-flex mt-3" role="search">
                      <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search" 
                      />
                      <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
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

export default Navbar;
