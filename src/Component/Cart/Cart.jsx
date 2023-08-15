import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../CartContext/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";

export default function Cart() {
  let navigate = useNavigate();
  let { getloggedusercart, removeitem, updatecartproductsitems , settotalcartitems } =
    useContext(CartContext);

  let [cartdetails, setcartdetails] = useState(null);

  async function getcart() {
    let response = await getloggedusercart();

    if (response?.data?.status === "success") {
      setcartdetails(response.data.data);
    }
  }

  async function removeitemfromcart(productid) {
    let response = await removeitem(productid);
    // console.log(response);
    setcartdetails(response.data.data);
    settotalcartitems(response.data.numOfCartItems);
  }
  async function updateitemcart(productid, count) {
    let response = await updatecartproductsitems(productid, count);
    // console.log(response);
    setcartdetails(response.data.data);
  }

  useEffect(() => {
    getcart();
  }, []);
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Cart</title>
          <link rel="icon" href={logo} />
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      {cartdetails ? (
        <div>
          <div className="bg-main-light p-4 my-4">
            <h3>Shop Cart</h3>
            <h6 className="text-main">
              Total Cart price :{cartdetails.totalCartPrice} EGP
            </h6>
            {cartdetails?.products.map((product) => (
              <div key={product._id} className="row align-items-center ">
                <div className="col-md-1 py-2">
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt=""
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between align-items-center ">
                  <div className=" w-75">
                    <h6 className="w-75 ">{product.product.title}</h6>
                    <h6 className="text-main">Price : {product.price} EGP</h6>
                    <button
                      onClick={() => removeitemfromcart(product.product._id)}
                      className="btn btn-danger"
                    >
                      <i className="fas fa-trash"></i> Remove{" "}
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={() =>
                        updateitemcart(product.product._id, product.count + 1)
                      }
                      className="btn btn-outline-success btn-sm"
                    >
                      +
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button
                      onClick={() => {
                        product.count - 1 == 0
                          ? removeitemfromcart(product.product._id)
                          : updateitemcart(
                              product.product._id,
                              product.count - 1
                            );
                      }}
                      className="btn btn-outline-warning btn-sm"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cartdetails.totalCartPrice > 0 ? (
            <div className=" d-flex align-items-center justify-content-center  ">
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-outline-success  w-25 mx-2 "
              >
                {" "}
                pay online <i className="fa-regular fa-credit-card"></i>
              </button>
              <button
                onClick={() => navigate("/cashcheckout")}
                className="btn btn-outline-success  w-25 mx-2 "
              >
                {" "}
                cash on delevary
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 end-0 start-0 bottom-0">
            <h3 className="h1 bg-main-light text-main">
              Your cart is empaty
          </h3>
        </div>
      )}
    </>
  );
}
