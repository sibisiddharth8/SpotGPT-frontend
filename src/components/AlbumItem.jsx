import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate(); 

  const handleNavigation = () => {
    navigate(`/album/${id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className='w-full flex items-center rounded-md cursor-pointer bg-[#353632] hover:bg-[#504f4f]'
    >
      <img className='h-14 object-cover rounded-l-md ' src={image} alt="" />
      <div className='flex flex-col'>
        <p className='font-bold px-2.5 sm:px-4 text-[12px] sm:text-[14px]'>{name}</p>
        <p className='font-normal text-[12px] hidden sm:block px-4 w-[35ch] truncate'>{desc}</p>
      </div>
    </div>
  );
};

export default AlbumItem;
