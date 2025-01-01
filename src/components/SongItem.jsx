import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name, image, desc, id}) => {

  const { playWithId } = useContext(PlayerContext);

  return (
    <div onClick={()=> playWithId(id) } className='flex flex-col items-center min-w-[160px] min-h-[160px] pt-3.5 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded w-[140px] h-[140px] object-cover' src={image} alt="" />
        <p className='font-semibold mt-2 text-center'>{name}</p>
        {/* <p className='text-slate-200 text-sm'>{desc}</p> */}
    </div>
  )
}

export default SongItem
