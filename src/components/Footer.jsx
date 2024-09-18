import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:justify-between">
          <div className="mb-6 lg:mb-0">
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