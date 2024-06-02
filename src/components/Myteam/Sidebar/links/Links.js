import React from 'react'
import {motion} from "framer-motion"
const Links = () => {
  const items=["Homepage","Services","Porfolio","Contact","About"]
  return (
    <motion.div className='links'>
      {
        items.map((item,index)=>{
          return(
            <a href={`#${item}`} key={index}>{item}</a>
          )
        })
      }
    </motion.div>
  )
}

export default Links
