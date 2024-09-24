import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className="dark:bg-[#1D2226] dark:text-white py-8">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="justify-left">
          <div className="mb-12">
            {isDarkMode ? (
              <img src="/images/skymakers.png" alt="Skymakers Logo" className="w-40 h-auto" />
            ) : (
              <img src="/images/skymakers-color.png" alt="Skymakers Logo" className="w-40 h-auto" />
            )}  
          </div>
          <div className="max-w">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              For developers, by developers; We enable business to transform in the digital world while enhancing and protecting users' security and privacy
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 UI Plane. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Powered by <a href="https://skymakers.digital" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Skymakers Digital</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;