import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { posts } from '../data/posts';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = [...new Set(posts.flatMap(post => post.tags))];
  const location = useLocation();

  const isActiveCategory = (category) => {
    const decodedPathname = decodeURIComponent(location.pathname);
    return decodedPathname === `/category/${category}`;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-[#1D2226] text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          <span className="mr-2 header-plane custom-emoji" role="img" aria-label="UI Plane">✈️</span>
          UI Plane
        </Link>
        
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Categories <span className="custom-emoji" role="img" aria-label="Categories">📚</span>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#2D3236] rounded-md shadow-lg z-50">
              <ul className="py-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`/category/${encodeURIComponent(category)}`}
                      className={`block px-4 py-2 text-sm ${
                        isActiveCategory(category)
                          ? 'bg-blue-500 text-white'
                          : 'text-white hover:bg-[#3D4246]'
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category} <span className="custom-emoji" role="img" aria-label="Category">🏷️</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;