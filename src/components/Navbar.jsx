import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

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
    <nav className="bg-white dark:bg-[#1D2226] text-gray-900 dark:text-white sticky pt-4 pb-4 top-0 z-50 transition-colors duration-300">
      <div className="container max-w-7xl mx-auto md:px-4 px-2 flex items-left justify-between">
        <Link to="/" className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-300 flex items-center">
          <span className="custom-emoji" role="img" aria-label="UI Plane">✈️</span>
        </Link>
        <div className="flex justify-end grow">
          {isPostPage && (
            <div
              className={`flex grow items-center transition-all delay-500 duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <span className="mx-2 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="custom-emoji text-2xl" role="img" aria-label="Post Emoji">{postEmoji}</span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;