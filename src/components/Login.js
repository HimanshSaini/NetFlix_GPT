import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; 
import { BG } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);   
  const [errorMessage, setErrorMessage] = useState(null);   
  const [loading, setLoading] = useState(false); // 🔥 loading state
  const dispatch = useDispatch();

  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  const handleButtonClick = async () => {
    const emailValue = email.current?.value.trim();
    const passwordValue = password.current?.value.trim();
    const nameValue = name.current?.value.trim();

    const message = checkValidData(emailValue, passwordValue, isSignInForm ? null : nameValue);
    if (!isSignInForm && !nameValue) {
      setErrorMessage("Name is required");
      return;
    }
    if (message) {
      setErrorMessage(message);
      return;
    }

    setErrorMessage(null);
    setLoading(true); // start shimmer

    try {
      if (!isSignInForm) {
        // --- Sign Up ---
        const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
        await updateProfile(userCredential.user, { displayName: nameValue, photoURL: null });

        const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        // --- Sign In ---
        const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        const { uid, email, displayName, photoURL } = userCredential.user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      }
    } catch (error) {
      setErrorMessage(error.code + " - " + error.message);
    } finally {
      setLoading(false); // stop shimmer
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={BG} alt="Background" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <Header />

      {/* Form */}
      <div className="flex justify-center items-center h-full relative z-10">
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="w-full max-w-md bg-black bg-opacity-80 p-10 rounded-md text-white"
        >
          <h1 className="font-bold text-3xl mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

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

          {errorMessage && <p className="text-red-600">{errorMessage}</p>}

          {/* Button with shimmer */}
          <button
            type="submit"
            className={`p-3 my-4 w-full rounded-md font-semibold transition 
              ${loading ? "bg-gray-600 animate-pulse cursor-not-allowed" : "bg-red-700 hover:bg-red-800"}
            `}
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? "Loading..." : isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-red-600" />
              <span>Remember me</span>
            </label>
            <a href="/" className="hover:underline">Need help?</a>
          </div>

          <p
            className="mt-6 text-white-400 hover:underline cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "New to Netflix? Sign up now" : "Already Registered? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
