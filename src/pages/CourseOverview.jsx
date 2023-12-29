import React, { useState } from 'react';
import CourseList from '../components/CourseList';
import { UserAuth } from '../../config/AuthContext';

const CourseOverview = () => {
  const { items } = UserAuth();
  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-tahiti text-white">
      <div className="container m-auto py-20 px-8 text-black flex flex-col items-center justify-center">
        <div className="container m-auto  px-8 text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <CourseList item={item} key={item.id} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
        <button
        onClick={handlePrevPage}
        className={`p-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-black' : 'bg-tahiti-light text-white'}`}
        disabled={currentPage === 1}
        >
        Prev
        </button>

        <span className="mx-2 bg-white p-2 rounded">
          {currentPage}
        </span>

        <button
          onClick={handleNextPage}
          className={`p-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-black' : 'bg-tahiti-light text-white'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
