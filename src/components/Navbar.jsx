import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({ 
  showDetails = true, 
  showBackIcon = true, 
  showForwardIcon = true, 
  searchBar = false, 
  searchTerm = '',
  onSearchChange = () => {}
}) => {
  const navigate = useNavigate();

  return (
    <div className=''>
      <div className="w-full flex justify-between items-center font-semibold pt-1.5 pb-1.5">
        <div className="flex items-center gap-2">
          {showBackIcon && (
            <img
              onClick={() => navigate(-1)}
              className="min-w-8 w-8 bg-black p-2 rounded-2xl cursor-pointer"
              src={assets.arrow_left}
              alt="Back"
            />
          )}
          {showForwardIcon && !searchBar && (
            <img
              onClick={() => navigate(+1)}
              className="min-w-8 w-8 bg-black p-2 rounded-2xl cursor-pointer"
              src={assets.arrow_right}
              alt="Forward"
            />
          )}
        </div>
        <div className="flex items-center gap-4">
          {searchBar ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={onSearchChange}
                className="bg-gray-800/60 text-white px-4 py-2 rounded-full focus:outline-none"
              />
              <img
                src={assets.search_icon}
                alt="Search"
                className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2"
              />
            </div>
          ) : (
            <>
              <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
                Explore Premium
              </p>
              <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hidden md:block">
                Install App
              </p>
              <Link 
                to="https://open.spotify.com/user/31ynzm4mmrjgxdp4hia4lvrrc6xi?si=80b73ca6d64b47b4" 
                className="bg-purple-500 text-black w-9 h-9 rounded-full flex items-center justify-center hover:cursor-pointer"
              >
                S
              </Link>
            </>
          )}
        </div>
      </div>
      {showDetails && (
        <div className="hidden sm:flex items-center gap-2 mt-4">
          <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
          <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
          <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Podcast</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
