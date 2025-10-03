import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, USER_ICON, SUPPORTED_LANGUAGES } from "../utils/constants";
import { Rocket, LogOut } from "lucide-react";
import { toggleGPTSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGPT = useSelector((store) => store.gpt.showGPTSearch);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGPTSearch = () => {
    dispatch(toggleGPTSearch());
  };

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target?.value));
  }; 

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/90 to-transparent z-50">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <img
          className="w-36 md:w-44 cursor-pointer hover:opacity-90 transition"
          src={LOGO}
          alt="logo"
          onClick={() => navigate("/browse")}
        />

        {user && (
          <div className="flex items-center gap-6">

           {showGPT && (
          <select
            onChange={handleLanguage}
            className="h-9 px-4 rounded-full bg-gray-800 text-white text-sm"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
            )}
          

            {/* GPT Button */}
          <button
            onClick={handleGPTSearch}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-700 to-red-800 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            {showGPT ? (
              <>
                Home
                <Rocket className="w-5 h-5" color="yellow" fill="yellow" />
              </>
            ) : (
              <>
                GPT Search
                <Rocket className="w-5 h-5" />
              </>
            )}
          </button>


            {/* User Profile */}
            <div className="flex items-center gap-3">
              <img
                className="w-11 h-11 rounded-full border-2 border-white shadow-md"
                alt="usericon"
                src={USER_ICON}
              />
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 text-sm font-bold text-white 
                           hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4 " /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
