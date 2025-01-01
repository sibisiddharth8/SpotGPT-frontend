import React, { useContext } from 'react'
import Navbar from './Navbar.jsx'
import AlbumItem from './AlbumItem.jsx'
import SongItem from './SongItem.jsx';
import { PlayerContext } from '../context/PlayerContext.jsx';

const DisplayHome = () => {

  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <div className='pb-[80px]'>
      <Navbar />
      <div className='mb-10'>
        <h1 className='my-5 font-bold text-2xl '>Top Playlists</h1>
        <div className='grid grid-cols-2 gap-2'>
        {albumsData.map((item, index) => (
          <AlbumItem
            key={index}
            name={item.name}
            desc={item.desc}
            id={item._id}
            image={item.image}
          />
        ))}
        </div>
      </div>
      <div className='mb-10'>
        <h1 className='my-5 font-bold text-2xl '>Todays Biggest Hits</h1>
        <div className='flex overflow-auto'>
        {songsData.map((item, index) => (
          <SongItem
            key={index}
            name={item.name}
            desc={item.desc}
            id={item._id}
            image={item.image}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;

