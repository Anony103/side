import React from 'react';
import video from '../assets/video.webp';
import vtm from '../assets/vtm.webp';

const Overview = () => {
  const desc = `This is your Application section paragraph. Encourage your site 
visitors to apply for any of the available classes which you offer.`
const descs = `This is your Feature description. Write a short blurb explaining what the feature is and why it matters for visitors, customers or clients. Don’t be afraid to toot your own horn! Take this opportunity to emphasize the important benefits or key advantages.`
  return (
    <React.Fragment>
    <div className="bg-tahiti text-white flex flex-col md:flex-row items-stretch">
      <div className="bg-blue w-full md:w-1/2 flex flex-col justify-center items-center text-center md:text-center min-h-screen md:min-h-0">
        <h1 className="text-white text-3xl font-sans font-bold">Apply Now</h1>
        <h2 className="py-2 text-white text-xl font-sans ">Join Our Online Training Course</h2>
        <p className='md:px-8 lg:px-36 py font-sans font-thin'>{desc}</p>
      </div>
      <div className="w-full md:w-1/2">
        <img src={video} alt="Your Alt Text" className="w-full h-auto" />
      </div>
    </div>
    <div className="bg-tahiti-light text-white flex flex-col md:flex-row items-center justify-center p-28">
      <div className="w-full md:w-1/3 flex items-center justify-center">
        <div className="bg-white">
           <img src={vtm} alt="Your Alt Text" className="w-full h-auto"  style={{ transform: 'translate(20px,-20px)' }} /> 
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center md:text-center md:py-0">
        <h1 className="text-white text-3xl font-sans font-bold">Award-Winning</h1>
        <h2 className="py-2 text-white text-xl font-sans">Outstanding Quality</h2>
        <p className="md:px-6 py font-sans md:w-5/6 font-thin">{descs}</p>
      </div>
    </div>
    </React.Fragment>

  );
};

export default Overview;
