import React, { useState } from 'react';
import {initializeApp}  from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9iHIOBas5MqCmAOwvvCtTwIuoHZXRXWU",
  authDomain: "global-leadership-instit-f0ab2.firebaseapp.com",
  projectId: "global-leadership-instit-f0ab2",
  storageBucket: "global-leadership-instit-f0ab2.appspot.com",
  messagingSenderId: "830762404019",
  appId: "1:830762404019:web:32baff6b14ade29f6fc8c6",
  measurementId: "G-9M7W1L0832"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app);