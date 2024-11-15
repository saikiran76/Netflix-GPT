import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import logo from '../img/flixyai.png';
import { useRef, useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state to control mobile menu

  // Determine if the user is authenticated or a guest
  const isAuthenticated = user?.uid || user?.isGuest;

  // Handler to log the user out
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(removeUser());
  };

  // Handler for contacting the developer, smooth scrolling to the footer section
  const handleContactDeveloperClick = () => {
    const footerElement = document.getElementById("contact-developer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
    dispatch(toggleGptSearchView(false)); // Set to false when navigating away
  };

  // Handler to toggle GPT Search feature
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView(true));
    setActiveIndex(1); // Set GPT Search as active
    setIsMenuOpen(false); // Close menu on mobile after click
  };

  // Handler to close GPT Search when navigating away
  const handleNavigationAway = () => {
    dispatch(toggleGptSearchView(false));
    setIsMenuOpen(false); // Close menu on mobile after click
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Update indicator position based on activeIndex or hovered item
  const updateIndicatorPosition = (index) => {
    if (navRef.current && navRef.current.children[index]) {
      const item = navRef.current.children[index];
      setIndicatorStyle({
        width: `${item.offsetWidth}px`,
        left: `${item.offsetLeft}px`,
      });
    }
  };

  // Initialize indicator position based on the current location
  useEffect(() => {
    const initialIndex = navItems.findIndex(
      (item) => location.pathname === item.path
    );
    if (initialIndex !== -1) {
      setActiveIndex(initialIndex);
      updateIndicatorPosition(initialIndex);
    }
  }, [location.pathname]);

  // Navigation items with their routes and conditions
  const navItems = [
    {
      name: "My Bucket List",
      path: "/bucket-list",
      isActive: location.pathname === "/bucket-list",
      visible: isAuthenticated,
      onClick: handleNavigationAway,
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
      onClick: handleNavigationAway,
    },
    {
      name: "Contact Developer",
      onClick: handleContactDeveloperClick,
      isActive: false,
      visible: true, // Visible to all users
    },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-opacity-80 text-white font-martelsans relative bg-black">
      {/* Logo and Home Link */}
      <Link to={isAuthenticated ? "/browse" : "/"} className="text-xl md:text-3xl font-bold">
        <img src={logo} alt="FlixyAI" className="w-32 h-auto" />
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button className="md:hidden text-2xl" onClick={toggleMenu}>
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Navigation and User Info Section for larger screens */}
      <nav ref={navRef} className="hidden md:flex items-center space-x-4 relative">
        {/* Sliding indicator */}
        <div
          className="absolute bottom-0 h-0.5 bg-red-700 transition-all duration-300"
          style={indicatorStyle}
        ></div>
        
        {/* Dynamically generated navigation items */}
        {navItems.map((item, index) =>
          item.visible ? (
            <NavItem
              key={index}
              item={item}
              isActive={index === activeIndex}
              onMouseEnter={() => updateIndicatorPosition(index)}
              onMouseLeave={() => activeIndex !== null && updateIndicatorPosition(activeIndex)}
              onClick={() => {
                item.onClick && item.onClick();
                setActiveIndex(index);
              }}
            />
          ) : null
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-y-0 right-0 w-3/4 bg-black text-white p-6 md:hidden z-50 transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="text-2xl">
              <HiX />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 mt-6">
            {navItems.map((item, index) =>
              item.visible ? (
                <NavItem
                  key={index}
                  item={item}
                  isActive={index === activeIndex}
                  onClick={() => {
                    item.onClick && item.onClick();
                    setActiveIndex(index);
                    setIsMenuOpen(false); // Close menu after clicking on a link
                  }}
                />
              ) : null
            )}
            {!user?.uid && !user?.isGuest && (
              <Link to="/login" className="py-2 px-3 rounded-lg hover:underline" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
            {user?.uid && (
              <button className="py-2 px-3 rounded-lg hover:underline" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                Logout
              </button>
            )}
            {user?.isGuest && (
              <button className="py-2 px-3 rounded-lg hover:underline" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                Exit Guest
              </button>
            )}
            {user?.isGuest && <p className="mx-4">Guest</p>}
            {!user?.isGuest && user?.displayName && <p className="mx-4">Hello, {user.displayName}</p>}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

/** NavItem Component to handle individual navigation items */
const NavItem = ({ item, isActive, onClick }) => {
  const { name, path } = item;

  if (path) {
    return (
      <Link
        to={path}
        className={`relative py-2 px-3 rounded-lg ${isActive ? "text-white" : "text-gray-300"} hover:bg-white hover:bg-opacity-20 transition`}
        onClick={onClick}
      >
        {name}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`relative py-2 px-3 rounded-lg ${isActive ? "text-white" : "text-gray-300"} hover:bg-white hover:bg-opacity-20 transition`}
    >
      {name}
    </button>
  );
};
