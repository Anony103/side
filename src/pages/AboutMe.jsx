import React from 'react';
import dimeji from '../assets/Dimeji.webp';

const AboutMe = () => {
  return (
    <div>
      <div className="bg-tahiti text-white flex flex-col md:flex-row items-stretch">
        <div className="w-full md:w-1/2 md:order-last p-12">
          <img src={dimeji} alt="Your Alt Text" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center text-center md:text-center md:order-first">
          <h1 className="text-white text-3xl font-sans font-bold">Dimeji Sulaiman</h1>
          <h2 className="py-2 text-white text-xl font-sans">Founder & CEO</h2>
          <p className="md:px-8 lg:px-36 py font-sans font-thin">
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
