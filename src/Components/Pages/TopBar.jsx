import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/Slice/ThemeSlice'; 
import { logout } from '../redux/Slice/AuthSlice'; 
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div 
      className={`flex items-center justify-between p-4 ${theme === 'light' ? 'bg-gradient-to-r bg-blue-300 text-white' : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'}`}
    >
      {/* Logo */}
      <Link to='/home' className='flex items-center gap-2'>
        <div className="flex items-center space-x-2">
          <img src="/favicon.png" alt="PayDone Logo" className="w-8 h-8" />
          <span className="font-semibold text-xl">PayDone</span>
        </div>
      </Link>

      <button
        onClick={() => navigate('/payment-record')}
        className='flex bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300 hover:scale-105'
      >
        User Record
      </button>

     
      <div className="flex gap-4 items-center">
         {/* User Payment Record Button */}
     

        {/* Theme Toggle Button with Icon */}
        <button
          onClick={handleThemeToggle}
          className={`px-4 py-2 rounded-md flex items-center justify-center ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-600'} transition duration-300 hover:bg-gray-500`}
        >
          {theme === 'light' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition duration-300 hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
