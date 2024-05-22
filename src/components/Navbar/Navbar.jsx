import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  return (
    <div className='Navbar'>
      <nav className="navbar bg-ligth fixed-top">
        <div className="container-fluid">
        <div className="d-flex align-items-center">
            <a className="navbar-brand" href="/">
              <img 
                src="https://res.cloudinary.com/dv7nx2bxb/image/upload/v1715702223/travel-next/djehp5gntjcnnabwfkie.png" 
                alt="logo" 
                width="40" 
                height="40" 
              />
            </a>
            <a className="navbar-brand display-6" href="/all-trips">Every trip</a>
            <a className="navbar-brand display-6" href="/all-experiences">Every experience</a>
          </div>
          <button 
            className="navbar-toggler custom-toggler" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" 
            aria-controls="offcanvasNavbar" 
            aria-label="Toggle navigation"
          >
            <img 
              src='https://res.cloudinary.com/dv7nx2bxb/image/upload/v1716395666/travel-next/cuux2luiwvi2mfgeuslm.png' // Usa la imagen importada
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
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Welcome</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 text-start">
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link active dropdown-toggle display fs-6" 
                    href="/profile" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    Your profile
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item display fs-6" href="/trips">Your trips 🛩</a></li>
                    <li><a className="dropdown-item display fs-6" href="/favorites">Your favorites ✨</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link display-6" aria-current="page" href="/new-trip">Create a new trip</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link display-6" aria-current="page" href="/chats">Chats</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link display-6" aria-current="page" href="/logout">Logout</a>
                </li>
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
