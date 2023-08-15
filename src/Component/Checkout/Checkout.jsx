import React from 'react'
import styles from "./Checkout.module.css";
import {  useFormik } from 'formik';
import { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";

export default function Checkout() {
  let { onlinepayment, cartid } = useContext(CartContext);

  async function handlesubmit (values) {

    let response = await onlinepayment(cartid, values);
    // console.log( response);
    if (response?.data?.status === "success") {
      window.location.href = response.data.session.url
      console.log(response.data.session.url);
    }
  }

  let formik = useFormik({
    initialValues: {
        details: "",
        phone: "",
        city: ""
    },
    onSubmit : handlesubmit
  })


  function name() {
    console.log("hello");
  }
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logo} />
          <title>Checkout</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="w-50 py-5 mx-auto">
        <h3 className=" text-center">pay Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <input
            onChange={formik.handleChange}
            className="form-control my-4 "
            type="text"
            placeholder="Details"
            name="details"
            id="details "
            value={formik.values.details}
          />
          <input
            onChange={formik.handleChange}
            className="form-control my-4 "
            type="tel"
            placeholder="Phone number"
            name="phone"
            id="phone"
            value={formik.values.phone}
          />
          <input
            onChange={formik.handleChange}
            className="form-control my-4 "
            type="text"
            placeholder="City"
            name="city"
            id="city"
            value={formik.values.city}
          />
          <button
            onClick={name}
            type="submit"
            className="btn btn-outline-success w-100 m-auto"
          >
            {" "}
            Pay{" "}
          </button>
        </form>
      </div>
    </>
  );
  
}
