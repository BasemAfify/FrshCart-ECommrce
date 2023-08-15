import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import logo from "../../../src/freshcart-logo.svg";

export default function SpecificCategory() {
  const [category, setcategory] = useState(null)
  let params = useParams();
  async function getSpecificcategory(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    ); 
    setcategory(data.data);
    console.log(category);

  }
  console.log(category);
  useEffect(() => {
    getSpecificcategory(params.id);
  },[])  
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={logo} />
          <title>Category</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      {category ? (
        <div className="row">
          <div className="col-lg-4">
            <img className="w-100 " src={category.image} alt="" />
          </div>
          <div className="col-lg-8">
            <h4 className='h3 text-center text-main'>
                 {category.name}
            </h4>
          
          </div>
        </div>
      ) : (
        <div>
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}
    </>
  );
}
