import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState("");
  const usertoken = localStorage.getItem('userToken')
  async function handleRegister(values) {
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((error) => {
        console.log(error);
        setmessageError(
          `${error.respose.data.errors.msg}:${error.respose.data.errors.param}`
        );
      });

    console.log("hi");
    if (data.message === "success") {
      setisloading(false);
      navigate("/login");
      console.log(data);
    }
  }


  // if the user logged in will be navigate to home 
  if (usertoken) {
    navigate("/");
  }

  let validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name min length is 3")
      .max(10, "name max length is 10"),
    email: yup.string().required("email is required").email("email is invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase character & must between 5-10 characters "
      ),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")], "rePassword is invalid"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(
        /^01[0125][0-9]{8}$/,
        "phone number must me egyption valid phone number"
      ),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Register Now : </h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control mb-2"
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

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

          <label htmlFor="phone">Phone : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="form-control mb-2"
            type="tel"
            name="phone"
            id="phone"
          />

          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}

          <label htmlFor="password">Password : </label>
          <input
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

          <label htmlFor="rePassword">Repassword : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            className="form-control mb-2"
            type="password"
            name="rePassword"
            id="rePassword"
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
