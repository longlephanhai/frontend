import React, { useEffect } from 'react'
import './Model.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';
import model from '../assets/chup-anh-my-pham-beauty-dep-hcm-6_preview_rev_1.webp'
import { motion } from 'framer-motion'
import Navbar from '../Navbar/Navbar';
const Model = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);
  const sliderVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-220%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 20,
      },
    },
  };

  return (
    <div className='model'>
      <div className='head m-3'>
        <Navbar />
      </div>
      <div className='wrapper'>
        <div
          className='textContainer'
        >
          <h2
            data-aos="fade-right"
            data-aos-duration="2000"
          >WELCOME TO MYSHOP</h2>
          <h1 >Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</h1>
          <div className='buttons'>
            <button>Order Now</button>
            <button >Contact Me</button>
          </div>
        </div>
      </div>
      <motion.div
        className='slidingTextContainer'
        variants={sliderVariants}
        initial='initial'
        animate='animate'
      >
        Lorem ipsum dolor sit amet
      </motion.div>
      <div
        data-aos="fade-left"
        data-aos-easing="linear"
        className='imageContainer'>
        <img src={model} alt='' />
      </div>
    </div>
  )
}

export default Model
