import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 text-light fst-italic" to="/">Foodies</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'text-secondary border-bottom border-2' : 'text-light'}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '' ? 'text-secondary border-bottom border-2' : 'text-light'}`}
                  aria-current="page"
                  to="/myOrder"
                >
                  My Order
                </Link>
              </li>
              : ""}
          </ul>

          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex' style={{ marginRight: "20px" }}>
              <Link
                className={`btn btn-primary text-white mx-3 ${location.pathname === '/login' ? 'text-secondary border-bottom border-2' : 'text-white'}`}
                to="/login"
              >
                Login
              </Link>

              <Link
                className={`btn btn-primary text-white ${location.pathname === '/createuser' ? 'text-secondary border-bottom border-2' : 'text-white'}`}
                to="/createuser"
              >
                SignUp
              </Link>
            </div>
            :
            <div>
              <button type="button" className ="btn btn-primary position-relative" onClick={() => { setCartView(true) }}>
                My Cart
                <span className ="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {data.length}
                  <span className ="visually-hidden">unread messages</span>
                </span>
              </button>
              {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /></Modal> : null}

              <div className='btn btn-danger text-white mx-2' onClick={handleLogout}>
                Logout
              </div>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
