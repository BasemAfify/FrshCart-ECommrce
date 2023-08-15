import React from 'react'
import styles from "./Notfound.module.css";
import notfound from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";



export default function Notfound() {
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logo} />
          <title>Notfound</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className="w-75 m-auto">
        <img className="w-100" src={notfound} alt="" />
      </div>
    </>
  );
  
}
