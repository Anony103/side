import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '50%',
};

const Contact = () => {

  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      setMessage('Form submitted');
      setSubmitted(true);
      // Handle form submission or API calls here
      // Reset form after submission
      resetForm();
    },
    validationSchema: yup.object({
      name: yup.string().trim().required('Name is required'),
      email: yup.string().email('Must be a valid email').required('Email is required'),
      message: yup.string().trim().required('Message is required'),
    }),
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    formik.handleSubmit(e);
  };


  return (
    <React.Fragment>
    <section className="bg-tahiti text-white py-20 px-8">
      <div className="container m-auto py-20 px-8 bg-tahiti text-black flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <div className="text-white text-4xl font-serif font-bold">Contact Us</div>
        </div>
        <div className="text-center">
          <p className="text-white">
          Our dedicated team is always ready to provide the support you need. If your inquiry is about course enrolment, activation and certifications, fill out 
          </p>
        </div>
      </div>
    </section>

        <section className="text-white flex flex-col md:flex-row items-stretch">
        <div className="py-16 bg-blue w-full md:w-1/2 flex flex-col justify-center items-center text-left md:text-center">
  <div className="wrapper flex items-center justify-between mb-4 w-4/5 sm:w-4/5 md:w-2/4 lg:w-2/4 xl:w-2/4">
    <div className='bg-red-500 p-2 mr-4 rounded-md'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    </div>
    <div>
      <h1 className="text-white text-2xl font-sans font-bold">Email Us</h1>
      <p className='font-sans font-thin'>MOFALS@HOTMAIL.COM</p>
    </div>
    <div></div>
  </div>
  <hr className="w-4/5 md:w-1/2 my-4 border-t-2 border-red-500 mb-24" />

  <div className="wrapper flex items-center justify-between mb-4 w-4/5 sm:w-4/5 md:w-2/4 lg:w-2/4 xl:w-2/4">
    <div className='bg-amber-300 p-2 mr-4 rounded-full'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

    </div>
    <div>
      <h1 className="text-white text-2xl font-sans font-bold">Address</h1>
      <p className='font-sans font-thin'>1877 Roseland lane, Roseland lane</p>
    </div>
    <div></div>
  </div>
  <hr className="w-4/5 md:w-1/2 my-4 border-t-2 border-gray-300 mb-24" />

  <div className="wrapper flex items-center justify-between mb-4 w-4/5 sm:w-4/5 md:w-2/4 lg:w-2/4 xl:w-2/4">
    <div className='bg-green-500 p-2 mr-4 rounded-full'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
</svg>
    </div>
    <div>
      <h1 className="text-white text-2xl font-sans font-bold">Call Us</h1>
      <p className='font-sans font-thin'>+234 07043433781</p>
    </div>
    <div></div>
  </div>
  <hr className="w-4/5 md:w-1/2 my-4 border-t-2 border-green-500 mb-24" />
</div>
<div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white">
  {submitted && (
    <div className="alert alert-primary" role="alert">
      {message}
    </div>
  )}
  <form className="w-full sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto p-12" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="name" className="text-sm font-medium text-white">
        Name
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="name"
          className="text-gray-700 border-b border-gray-300 focus:outline-none focus:border-indigo-500 p-2 w-full"
          placeholder="John Doe"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.errors.name && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
      )}
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="text-sm font-medium text-white">
        Email
      </label>
      <input
        type="email"
        name="email"
        className="text-gray-700 border-b border-gray-300 focus:outline-none focus:border-indigo-500 p-2 w-full"
        placeholder="john@example.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
      )}
    </div>

    <div className="mb-4">
      <label htmlFor="message" className="text-sm font-medium text-white">
        Message
      </label>
      <textarea
        name="message"
        className="border-b border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500 p-2 w-full"
        placeholder="Your message ..."
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.message && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
      )}
    </div>
    <div className='flex justify-center items-center'>
      <button type="submit" className="bg-white border text-tahiti-light mx-auto my-6 px-4 py-2 rounded-3xl hover:bg-tahiti-light hover:text-white">
        Send
      </button>
    </div>
  </form>
</div>

    </section>
    <section className="h-96 md:h-1/2" style={{ width: '100%' }}>
            <Map
              google={window.google}
              zoom={15}
              className="w-full h-full"
              initialCenter={{ lat: 40.7128, lng: -74.0060 }}
            >
              <Marker position={{ lat: 40.7128, lng: -74.0060 }} />
            </Map>
          </section>
    </React.Fragment>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDnjwAlNZzkVz6iu6VUvKwD3K5fbBmkT-s',
})(Contact);