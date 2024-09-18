import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-700">
          <span className="mr-2" role="img" aria-label="Airplane">✈️</span>
          UI Plane
        </Link>
        
        {/* Hamburger menu for small screens */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Regular menu for medium and large screens */}
        <ul className="hidden md:flex space-x-4">
          <li><Link to="/categories" className="hover:text-gray-700">View by Category</Link></li>
        </ul>
      </div>

      {/* Dropdown menu for small screens */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/categories" onClick={() => setIsOpen(false)} className="hover:text-gray-700">View by Category</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;