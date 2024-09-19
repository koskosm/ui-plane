import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-700">
          <span className="mr-2" role="img" aria-label="UI Plane">✈️</span>
          UI Plane
        </Link>
        
        {/* Rest of the Navbar component remains unchanged */}
      </div>
    </nav>
  );
}

export default Navbar;