import React, { useContext } from 'react'
import { assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

  const {seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong, isShuffle, toggleShuffle, isLoop, toggleLoop} = useContext(PlayerContext);
  
  return track ? (
    <div className='fixed bottom-0 w-full min-h-[80px] bg-black flex justify-between items-center text-white px-4 z-50'>
      <div className='lg:flex items-center gap-4 lg:w-[200px]'>
        <img className='w-11 h-11 object-cover rounded' src={track.image} alt="" />
        <div className='hidden lg:block'>
            <p>{track.name}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1.5 m-auto'>
            <div className='flex gap-4 pb-2 sm:pt-3 sm:pb-1'>
              {
                isShuffle 
                ?<img onClick={toggleShuffle} className="w-4 m-[1px] cursor-pointer" src={assets.shuffle_icon_active} alt="Shuffle Active" />
                :<img onClick={toggleShuffle} className="w-4 m-[1px] cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
              }
              <img onClick={previous} className='w-4 m-[1px] cursor-pointer' src={assets.prev_icon} alt="" />
              {
                playStatus 
                ?<img onClick={pause} className='w-4 m-[1px] cursor-pointer' src={assets.pause_icon} alt="" /> 
                :<img onClick={play} className='w-4 m-[1px] cursor-pointer' src={assets.play_icon} alt="" />
              } 
              <img onClick={next} className='w-4 m-[1px] cursor-pointer' src={assets.next_icon} alt="" />
              {
                isLoop
                ?<img onClick={toggleLoop} className='w-4 m-[1px] cursor-pointer' src={assets.loop_icon_active} alt="" />
                :<img onClick={toggleLoop} className='w-4 m-[1px] cursor-pointer' src={assets.loop_icon} alt="" />
              }
            </div>
            <div className='flex items-center gap-5'>
                <p className='hidden sm:block'>{time.currentTime.minute}:{time.currentTime.second}</p>
                <div 
                  onClick={seekSong}
                  onTouchStart={(e) => seekSong(e)}
                  onTouchMove={(e) => seekSong(e)} 
                  ref={seekBg} 
                  className='w-[70vw] mt-1 sm:mt-0 max-w-[500px] bg-gray-300 rounded-full cursor-pointer'
                >
                    <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                </div>
                <p className='hidden sm:block'>{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>
        </div>
        <div className='hidden lg:flex items-center gap-2 opacity-75'>
            <img className='w-4' src={assets.plays_icon} alt="" />
            <img className='w-4' src={assets.mic_icon} alt="" />
            <img className='w-4' src={assets.queue_icon} alt="" />
            <img className='w-4' src={assets.speaker_icon} alt="" />
            <img className='w-4' src={assets.volume_icon} alt="" />
            <div className='w-20 bg-slate-50 h-1 rounded'>

            </div>
            <img className='w-4' src={assets.mini_player_icon} alt="" />
            <img className='w-4' src={assets.zoom_icon} alt="" />
        </div>
    </div>
  ) : null;
}

export default Player
