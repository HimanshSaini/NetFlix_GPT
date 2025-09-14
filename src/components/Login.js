import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; 

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);   
  const [errorMessage, setErrorMessage] = useState(null);   
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // using refs so inputs are uncontrolled (value is directly read)
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // --- Step 1: Validate input ---
    const message = checkValidData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;  // stop if invalid input

    // --- Step 2: Firebase Auth ---
    if (!isSignInForm) { 
      // --- Sign Up flow ---
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('signup user-', user);

        // ⚠️ updateProfile must be called immediately, otherwise Redux may get null displayName
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: null,  
        })
        .then(() => {
          console.log('updated user-', user);

          // ⚠️ auth.currentUser is guaranteed to exist here
          const { uid, email, displayName, photoURL } = auth.currentUser;

          // store user in Redux
          dispatch(
            addUser({
              uid,
              email,
              displayName,
              photoURL,
            })
          );

          // navigate only after profile update is done
          navigate("/browse");
        })
        .catch((error) => {
          
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        
        setErrorMessage(error.code + "-" + error.message);
      });
    } 
    else {
      // --- Sign In flow ---
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('signin user-', user);
       
        navigate("/browse");
      })
      .catch((error) => {
        setErrorMessage(error.code + "-" + error.message);
      });
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_large.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <Header />

      {/* Signup Form */}
      <div className="flex justify-center items-center h-full relative z-10">
        <form 
          onSubmit={(e) => e.preventDefault()}  // prevents page reload
          className="w-full max-w-md bg-black bg-opacity-80 p-10 rounded-md text-white transition-all duration-500 ease-in-out"
        >
          <h1 className="font-bold text-3xl mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {/* Show Full Name field only when signing up */}
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              ref={name} 
              className="p-4 my-3 w-full rounded-md bg-gray-500 bg-opacity-30 border border-gray-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            ref={email}
            className="p-4 my-3 w-full rounded-md bg-gray-500 bg-opacity-30 border border-gray-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />
          
          <input
            type="password"
            placeholder="Password"
            ref={password}
            className="p-4 my-3 w-full rounded-md bg-gray-500 bg-opacity-30 border border-gray-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />

          <p className="text-red-600"> {errorMessage} </p>

          <button
            type="submit"
            className="p-3 my-4 w-full bg-red-700 hover:bg-red-800 transition rounded-md font-semibold"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-red-600" />
              <span>Remember me</span>
            </label>
            <a href="/" className="hover:underline">
              Need help?
            </a>
          </div>

          <p
            className="mt-6 text-white-400 hover:underline cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign up now"
              : "Already Registered? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
