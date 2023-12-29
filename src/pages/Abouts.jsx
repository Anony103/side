import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


const Abouts = () => {
  return (
    <section className="bg-tahiti-light text-white py-24 px-8">
      <div className="container m-auto py-20 px-8 bg-white text-black flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <div className="text-tahiti-light text-4xl font-serif font-bold">About Us</div>
        </div>
        <div className="text-center">
          <p className="text-tahiti">
          Our mission at GLOBAL LEADERSHIP INSTITUTION is to offer an award-winning virtual program that caters to all students around the world. Founded in 2020, we provide flexible learning options for all types of passionate learners.

We aim to provide diverse options that cater to individuals who want a customizable learning experience yet still prioritize receiving a high-level education. If you have any questions or are interested in enrolling in our Online Training Course, please don’t hesitate to get in touch.
            At the heart of everything that we do is our commitment to accessible education and our students’ success. We invite you to explore our diverse offering designed for learners from all backgrounds and levels.
          </p>
        </div>
        <div>
          <NavLink to='/contact'>
        <button type='submit' className="bg-white border text-tahiti-light my-6 px-4 py-2 rounded-3xl hover:bg-tahiti-light hover:text-white">Contact</button>
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Abouts
