
import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ScrollBtn = () => {
  const [showTop, setShowTop] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (showTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-primary
        text-white shadow-lg hover:shadow-2xl
        transform transition-all duration-300
        hover:scale-110 active:scale-95
      `}
      aria-label={showTop ? "Scroll to top" : "Scroll to bottom"}
    >
      {showTop ? (
        <FaArrowUp className="text-xl" />
      ) : (
        <FaArrowDown className="text-xl" />
      )}
    </button>
  );
};

export default ScrollBtn;