import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#1D2226] text-white p-4 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          UI Plane
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;