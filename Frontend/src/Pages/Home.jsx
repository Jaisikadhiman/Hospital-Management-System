import React from 'react'
import Biography from "../Components/Biography"
import Departments from "../Components/Departments"
import Hero from "../Components/Hero"
import MessageForm from "../Components/MessageForm"
import hero from "../../public/hero.png"
import about from "../../public/aboutt.jpg"
const Home = () => {
  return (
   <>
   <Hero title={"Welcome to Jass Care Medical Institute"} imageUrl={hero}/>
   <Biography title={"Who We Are"} imageUrl={about}/>
  
   <Departments/>
   <MessageForm/>
   </>
  )
}

export default Home
