import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import google from '../assets/google.svg'
import facebook from '../assets/facebook.svg'
import { UserAuth } from '../../config/AuthContext';

const LoginForm = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { authenticateUserWithEmailPassword, signInWithGoogle, user } = UserAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await authenticateUserWithEmailPassword(values.email, values.password); // Call signInWithEmailAndPassword with email and password
        setMessage('Login successful');
        setSubmitted(true);
        resetForm();
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        setSubmitted(true);
      }
    },
    validationSchema: yup.object({
      email: yup.string().email('Must be a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/')
    }
  },[user])

  return (
    <div className="relative">
    <NavLink
      className="absolute top-4 right-4 text-white px-3 py-1 rounded-md bg-gray-200"
      to='/'
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </NavLink>
      <div className="bg-tahiti h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-white text-center">Login</h1>
          <p className="mb-4 text-white text-center">Create a New Account? 
          <NavLink to='/signup' className='ml-2'>Sign Up</NavLink>
          </p>
        {submitted && (
          <div className="alert alert-primary" role="alert">
            {message}
          </div>
        )}
        <form className="w-full  mx-auto p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="text-white border-b border-gray-300 bg-tahiti focus:outline-none focus:border-amber-300 p-2 w-full"
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
            <label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="text-white border-b border-gray-300 bg-tahiti focus:outline-none focus:border-amber-300 p-2 w-full"
              placeholder="Your password ..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className='flex justify-center items-center'>
            <button type="submit" className="bg-white border text-tahiti-light mx-auto my-6 px-4 py-2 rounded-3xl hover:bg-tahiti-light hover:text-white">
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center mb-4">
            <hr className="flex-1 border-t border-gray-300 mr-2" />
            <span className="text-white">or Login with</span>
            <hr className="flex-1 border-t border-gray-300 ml-2" />
          </div>
      <div className='flex items-center justify-center space-x-4 py-2'>
      <button onClick={handleGoogleSignIn}>
      <img src={google} alt="" className='w-8 h-8'/>
      </button>
      <img src={facebook} alt="" className='w-8 h-8'/>
      </div>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
