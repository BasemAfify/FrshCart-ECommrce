import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export function CartContextProvider(props) {
  const [cartid, setcartid] = useState(null)
  const [totalcartitems, settotalcartitems ] = useState(null)

  async function getcart() {
    
    let response = await getloggedusercart();
    // console.log(response);
    // console.log(response.data.data._id);
    if (response?.data?.status === "success") {
      // console.log(response);
      setcartid(response.data.data._id);
      settotalcartitems(response.data.numOfCartItems);
      // console.log("hello");
    }

    }

  useEffect(()=> {
  
    getcart();
  
  }, [])


  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((Error) => Error);
  }

  function getloggedusercart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((Error) => Error);
  }

  function removeitem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((response) => response)
      .catch((Error) => Error);
  }

  function updatecartproductsitems(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((Error) => Error);
  }
  function onlinepayment(cartid, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:3000

`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((Error) => Error);
  }
  function cashpayment(cartid, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((Error) => Error);
  }

  return (
    <>
      <CartContext.Provider
        value={{
          cartid,
          totalcartitems,
          setcartid,
          getcart,
          cashpayment,
          settotalcartitems,
          addToCart,
          getloggedusercart,
          removeitem,
          updatecartproductsitems,
          onlinepayment,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
}
