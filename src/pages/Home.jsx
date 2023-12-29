import React from 'react'
import HeroBanner from '../components/HeroBanner'
import CourseList from '../components/CourseList'
import Overview from '../components/Overview'
import { UserAuth } from '../../config/AuthContext';

const Home = () => {
  const { items } = UserAuth();
  return (
    <React.Fragment >
      <HeroBanner/>
      
      <div className="pt-20 bg-tahiti text-white">
          <h2 className="text-white text-4xl font-serif font-bold text-center">Our Services</h2>
      

        <div className="container m-auto py-20 px-8 text-black flex flex-col items-center justify-center">
        <div className="container m-auto  px-8 text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {items.slice(0,6).map((item, index) => (
            <CourseList item={item} key={index} />
          ))}
        </div>
        </div>
        </div>
      <Overview/>
    </React.Fragment>
  )
}

export default Home
