import React, { useContext } from 'react'
import Navbar from './Navbar.jsx'
import AlbumItem from './AlbumItem.jsx'
import SongItem from './SongItem.jsx';
import { PlayerContext } from '../context/PlayerContext.jsx';

const DisplayHome = () => {

  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className=''>
        <h1 className='my-5 font-bold text-2xl '>Top Playlists</h1>
        <div className='flex overflow-auto'>
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
      <div className='mb-4'>
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
      <div className='mb-20'></div>
      <div className='text-center mb-[80px] text-[12px]'>
        Designed and Developed by <a href='https://sibisiddharth8.github.io/portfolio-react/' className='text-[12px] font-bold cursor-pointer text-nowrap'> © Sibi Siddharth S</a>
      </div>
    </>
  );
};

export default DisplayHome;

