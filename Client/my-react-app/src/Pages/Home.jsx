import React from 'react'
import Navbar from "../Components/Navbar";
import Hero from '../Components/Hero'
import About from '../Components/About'
import Branches from '../Components/Branches'
import Order from '../Components/Order'
import Reservation from '../Components/Reservation'
import Carousel from '../Components/Carousel'
import Offer from '../Components/Offer'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <>
    <Navbar />
    <div className="pt-20">
      <Hero/>
      <About/>
      <Branches/>
      <Order/>
      <Reservation/>
      <Carousel/>
      <Offer/>
      <Footer/>
    </div>
    </>
  )
}

export default Home
