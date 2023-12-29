import React from 'react';
import global from '../assets/GLOBAL.webp'
const HeroBanner = () => {
  return (
    <main className="bg-tahiti-light text-white py-20 px-8">
      <div className="container m-auto py-20 px-8 bg-white text-black flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <div className="text-tahiti-light text-4xl font-serif font-bold">GLOBAL LEADERSHIP INSTITUTION</div>
        </div>
        <div className="mb-6">
          <img src={global} alt="Your Alt Text" />
        </div>
        <div className="text-center">
          <p className="text-tahiti">
            GLOBAL LEADERSHIP INSTITUTION 
            Our Online Training Course was created out of a strong passion, a shared vision and a ceaseless commitment to making learning easily accessible from anywhere in the world. Founded in 2000, our unique approach to learning is designed to provide our students with the opportunity to get an education on their own time.
            At the heart of everything that we do is our commitment to accessible education and our students’ success. We invite you to explore our diverse offering designed for learners from all backgrounds and levels.
          </p>
        </div>
        <div>
        <button type='submit' className="bg-white border text-tahiti-light my-6 px-4 py-2 rounded-3xl hover:bg-tahiti-light hover:text-white">Get in Touch</button>
        </div>
      </div>
    </main>
  );
};

export default HeroBanner;
