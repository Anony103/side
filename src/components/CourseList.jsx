import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../config/AuthContext';


const CourseList = ({ item }) => {
  const { id, courseId1} = item;
  const { title, img, price } = courseId1;
  const {user, addToCart} = UserAuth();
  const [isReadMore, setIsReadMore] = useState(true);
  const truncatedLength = 24; 

  const navigate = useNavigate();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };


  const handleAddToCart = () => {
    if (user) {
      addToCart(user.uid, item); // Pass the user's UID and the item to addToCart
      console.log('Item added to cart',item);
    } else {
      // Handle the scenario when the user is not logged in
      navigate('/login');
      console.log('User not logged in');
    }
  };

  const truncatedTitle = isReadMore ? title.slice(0, truncatedLength) : title;
  

  return (
    <section>
      <div className='text-white border border-customColor transition ease-in-out delay-150 hover:-translate-y-0.5 hover:opacity-50 hover:bg-amber-300 hover:scale-110 mb-8 hover:text-black'>
        <NavLink to={`/course/${id}`} key={id}>
          <img src={img} alt="" className="w-full h-68 object-cover bg-gray-300" />
        </NavLink>
        <div className='px-8 py-6'>
          <h2 className="text-xl font-serif font-bold flex justify-between" onClick={toggleReadMore}>
            {truncatedTitle}
            {title.length > truncatedLength && (
              <span style={{ cursor: 'pointer' }}>
                {isReadMore ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
}
              </span>
            )}
          </h2>
          <hr className="w-full my-4 border-t border-customColor opacity-50" />
          <p className=''>{item.time}</p>
          <p className='my-2'>{item.price}</p>
          <button onClick={handleAddToCart} type='submit' className="bg-white text-tahiti my-6 px-4 py-2 rounded-md">Enroll Now</button>
        </div>
      </div>
    </section>
  );
};

export default CourseList;
