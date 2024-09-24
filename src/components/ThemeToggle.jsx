import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className='justify-center'>
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#21272b] custom-emoji"
    >
      {isDarkMode ? '🌙' : '🔅'}
      </button>
    </div>
  );
}

export default ThemeToggle;