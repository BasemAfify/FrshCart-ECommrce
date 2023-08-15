import React from 'react';
import styles from "./Navbar.module.css";
import logo from '../../assets/images/freshcart-logo.svg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';

export default function Navbar({userdata,logout}) {
  
  let { totalcartitems } = useContext(CartContext)

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userdata !== null ? (
            <>
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="cart">
                    <i className="fas fa-shopping-cart fs-4"></i>
                    {totalcartitems > 0 ? 
                    <span className="badge bg-danger position-absolute top-0 end-0"> {totalcartitems}</span>
                    : ""}
                  </Link>
                </li>
              </ul>

              </>
            ) : null}

            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item d-flex align-items-center">
                  <i className="fab fa-facebook mx-2"></i>
                  <i className="fab fa-twitter mx-2"></i>
                  <i className="fab fa-instagram mx-2"></i>
                  <i className="fab fa-youtube mx-2"></i>
                  <i className="fab fa-tiktok mx-2"></i>
                  <i className="fab fa-linkedin mx-2"></i>
                </li>

                {userdata == null ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="register">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <span onClick={logout} className="cursor-pointer nav-link">
                      Logout
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
