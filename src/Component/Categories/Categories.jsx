import React, { useContext, useEffect } from "react";
import styles from "./Categories.module.css";
import Axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";
import { Link } from "react-router-dom";

export default function Categories() {

  const [categories, setcategories] = useState([]);
  async function getcategories() {
    let { data } = await Axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setcategories(data.data);
  }
  
  // console.log(categories);
  useEffect(() => {
    getcategories();
  }, []);
  
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logo} />
          <title>Categories</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      {categories ? (
        <>
          <div className="row">
            {categories.map((category) => (
              <div key={category._id} className="col-md-2">
                <div className="product px-2 py-4 cursor-pointer">
                  <Link to={`/SpecificCategory/${category._id}`}>
                    <img
                      width={100}
                      height={150}
                      className="w-100"
                      src={category.image}
                      alt={category.name}
                    />
                    <span className="text-main text-center fw-bold font-sm">
                      {category.name}
                    </span>
                    {/* <h3 className="h6 fw-bolder">
                      {category.title.split(" ").slice(0, 3).join(" ")}
                    </h3> */}
                    <div className="d-flex justify-content-between">
                      {/* <span className="text-muted">{category.price}EGP</span> */}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 end-0 start-0 bottom-0">
          <i className="fas fa-spinner fa-spin fs-2"></i>
        </div>
      )}
    </>
  );
}
