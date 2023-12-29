import { useContext, createContext, useState, useEffect } from "react";
import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, FacebookAuthProvider} from 'firebase/auth'
import {auth, firestore} from '../config/firebase'
import { collection, getDocs,  doc, addDoc, deleteDoc } from 'firebase/firestore';
 const AuthContext = createContext()

 export const  AuthContextProvider = ({children, courseId}) => {
     const [user, setUser] = useState({});
     const [items, setItems] = useState([]);
     const [courses, setCourses] = useState({});
     const [cartItems, setCartItems] = useState([]);

     const addToCart = async (userId, item) => {
      try {
        const cartItem = { ...item, cartItemId: item.id };
        const cartRef = collection(firestore, 'users', userId, 'cart');
        
        // Fetch cart items for the current user
        const snapshot = await getDocs(cartRef);
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
        // Check if the item already exists in the cart
        const itemExists = items.some((cartItem) => cartItem.id === item.id);
    
        if (!itemExists) {
          await addDoc(cartRef, cartItem);
          console.log('Item added to cart', item);
    
          // Fetch updated cart items immediately after adding
          const updatedItems = await fetchCartItems(userId);
          setCartItems(updatedItems); // Update cartItems state with the new data
        } else {
          console.log('Item already exists in cart');
          console.log(items);
        }
      } catch (error) {
        console.error('Error adding item to cart:', error.message);
        throw error;
      }
    };
    
    



    const fetchCartItems = async (userId) => {
      try {
        const cartRef = collection(firestore, 'users', userId, 'cart');
        const snapshot = await getDocs(cartRef);
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(items)
        return items;
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
        throw error;
      }
    };

    const removeFromCart = async (userId, cartItemId) => {
      try {
        const cartRef = collection(firestore, 'users', userId, 'cart');
        const querySnapshot = await getDocs(cartRef);
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          if (item.cartItemId === cartItemId) {
            deleteDoc(doc.ref); 
            console.log('Item removed from cart');
          }
        });
      } catch (error) {
        console.error('Error removing item from cart:', error.message);
        throw error;
      }
    };
    

     const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider); 
}

const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser(user);
    console.log('User logged in with Facebook:', user);
  } catch (error) {
    console.error('Error signing in with Facebook:', error.message);
    throw error;
  }
};

    const logOut = () => {
        signOut(auth)
    }


    const createUserWithEmailPassword = async (email, password, name, phoneNumber, profilePic) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const newUser = userCredential.user;
      
          // Update user profile information (name, phone number, profile picture)
          await updateProfile(newUser, {
            displayName: name,
            phoneNumber: phoneNumber,
            photoURL: profilePic,
          });
      
          setUser(newUser);
          console.log('User created:', newUser);
        } catch (error) {
          console.error('Error creating user:', error.message);
          throw error;
        }
      }

      const authenticateUserWithEmailPassword = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const loggedInUser = userCredential.user;
    
          // Update state or perform actions for the logged-in user
          setUser(loggedInUser);
          console.log('User logged in:', loggedInUser);
        } catch (error) {
          console.error('Error signing in:', error.message);
          throw error;
        }
      };

      useEffect(() => {
        const fetchEvent = async () => {
          const EventSnapshot = await getDocs(collection(firestore, "course"));
          setItems(EventSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
          };
          fetchEvent();
      },[]);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            fetchCartItems(currentUser.uid); // Fetch cart items if user is logged in
          }
        });
        return () => {
          unsubscribe();
        };
      }, []);

  // useEffect(() => {
  //   if (courseId) {
  //     const getCourseId = async (id) => {
  //       try {
  //         const docRef = doc(firestore, "course", id);
  //         const result = await getDoc(docRef);
  //          const data = result.data();
  //          setCourses(data);
  //          console.log(data)
  //       } catch (error) {
  //         console.error('Error fetching course data:', error);
  //       }
  //     };

  //     console.log('Fetching course data for courseId:', courseId);
  //     getCourseId(courseId);
  //   }
  // }, [courseId]);

  // const {aim,overview, certificateDetails,courseContext, corseId1} = courses
  // console.log(courseContext)

// console.log(courses)
    return (
        <AuthContext.Provider value={{signInWithGoogle,  items, signInWithFacebook, logOut, createUserWithEmailPassword, authenticateUserWithEmailPassword, user, courses, cartItems, addToCart, removeFromCart, fetchCartItems }}>
            {children}
        </AuthContext.Provider>
    )
 }

 export const UserAuth = () => {
    return useContext(AuthContext)
 }