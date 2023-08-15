import React from 'react'
import styles from "./Home.module.css";
import Featuredproduct from '../Featuredproduct/Featuredproduct';
import Categoryslider from '../Categoryslider/Categoryslider';


export default function Home() {
  return (
    <>
      <Categoryslider/>
      <Featuredproduct />
    </>
  );
  
}
