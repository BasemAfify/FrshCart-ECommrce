import React, { useEffect } from "react";
import styles from "./Brands.module.css";
import Helmet from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";
import { useState } from "react";
import Axios from "axios";

export default function Brands() {
  const [brands, setbrands] = useState([]);
  async function getbrands() {
    let { data } = await Axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setbrands(data.data);
  }

  // console.log(brands);
  useEffect(() => {
    getbrands();
  }, []);

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Brands</title>
          <link rel="icon" href={logo} />
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      {brands ? (
        <div className="row d-flex ">
          {brands.map((brand) => (
            <div key={brand._id} className="col-lg-4 ">
              <div className="card my-3 d-flex justify-content-center align-items-center">
                <img  src={brand.image} className="card-img-top w-50" alt={brand.name} />
          
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 end-0 start-0 bottom-0">
          <i className="fas fa-spinner fa-spin fs-2"></i>
        </div>
      )}
    </>
  );
}
