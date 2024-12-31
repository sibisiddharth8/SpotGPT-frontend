import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState('');
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);
  const isAlbum = location.pathname.includes("album");
  const bgColor = isAlbum && albumsData.length>0 ? albumsData.find((x)=>(x._id == albumId)).bgColor : "#121212";

  useEffect(() => {
    albumsData.map((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, []);

  const albumSongs = songsData.filter(
    (item) => item.album.toLowerCase() === albumData.name?.toLowerCase()
  );

  const totalDuration = albumSongs.reduce((acc, song) => {
    const [minutes, seconds] = song.duration.split(':').map(Number);
    return acc + minutes * 60 + seconds; 
  }, 0);

  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  const displayDuration = `${hours > 0 ? `${hours} hr` : ''} ${minutes} min`;

  return albumData ? (
    <>
      <div className='sticky top-0 z-50 bg-[#121212] bg-opacity-60 pl-5 pr-5 p-3 rounded-full'>
        <Navbar showDetails={false} />
      </div>
      
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p>
            <img className="inline-block w-5 m-1" src={assets.spotGPT_logo} alt="" />
            <b className="text-[14px]">SpotGPT • <span className='text-[14px] font-semibold'>1084 likes</span></b> 
          </p>
          <b className="text-[14px] font-medium m-1">{albumSongs.length} songs, about {displayDuration}</b> 
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] sm:grid-cols-3 mt-8 sm:mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
          <b className="m-auto">Title</b>
        </p>
  
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr className='mb-2'/>
      {albumSongs.map((item, index) => (
        <div
          onClick={() => playWithId(item._id)}
          key={index}
          className="grid grid-cols-[2fr_1fr] sm:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded"
        >
          <p className="text-white w-[23ch] truncate sm:w-full">
            <b className="mr-2 text-[#a7a7a7] inline-block text-center w-[3ch]">{index + 1}</b>
            <img className="inline w-10 h-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
 
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  ) : null;
};

export default DisplayAlbum;
