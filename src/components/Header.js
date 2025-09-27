import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { LOGO, USER_ICON } from '../utils/constants';


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Handle Sign Out

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      
      <img
        className="w-44"
        src= {LOGO}
        alt="logo"

      />

      {user && (
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12"
          alt="usericon"
          src={USER_ICON}
        />
        <button
          onClick={handleSignOut}
          className="text-sm font-bold text-white hover:text-red-500"
        >
          Sign Out
        </button>
      </div>
      )}
      
    </div>
  );
};

export default Header;
