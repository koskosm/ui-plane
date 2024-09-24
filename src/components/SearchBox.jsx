import React, { useState, useEffect } from 'react';

function SearchBox({ onSearch, searchTerm, onClear }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value);
    if (e.target.value === '') {
      onClear();
    }
  };

  return (
    <div className="w-full lg:w-2/3 font-basier">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex">
          <input
            type="text"
            placeholder="Search anything about UI design"
            value={localSearchTerm}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white bg-[#1D2226] border rounded-l-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-black bg-white rounded-r-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBox;