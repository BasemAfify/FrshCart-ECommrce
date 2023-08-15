import React, { useContext, useEffect, useState } from "react";
import styles from "./Allorders.module.css";
import { CartContext } from "../CartContext/CartContext";
import axios from "axios";
import { Helmet } from "react-helmet";
import jwtDecode from "jwt-decode";
import logo from "../../../src/freshcart-logo.svg";
export default function Allorders() {

  let { settotalcartitems, getloggedusercart } = useContext(CartContext);
  const [allorders, setallorders] = useState();
  let encodedtoken = localStorage.getItem("userToken");
  let decodedtoken = jwtDecode(encodedtoken);
  // console.log(decodedtoken);
  let userid = decodedtoken.id;
  
  // console.log(userid);
  async function getAllOrders(userid) {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`
      );
      setallorders(response.data);
    }
    
//     async function getcart() {
//       let response = await getloggedusercart();
// console.log('hello');
//       if (response?.data?.status === "success") {
        
//         settotalcartitems(response.data.numOfCartItems);
//       }
//       console.log(response);
//     }
    // console.log(allorders);
    
    

    
    
    useEffect(() => {
      // getcart();
      getAllOrders(userid);
      
  
}, []);
  

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logo} />
          <title>All Orders</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      {allorders ? (
        <>
          <h3 className="h2 text-center mt-3">All Orders</h3>
          <div className="row">
            {allorders.map((order) => (
              <div key={order.id} className=" border border-1 row mt-4 p-3">
                <p className="h4 ">Total price: {order.totalOrderPrice} LE</p>
                <p>total items count: {order.cartItems.length}</p>
                <p className="h5 fw-bold"> Shipping details: </p>
                <p className="ms-2 m-0">Adress: {order.shippingAddress.city}</p>
                <p className="ms-2 m-0">phone: {order.shippingAddress.phone}</p>
                <h4 className="h3 text-center">Orderd items</h4>
                {order.cartItems.map((cartitem) => (
                  <div key={cartitem._id} className="row m-3">
                    <div className="col-md-2 my-2">
                      <img
                        className="w-75 "
                        src={cartitem.product.imageCover}
                        alt={cartitem.product.title}
                      />
                    </div>
                    <div className="col-md-10 ">
                      <span className="text-main">
                        {cartitem.product.title}
                      </span>
                      <p className="m-0">price: {cartitem.price} LE</p>
                    </div>
                  </div>
                ))}
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
