import React from "react";
import styles from "./Cashcheckout.module.css";
import { useFormik } from "formik";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Cashcheckout() {
  let { cashpayment, cartid, settotalcartitems } = useContext(CartContext);
  // console.log(cartid);
  let navigate = useNavigate();


  async function handlesubmit(values) {
    let response = await cashpayment(cartid, values);
    console.log(response);
    if (response?.data?.status === "success" ) {
      settotalcartitems(0);
      navigate("/allorders");
    }
  }



  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handlesubmit,
  });



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
            // onClick={() => navigate("/allorders")}
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
