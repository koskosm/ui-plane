import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { posts } from '../data/posts';

function Navbar() {
  const categories = [...new Set(posts.flatMap(post => post.tags))];
  const location = useLocation();

  const isActiveCategory = (category) => {
    const decodedPathname = decodeURIComponent(location.pathname);
    return decodedPathname === `/category/${category}`;
  };

  return (
    <>
      {/* Top nav bar */}
      <nav className="bg-white text-black p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto lg:max-w-none lg:mx-0 pr-4 lg:pr-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-gray-700">
            <span className="mr-2 header-plane" role="img" aria-label="UI Plane">✈️</span>
            UI Plane
          </Link>
          
          {/* Show category link only on medium and small screens */}
          <ul className="flex lg:hidden space-x-4">
            <li><Link to="/categories" className="hover:text-gray-700">View by Category</Link></li>
          </ul>
        </div>
      </nav>

      {/* Left-side navigation menu - visible only on large screens */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 overflow-y-auto pt-16 hidden lg:block">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  to={`/category/${encodeURIComponent(category)}`}
                  className={`block py-1 px-2 rounded transition-colors ${
                    isActiveCategory(category)
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-blue-100'
                  }`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;