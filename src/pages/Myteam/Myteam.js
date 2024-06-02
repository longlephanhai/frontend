import React from 'react'
import Navbar from '../../components/Myteam/Navbar/Navbar'
import './Myteam.scss'
import Model from '../../components/Myteam/Model/Model'
import AboutUs from '../../components/Myteam/AboutUs/AboutUs'
const Myteam = () => {
    return (
        <div className='myteam'>
            <section id='Homepage'>
                <Model/>
            </section>
            <section id='AboutUs'>
                <AboutUs/>
            </section>
            <section>Services</section>
            <section>Paralax</section>
            <section>Portfolio1</section>
            <section>Portfolio2</section>
            <section>Portfolio3</section>
            <section>Contact</section>
        </div>
    )
}

export default Myteam
