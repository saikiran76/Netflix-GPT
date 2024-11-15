import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { motion } from "framer-motion";
import logo from '../img/flixyai.png';

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const location = useLocation();

  // Determine if the user is authenticated or a guest
  const isAuthenticated = user?.uid || user?.isGuest;

  // Handler to log the user out
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(removeUser());
  };

  // Handler for contacting the developer, smooth scrolling to the footer section
  const handleContactDeveloperClick = () => {
    const footerElement = document.getElementById('contact-developer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler to toggle GPT Search feature
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  // Navigation items with their routes and conditions
  const navItems = [
    {
      name: "My Bucket List",
      path: "/bucket-list",
      isActive: location.pathname === "/bucket-list",
      visible: isAuthenticated,
    },
    {
      name: "GPT Search",
      onClick: handleGptSearchClick,
      isActive: showGptSearch,
      visible: isAuthenticated,
    },
    {
      name: "Profile",
      path: "/profile",
      isActive: location.pathname === "/profile",
      visible: isAuthenticated,
    },
    {
      name: "Contact Developer",
      onClick: handleContactDeveloperClick,
      isActive: false, // No active state for this link
      visible: true, // Visible to all users
    },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-opacity-80 text-white font-martelsans relative">
      {/* Logo and Home Link */}
      <Link to={isAuthenticated ? "/browse" : "/"} className="text-xl md:text-3xl font-bold">
        <img src={logo} alt="FlixyAI" className="w-32 h-auto" />
      </Link>
      {/* Navigation and User Info Section */}
      <nav className="flex items-center space-x-4 relative">
        {/* Dynamically generated navigation items */}
        {navItems.map((item, index) =>
          item.visible ? <NavItem key={index} item={item} showGptSearch={showGptSearch} /> : null
        )}
        {/* Conditional rendering for user login/logout */}
        {!user?.uid && !user?.isGuest && (
          <Link to="/login" className="relative py-2 px-3 rounded-lg hover:underline">
            Login
          </Link>
        )}
        {user?.uid && (
          <button className="relative py-2 px-3 rounded-lg hover:underline" onClick={handleLogout}>
            Logout
          </button>
        )}
        {user?.isGuest && (
          <button className="relative py-2 px-3 rounded-lg hover:underline" onClick={handleLogout}>
            Exit Guest
          </button>
        )}
        {user?.isGuest && <p className="mx-4">Guest</p>}
        {!user?.isGuest && user?.displayName && <p className="mx-4">Hello, {user.displayName}</p>}
      </nav>
    </header>
  );
};

export default Header;

/** NavItem Component to handle individual navigation items */
const NavItem = ({ item, showGptSearch }) => {
  const { name, path, onClick, isActive } = item;

  if (path) {
    return (
      <Link
        to={path}
        className="relative py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition bg-black"
      >
        {name}
        {isActive && <ActiveIndicator />}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="relative py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition"
    >
      {name}
      {isActive && <ActiveIndicator />}
    </button>
  );
};

/** ActiveIndicator component - the animated background for active navigation item */
const ActiveIndicator = () => {
  return (
    <motion.div
      layoutId="activeIndicator"
      className="absolute inset-0 bg-red-700 z-[-1] rounded-lg"
      initial={false}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};
