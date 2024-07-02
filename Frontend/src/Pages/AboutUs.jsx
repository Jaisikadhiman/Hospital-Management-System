import React from 'react'
import Hero from '../Components/Hero'
import Biography from '../Components/Biography'
import about from "../../public/aboutt.jpg"
const AboutUs = () => {
  return (
    <>
    <Hero title={"Learn more about us | Jass Care Medical Institute"} imageUrl={about} />
      
    <Biography  imageUrl={"/whoweare.png"}/>
    </>
  )
}

export default AboutUs
