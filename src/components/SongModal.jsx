import React from 'react';

const SongModal = ({ song, onClose }) => {
  if (!song) return null;

  // Close modal when clicking on the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 p-2"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#181818] rounded-lg shadow-lg w-full max-w-md p-4">
        <div className='flex items-center justify-between pb-1'>
          <div className="text-2xl font-bold text-white">Song Details</div>
          <button 
            onClick={onClose} 
            className="text-white text-[24px]"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="">
          <img 
            src={song.image} 
            alt={song.name} 
            className="w-full h-[280px] object-cover rounded" 
          />
          <h2 className="mt-4 text-2xl font-bold text-white">{song.name}</h2>
         
          <p className="text-gray-400 mt-2">Duration: {song.duration}</p>
          {song.album && (
            <p className="text-gray-400 mt-1">Album: {song.album}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongModal;
