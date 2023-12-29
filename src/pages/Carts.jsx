import React, { useState, useEffect } from 'react';

const Carts = ({ userCartItems, handleRemoveFromCart, toggleCart }) => {
  const totalAmount = userCartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.courseId1.price,
    0
  );

  return (
    <div className="fixed inset-0 overflow-hidden z-50 bg-gray-700 bg-opacity-50">
      <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl h-full transition-transform duration-300 transform translate-x-0">
        <div className="flex items-center justify-between text-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={toggleCart} // Close cart popup on back icon click
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <h2 className="text-xl font-bold">Your Cart</h2>
          <div></div>
        </div>
        {userCartItems && userCartItems.length > 0 ? (
          <>
            {userCartItems.map((item, index) => (
              <div key={index} className="flex flex-row px-2  justify-between">
                
                  <img src={item.courseId1.img} alt="" className="w-1/5 h-68 object-cover bg-gray-300" />
                  <div className='ml-4 mr-4'>
                    <h2 className="text-left w-52">{item.courseId1.title}</h2>
                    <p className="text-xs mb-4 font-sans">by {item.courseId1.author}</p>
                  </div>
                  <div className='flex flex-col items-center'>
                  <p className="text-left">${item.courseId1.price}</p>
               
                <button onClick={() => handleRemoveFromCart(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="text-left font-bold text-xl">Total: ${totalAmount.toFixed(2)}</div>
              <button className="bg-tahiti-light hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
                Proceed to checkout
              </button>
            </div>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Carts;
