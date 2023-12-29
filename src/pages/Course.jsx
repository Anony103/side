import React, { useState, useRef, useEffect} from 'react';
import cultural from '../assets/cultural.webp';
import { useNavigate, useParams } from 'react-router-dom';
import {AuthContextProvider, UserAuth } from '../../config/AuthContext';
import { doc,getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
// const CourseWrapper = ({ children, courseId }) => {
//   return (
//     <AuthContextProvider courseId={courseId}>
//       {children}
//     </AuthContextProvider>
//   );
// };

const Course = () => {
  const [showContent, setShowContent] = useState({});
  const contentRef = useRef(null);
  const { user, addToCart } = UserAuth();
  const [items, setItems] = useState({});



  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getCourseId = async (id) => {
    const docRef = doc(firestore, "course", id);
    const result = await getDoc(docRef);
    const data =result.data();
    setItems(data);
   };
   getCourseId(id)
  },[id]);

  console.log(items)
  const toggleContent = (moduleId) => {
    setShowContent((prevShowContent) => ({
      ...prevShowContent,
      [moduleId]: !prevShowContent[moduleId],
    }));
  };

  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const enrollClicked = (courseId) => {
    if (user && user.displayName) {
      const courseWithId = { ...items, id: courseId }; // Add the id to the items object
      addToCart(user.uid, courseWithId); // Pass the updated items object with the id to addToCart
      console.log('Course added to cart:', courseId);
    } else {
      navigate('/login');
    }
  };




  

  const { certificateDetails, courseId1, Overview, aim, courseContent } = items;
  console.log(courseContent)

  return (
    <section className='bg-blue text-white'>
      <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/3 lg:pr-4">
          <img src={courseId1 ? courseId1.img : ''} alt="" className="w-full sm:max-w-md bg-gray-300" />
        </div>
        <div className="lg:w-3/5 mt-4 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-2">{courseId1 ? courseId1.title : ''}</h1>
          <p className="text-xs mb-4 font-sans">{ courseId1 ? `by ${courseId1.author}`: ''}</p>
          <p className="text-sm mb-4 font-sans">
          {courseId1 ? courseId1.description : ''}          
          </p>
          <button onClick={() => enrollClicked(id)} className="bg-white text-black px-4 py-2 rounded-md mb-8">Enroll</button>
        </div>
      </div>
      <div className="lg:w-1/2  border border-gray-300 px-4 py-6 rounded-3xl shadow-md shadow-gray-300 bg-white text-black">
        <h2 className="text-md font-bold font-serif mb-2">{certificateDetails? `Professional Certificate - ${certificateDetails.series} course series`: ''}</h2>
        <p className="text-xs font-sans mb-4">Earn a career credential that demonstrates your expertise</p>
        <hr className="mb-4 border-gray-300" />
        <div className="grid grid-cols-1 gap-y-4">
          <div>
            <h2 className="text-md font-serif font-bold">{certificateDetails? `${certificateDetails.level} level`:''}</h2>
            <p className="text-sm font-sans">Recommended experience</p>
          </div>
          <div>
            <h2 className="text-md font-serif font-bold">{certificateDetails? `${certificateDetails.durMonth} months at ${certificateDetails.durTime} hours a week`:''}</h2>
          </div>
          <div>
            <h2 className="text-md font-serif font-bold">Flexible schedule</h2>
            <p className="text-sm font-sans">Learn at your own pace</p>
          </div>
          <div>
            <h2 className="text-md font-serif font-bold">Earn degree credit</h2>
          </div>
        </div>
        <hr className="mt-4 mb-2 border-gray-300" />
        <a href="#courseContent" className="text-blue text-xs font-sans" onClick={scrollToContent}>
          View all courses
        </a>
      </div>
      </div>
      <div className="lg:w-1/2 sm:pr-4 px-4 sm:px-6 lg:px-8 py-8 mx-8 my-8 border border-gray-300 rounded-2xl shadow shadow-gray-300 bg-white text-black">
        <h2 className="text-lg font-bold font-serif mb-2">Overview</h2>
        <p className="text-sm mb-4 font-sans">
        {Overview}
        </p>
      </div>
      <div className="lg:w-1/2 sm:pr-4 px-4 sm:px-6 lg:px-8 py-8 mx-8 my-8 border border-gray-300 rounded-2xl shadow shadow-gray-300 bg-white text-black">
        <h2 className="text-lg font-serif font-bold mb-2">What you'll learn</h2>
        <ul className='list-decimal '>
          {aim && aim.map((item, index) => <li className="text-sm mb-4 font-sans" key={index}>{item}</li>)}
        </ul>
      </div>
      <div ref={contentRef} id="courseContent" className="lg:w-1/2 sm:pr-4 px-4 sm:px-6 lg:px-8 py-8 mx-8 my-8 border border-gray-300 rounded-2xl shadow shadow-gray-300 bg-white text-black">
  <h2 className="text-lg font-serif font-bold mb-2">Course Content</h2>
  {courseContent && courseContent.map((module, index) => (
          <div key={index} className='mb-6'>
            <button
              type="button"
              className="dropdown w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700"
              onClick={() => toggleContent(index)}
            >
              <span className="text-xs text-left font-serif font-medium sm:text-xs md:text-lg">{module.title}</span>
              {showContent[index] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 flex-shrink-0 transform rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
            </button>

            {showContent[index] && (
              <div className="content-to-toggle sm:pr-4 px-4 sm:px-4 lg:px-4 py-4 border border-gray-300 rounded-md">
                <ul className="list-disc px-4">
                  {module.module1 && module.module1.map((subModule, subIndex) => (
                    <li className="mb-2 text-sm font-sans" key={subIndex}>
                      {subModule}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
</div>

    </section>
    // </CourseWrapper> 
  );
};


// const Course = () => {
//   return <CoursePage />;
// };

export default Course;