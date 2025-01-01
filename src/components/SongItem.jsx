import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name, image, desc, id}) => {

  const { playWithId } = useContext(PlayerContext);

  return (
    <div onClick={()=> playWithId(id) } className='flex flex-col justify-center items-center p-3 min-w-[160px] h-full rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded w-[140px] h-[140px] object-cover' src={image} alt="" />
        <div className='text-[14px] text-[#a9a9a9] w-[140px] text-start font-medium mt-2'>{name}</div>
        {/* <p className='text-slate-200 text-sm'>{desc}</p> */}
    </div>
  )
}

export default SongItem
