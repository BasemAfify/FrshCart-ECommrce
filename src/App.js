import Home from "./Component/Home/Home.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import Products from "./Component/Products/Products.jsx";
import Brands from "./Component/Brands/Brands.jsx";
import Cart from "./Component/Cart/Cart.jsx";
import Categories from "./Component/Categories/Categories.jsx";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";
import About from "./Component/About/About.jsx";
import Notfound from "./Component/Notfound/Notfound.jsx";
import Register from "./Component/Register/Register.jsx";
import Login from "./Component/Login/Login.jsx";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute.jsx";
import { CartContextProvider } from "./Component/CartContext/CartContext.js";
import toast, { Toaster } from "react-hot-toast";
import SpecificCategory from "./Component/SpecificCategory/SpecificCategory.jsx";
import Checkout from "./Component/Checkout/Checkout.jsx";
import Offlinecomp from "./Component/Offlinecomp/Offlinecomp.jsx";
import Allorders from "./Component/Allorders/Allorders.jsx";
import { Offline, Online } from "react-detect-offline";
import "./App.css";
import Cashcheckout from "./Component/Cashcheckout/Cashcheckout.jsx";

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveuserdata();
    }
  }, []);
  const [userdata, setuserdata] = useState(null);

  function saveuserdata() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setuserdata(decodedToken);
  }
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout setuserdata={setuserdata} userdata={userdata} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "FrshCart-ECommrce/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "cashcheckout",
          element: (
            <ProtectedRoute>
              <Cashcheckout />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "SpecificCategory/:id",
          element: (
            <ProtectedRoute>
              <SpecificCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveuserdata={saveuserdata} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <CartContextProvider>
        

        {/* <Offline > <Offlinecomp/> </Offline> */}
        
        
        <Toaster />
        <RouterProvider router={routers}></RouterProvider>;
      </CartContextProvider>
    </>
  );
}
