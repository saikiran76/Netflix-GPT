import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../img/flixyai.png'

const HeaderNew = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const navigate = useNavigate()
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const handleClick = (text) =>{
    if(text === "Try it") {
      navigate("/login")
    }
     
  }

  const menuItems = ["Hey there", "Try it"];

  useEffect(() => {
    if (hoveredIndex !== null && itemsRef.current[hoveredIndex]) {
      const item = itemsRef.current[hoveredIndex];
      const { width, left } = item.getBoundingClientRect();
      const containerLeft = containerRef.current.getBoundingClientRect().left;

      // Calculate position relative to container
      setBackgroundStyle({
        width: `${width}px`,
        transform: `translateX(${left - containerLeft}px)`,
      });
    } else {
      setBackgroundStyle({ width: 0, transform: "translateX(0)" });
    }
  }, [hoveredIndex]);

  return (
    <div className="relative flex items-center justify-between m-3 bg-black rounded">
      <img className="" src={logo} alt="logo" />

      <div ref={containerRef} className="relative flex gap-4 items-center mr-6">
        {/* Sliding background */}
        <div
          className="absolute top-0 bottom-0 bg-white bg-opacity-10 backdrop-blur-md rounded-md transition-all duration-300 ease-in-out"
          style={backgroundStyle}
        ></div>

        {/* Menu items */}
        {menuItems.map((text, index) => (
          <p
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="relative z-10 cursor-pointer px-4 py-2 text-gray-300 font-martelsans hover:text-white"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick = {() => handleClick(text)}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HeaderNew;
