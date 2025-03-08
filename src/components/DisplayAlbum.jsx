import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import SongModal from './SongModal';

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    albumsData.forEach((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, [albumsData, id]);

  // Filter songs for the current album
  const albumSongs = songsData.filter(
    (item) => item.album.toLowerCase() === albumData.name?.toLowerCase()
  );

  // Filter album songs by search term (case-insensitive)
  const filteredSongs = albumSongs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDuration = albumSongs.reduce((acc, song) => {
    const [minutes, seconds] = song.duration.split(':').map(Number);
    return acc + minutes * 60 + seconds; 
  }, 0);

  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const displayDuration = `${hours > 0 ? `${hours} hr` : ''} ${minutes} min`;

  // Open modal when song image is clicked and start playing song
  const handleSongImageClick = (song, e) => {
    e.stopPropagation(); // avoid triggering row click if needed
    playWithId(song._id);
    setSelectedSong(song);
  };

  return albumData ? (
    <>
      <div className="sticky top-0 z-50 bg-[#121212] bg-opacity-60 px-4 py-2 rounded-full">
        <Navbar 
          showDetails={false} 
          showForwardIcon={false} 
          searchBar={true} 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="mt-5 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p>
            <img className="inline-block w-5 m-1" src={assets.spotGPT_logo} alt="SpotGPT logo" />
            <b className="text-[14px]">
              SpotGPT • <span className="text-[14px] font-semibold">1M likes</span>
            </b> 
          </p>
          <b className="text-[14px] font-medium m-1">
            {albumSongs.length} songs, about {displayDuration}
          </b> 
        </div>
      </div>
      
      <div className="grid grid-cols-[3fr_1fr] md:grid-cols-3 mt-8 sm:mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
          <b className="ml-2">Title</b>
        </p>
        <p className="hidden md:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock icon" />
      </div>
      <hr className="mb-2"/>
      {filteredSongs.map((item, index) => (
        <div
          onClick={() => playWithId(item._id)}
          key={index}
          className="grid grid-cols-[3fr_1fr] md:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded"
        >
          <p className="text-white w-[25ch] truncate md:w-[25ch]">
            <b className="mr-2 text-[#a7a7a7] inline-block text-start w-[3ch]">
              {index + 1}
            </b>
            <img 
              onClick={(e) => handleSongImageClick(item, e)}
              className="inline w-10 h-10 mr-5 object-cover rounded" 
              src={item.image} 
              alt={item.name} 
            />
            {item.name}
          </p>
          <p className="text-[15px] hidden md:block">1 year ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
      
      {selectedSong && (
        <SongModal 
          song={selectedSong} 
          onClose={() => setSelectedSong(null)} 
        />
      )}
      <div className="mb-10"></div>
    </>
  ) : null;
};

export default DisplayAlbum;
