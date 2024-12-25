import React, { useContext } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Player from './components/Player.jsx'
import Display from './components/Display.jsx'
import { PlayerContext } from './context/PlayerContext.jsx'

const App = () => {

  const {audioRef, track, songsData, albumsData, next} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {
        songsData.length !==0 
        ? <>
        <div className='h-[90%] flex '>
          <Sidebar/>
          <Display/>
        </div>
        <Player/>
        </>
        : null
      }
      
      <audio 
      ref={audioRef} preload='auto' src={track ? track.file : ""} 
      onEnded={() => next(track._id)}
      onLoadedData={() => audioRef.current.play()}
      >
      </audio>
    </div>
  )
}

export default App
