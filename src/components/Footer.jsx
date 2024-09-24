import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#1D2226] text-white py-8">
      <div className="container max-w-7xl mx-auto px-10">
        <div className="lg:flex lg:justify-left">
          <div className="mb-12 lg:mb-0 lg:grow">
            <img src="/images/skymakers.png" alt="Skymakers Logo" className="h-6 w-auto" /> {/* Changed from h-12 to h-6 */}
          </div>
          <div className="lg:max-w-sm">
            <p className="text-sm text-gray-600 mb-4">
              For developers, by developers; We enable business to transform in the digital world while enhancing and protecting users' security and privacy
            </p>
            <p className="text-sm text-gray-500">
              © 2024 UI Plane. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Powered by <a href="https://skymakers.digital" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Skymakers Digital</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;