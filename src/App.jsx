import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Player from './components/Player.jsx'
import Display from './components/Display.jsx'
import { PlayerContext } from './context/PlayerContext.jsx'

const App = () => {
  const { audioRef, track, songsData, albumsData, next, playStatus } = useContext(PlayerContext);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); 
    }
  }, []);

  return (
    <div className='h-screen bg-black'>
      {songsData.length !== 0 ? (
        <>
          <div className='h-[90%] flex '>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      <audio
        ref={audioRef}
        preload='auto'
        src={track ? track.file : ""}
        onEnded={() => next(track._id)}
        onLoadedData={() => {
          if (playStatus) {
            audioRef.current.play();
          }
        }}
      >
      </audio>
    </div>
  )
}

export default App;