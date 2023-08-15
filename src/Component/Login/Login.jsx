import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Login({saveuserdata}) {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState("");
  let usertoken = localStorage.getItem("userToken");
  console.log(usertoken);
  async function handleLogin(values) {
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((error) => {
        console.log(error);
        setmessageError(
          `${error.respose.data.errors.msg}:${error.respose.data.errors.param}`
        );
      });

    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveuserdata();
      setisloading(false);
      navigate("/");
      console.log(data);
    }
  }

  // if the user logged in will be navigate to home

  if (usertoken) {
    navigate("/");
  }
  let validationSchema = yup.object({
    email: yup.string().required("email is required").email("email is invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase character & must between 5-10 characters "
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="w-75 mx-auto py-4">
        <h3>Login Now : </h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control mb-2"
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password : </label>
          <input v
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control mb-2"
            type="password"
            name="password"
            id="password"
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          {isloading ? (
            <button className="btn bg-main text-white" type="submit">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white"
              type="submit"
            >
              Login
            </button>
          )}
          <button className=" m-2 btn btn-primary">
            {" "}
            <Link className="text-white" to="/register">Register</Link> 
          </button>
        </form>
      </div>
    </>
  );
}
