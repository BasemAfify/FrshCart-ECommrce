import React, { useContext, useEffect } from "react";
import styles from "./Products.module.css";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";

export default function Products() {
  const [products, setproducts] = useState([]);
  let { addToCart, settotalcartitems, setcartid } = useContext(CartContext);

  async function addproduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      settotalcartitems(response.data.numOfCartItems);
      setcartid(response.data.data._id);

      toast.success(response.data.message, {
        className: "border border-2 border-success",
      });
    } else {
      toast.error("Error");
    }
    // console.log(response);
  }

  async function getproducts() {
    let { data } = await Axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setproducts(data.data);
  }

  useEffect(() => {
    getproducts();
  }, []);
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logo} />
          <title>Products</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      {products ? (
        <>
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 col-lg-2">
                <div className="product px-2 py-4 cursor-pointer">
                  <Link to={`/ProductDetails/${product._id}`}>
                    <img className="w-100  " src={product.imageCover} alt="" />
                    <span className="text-main fw-bold font-sm">
                      {product.category.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{product.price}EGP</span>
                      <span className="text-muted">
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addproduct(product._id)}
                    className="btn bg-main text-white w-100"
                  >
                    + ADD
                  </button>
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
