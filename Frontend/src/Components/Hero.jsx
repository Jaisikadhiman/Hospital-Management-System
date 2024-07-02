import React from 'react'
import "./Hero.css"
const Hero = ({title,imageUrl}) => {
  return (

    <div className='container'>
       <div className="left">
        <h1>{title}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eveniet id exercitationem accusantium dignissimos omnis, veniam quos nostrum? Quibusdam quidem rerum, illo sint ducimus nulla labore veritatis. Ducimus, libero voluptatem!
        Quis ullam eum quo dolorum omnis quidem corporis aliquid. Numquam sapiente minima tenetur quisquam vel, ex, reiciendis error voluptas nisi provident odio veniam animi enim aliquid sequi in repellat. Perspiciatis.
        Accusantium quae dolor possimus illum inventore cupiditate consequuntur, asperiores, voluptates deserunt ducimus reprehenderit, officia tenetur omnis quas dolorum! Dolores voluptate distinctio voluptates nulla dolore, quis at blanditiis eaque nihil. Vel.

        </p>
       </div>
       <div className="right">
        <img  style={{marginTop:200}} src={imageUrl} alt='image'/>
       </div>
    </div>
  )
}

export default Hero
