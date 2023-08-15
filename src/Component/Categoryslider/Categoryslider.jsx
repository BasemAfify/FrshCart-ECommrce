import React, { useEffect } from "react";
import styles from "./Categoryslider.module.css";
import Slider from "react-slick";
import { useState } from "react";
import axios from "axios";

export default function Categoryslider() {
  
  const [categories, setcategories] = useState([]);
  async function getcategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setcategories(data?.data);
  }

  useEffect(() => {
    getcategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };
  return (
    <>
      <Slider {...settings}>
        {categories?.map((category) => (<div key={category._id}>

          <img loading="lazy" src={category.image} height={200} className="w-100 " />
          <h2 className="h6 pt-2 text-center">{ category.name}</h2>
        </div>
        ))}
      </Slider>
    </>
  );
}
