import React, { useContext, useState } from 'react'
import styles from "./ProductDetails.module.css";
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import { useEffect } from 'react';
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import { CartContext } from '../CartContext/CartContext';
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";

export default function ProductDetails() {

  let { addToCart, settotalcartitems } = useContext(CartContext);
  

    async function addproduct(productId) {
      let response = await addToCart(productId);
      if (response.data.status === "success") {
        console.log(response);
        settotalcartitems(response.data.numOfCartItems);
        toast.success(response.data.message, {
          className: "border border-2 border-success",
        });
      } else {
        toast.error("Error");
      }
      // console.log(response);
    }

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

  let [productdetails , setproductdetails] = useState(null);
  let [isloading , setisloading] = useState(false);
  let params = useParams();

  async function getproductdetails(id) {
    setisloading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setproductdetails(data.data)
    
    setisloading(false);
  // console.log(data.data);
  }

  useEffect(() => {
    getproductdetails(params.id);
  }, [])
  
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logo} />
          <title>Product Detais</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="row py-3 align-items-center position-relative">
        {isloading ? (
          <div className="d-flex justify-content-center align-items-center top-0 bottom-0 start-0 end-0 position-absolute">
            <i className="fas fa-spinner text-main fa-spin fa-2x"></i>
          </div>
        ) : (
          <>
            <div className="col-md-4">
              <Slider {...settings}>
                {productdetails?.images.map((image) => (
                  <img src={image} className="w-100" />
                ))}
              </Slider>
            </div>
            <div className="col-md-8 py-4">
              <h3 className="text-center">{productdetails?.title}</h3>
              <p>{productdetails?.description}</p>
              <span className="text-main fw-bold font-sm">
                {productdetails?.category.name}
              </span>
              <h3 className="h6 fw-bolder">{productdetails?.title}</h3>
              <div className="d-flex justify-content-between">
                <span className="text-muted">{productdetails?.price}EGP</span>
                <span className="text-muted">
                  <i className="fas fa-star rating-color"></i>
                  {productdetails?.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => addproduct(productdetails._id)}
                className="btn bg-main text-white w-100"
              >
                + ADD
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
  
}
