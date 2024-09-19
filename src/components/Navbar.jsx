import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white text-black p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-700">
          <span className="mr-2" role="img" aria-label="UI Plane">✈️</span>
          UI Plane
        </Link>
        
        {/* Add your navigation items here */}
        <ul className="hidden md:flex space-x-4">
          <li><Link to="/categories" className="hover:text-gray-700">View by Category</Link></li>
          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;