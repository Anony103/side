import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import google from '../assets/google.svg'
import facebook from '../assets/facebook.svg'
import { UserAuth } from '../../config/AuthContext';



const Login = () => {
  const {signInWithGoogle, user} = UserAuth();
  const navigate = useNavigate();
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

      <section className="bg-tahiti h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-white text-center">Login</h1>
          <p className="mb-4 text-white text-center">Create a New Account? 
          <NavLink to='/signup' className='ml-2'>Sign Up</NavLink>
          </p>

          <button onClick={handleGoogleSignIn} className="bg-white hover:bg-blue-700 text-black font-bold py-4 px-4 rounded mb-4 w-full flex justify-between items-center">
          <img src={google} alt="" className='w-6 h-6'/>
            <p>Login with Google</p>
            <div></div>
          </button>
        <button className="bg-blue-light hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-4 w-full flex justify-between items-center">
        <img src={facebook} alt="" className='w-6 h-6'/>
            <p>Login with Facebook</p>
            <div></div>
          </button>
          <div className="flex items-center mb-4">
            <hr className="flex-1 border-t border-gray-500 mr-2" />
            <span className="text-gray-500">or</span>
            <hr className="flex-1 border-t border-gray-500 ml-2" />
          </div>
          <NavLink to='/loginForm'>
          <button className="border border-customColor hover:bg-blue-700 text-white font-bold py-4 px-4 rounded w-full">
            <p>Login with Email</p>
          </button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Login;
