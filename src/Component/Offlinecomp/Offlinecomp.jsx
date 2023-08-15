import React from 'react'
import styles from "./Offlinecomp.module.css";

export default function Offlinecomp() {
  return (
    <>
      <div className="d-flex justify-content-center h-100 mt-5 pt-5 align-items-center">
        <h3 className="h1 text-main">
          {" "}
          You are offline check your conections{" "}
          <i className="fas fa-wifi"></i>
        </h3>
      </div>
    </>
  );
  
}
