import React from 'react'
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet, useNavigate } from 'react-router-dom';



export default function Layout({userdata , setuserdata}) {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem('userToken');
    setuserdata(null);
    navigate('/login');
  };
  return (
    <>
      <div className='pt-5 mt-5'>

      <Navbar logout={logout} userdata={userdata} />
      <div className="container">
        <Outlet></Outlet>
      </div>
      </div>
    </>
  );
  
}
