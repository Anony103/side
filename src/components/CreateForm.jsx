import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import google from '../assets/google.svg'
import facebook from '../assets/facebook.svg'
import { UserAuth } from '../../config/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreateForm = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const {createUserWithEmailPassword, signInWithGoogle, user} = UserAuth();
  const storage = getStorage();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      profilePic: null,
    },
    onSubmit: async (values, { resetForm }) => {
      try {

        const profilePicURL = values.profilePic
          ? await uploadProfilePicture(values.profilePic)
          : null;

        await createUserWithEmailPassword(
          values.email,
          values.password,
          values.name,
          values.phoneNumber,
          profilePicURL
          );
        setMessage('Account created successfully!');
        setSubmitted(true);
        resetForm();
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        setSubmitted(true);
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Must be a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      phoneNumber: yup.string().required('Phone number is required'),
    }),
  });

  const handleProfilePicChange = (event) => {
    // Set the selected file to formik values
    formik.setFieldValue('profilePic', event.currentTarget.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const uploadProfilePicture = async (file) => {
    try {

      const storageRef = ref(storage, `profile_pictures/${file.name}`);
  
      // Upload file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
  
      // Get the download URL after successful upload
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      return downloadURL; // Return the download URL of the uploaded image
    } catch (error) {
      console.error('Error uploading profile picture:', error.message);
      throw error;
    }
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
      <div className="bg-tahiti lg:h-screen md:h-full flex justify-center items-center py-12">
      <div className="max-w-md w-full p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Sign Up</h1>
        <p className="mb-4 text-white text-center">Already a member? 
        <NavLink to='/login' className='ml-2'>Login</NavLink>
        </p>
        {submitted && (
          <div className="alert alert-primary" role="alert">
            {message}
          </div>
        )}
        <form className="w-full  mx-auto py-4" onSubmit={handleSubmit}>
           <div className="mb-4">
               <label htmlFor="name" className="text-sm font-medium text-white">
                 Name
               </label>
               <input
                 type="text"
                name="name"
                className="text-white border-b border-gray-300 bg-tahiti focus:outline-none focus:border-amber-300 p-2 w-full"
                placeholder="Your name ..."
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
              <label htmlFor="phoneNumber" className="text-sm font-medium text-white">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="text-white border-b border-gray-300 bg-tahiti focus:outline-none focus:border-amber-300 p-2 w-full"
                placeholder="Your phone number ..."
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phoneNumber && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
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

          <div className="mb-4">
          <label htmlFor="profilePic" className="text-sm font-medium text-white">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            accept="image/*" // Allow only image files
            onChange={handleProfilePicChange}
            className="text-white border-b border-gray-300 bg-tahiti focus:outline-none focus:border-amber-300 p-2 w-full"
          />
        </div>

          <div className='flex justify-center items-center'>
            <button type="submit" className="bg-white border text-tahiti-light mx-auto my-6 px-4 py-2 rounded-3xl hover:bg-tahiti-light hover:text-white">
              Create
            </button>
          </div>
        </form>
        <div className="flex items-center mb-4">
            <hr className="flex-1 border-t border-gray-300 mr-2" />
            <span className="text-white">or sign up with</span>
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

export default CreateForm;
