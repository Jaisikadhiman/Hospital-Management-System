import React from 'react'
import "./Biography.css"
const Biography = ({title,imageUrl}) => {
  return (
    <div className='main'>
      <div className="left">
      <img src={imageUrl} alt="" />
      </div>
      <div className="right">
        <h2>Who we are</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus deserunt nihil mollitia quos officiis quia sunt quisquam vel ipsum, suscipit tenetur magni? Autem, sint molestiae incidunt consectetur iste dignissimos atque.
        Deleniti laboriosam, sint officiis laudantium autem sunt quae quisquam voluptatibus corporis dolorem ex rem quasi vero labore nihil quibusdam blanditiis possimus maxime asperiores. Eius minima nulla quaerat, nt at temporibus laborum consequuntur voluptas distinctio, deleniti culpa suscipit autem alias.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore accusantium natus modi similique? Dolor enim quo consectetur dolore expedita, delectus assumenda quibusdam impedit tenetur sit repellat. Expedita obcaecati corporis eaque?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis ugiat corporis illo est dolorum ea?</p>
      </div>
    </div>
  )
}

export default Biography
