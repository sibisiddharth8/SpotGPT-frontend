import React, { useContext, useMemo } from 'react'
import Navbar from './Navbar.jsx'
import AlbumItem from './AlbumItem.jsx'
import SongItem from './SongItem.jsx';
import { PlayerContext } from '../context/PlayerContext.jsx';

const DisplayHome = () => {

  const { songsData, albumsData } = useContext(PlayerContext);

  const shuffleArray = (array) => {
    let shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  const shuffledSongsData = useMemo(() => shuffleArray(songsData), [songsData]);

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
      <div className="mb-10">
        <div className="mt-5">
          <h1 className="font-bold text-2xl">AI Based Suggestions</h1>
          <p className="text-xs text-gray-500 italic md:text-end">Powered By SuperAI</p>
        </div>
        <div className="flex overflow-auto">
          {shuffledSongsData.map((item, index) => (
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

