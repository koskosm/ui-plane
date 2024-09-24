import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ postEmoji }) {
  const location = useLocation();
  const isPostPage = location.pathname.startsWith('/post/');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isPostPage) {
      // Slight delay to ensure the DOM has updated
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isPostPage]);

  return (
    <nav className="bg-[#1D2226] text-white p-4 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 flex items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 flex items-center">
          <span className="custom-emoji" role="img" aria-label="UI Plane">✈️</span>
        </Link>
        {isPostPage && (
          <div
            className={`flex items-center transition-all delay-500 duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <span className="mx-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="custom-emoji text-2xl" role="img" aria-label="Post Emoji">{postEmoji}</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;